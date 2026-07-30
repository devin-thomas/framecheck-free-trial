import type { Domain, Question, Track, TrialDefinition } from './types'

type Catalog = {
  questions: readonly Question[]
  domains: readonly Domain[]
  tracks: readonly Track[]
  trials: readonly TrialDefinition[]
  sourceUrls: Readonly<Partial<Record<Question['sourceId'], string>>>
}

export function validateCatalog(catalog: Catalog): string[] {
  const issues: string[] = []
  const trackIds = uniqueIds(catalog.tracks, 'track', issues)
  const domainIds = uniqueIds(catalog.domains, 'domain', issues)
  const questionIds = uniqueIds(catalog.questions, 'question', issues)
  uniqueIds(catalog.trials, 'trial', issues)
  const tracksById = new Map(catalog.tracks.map((track) => [track.id, track]))
  const domainsById = new Map(
    catalog.domains.map((domain) => [domain.id, domain]),
  )
  const questionsById = new Map(
    catalog.questions.map((question) => [question.id, question]),
  )

  for (const domain of catalog.domains) {
    const track = tracksById.get(domain.trackId)
    if (!track)
      issues.push(`Domain ${domain.id} has unknown track ${domain.trackId}`)
    if (track && !track.domainIds.includes(domain.id)) {
      issues.push(`Track ${track.id} does not list domain ${domain.id}`)
    }
  }

  for (const question of catalog.questions) {
    const domain = domainsById.get(question.domainId)
    if (!trackIds.has(question.trackId)) {
      issues.push(
        `Question ${question.id} has unknown track ${question.trackId}`,
      )
    }
    if (!domainIds.has(question.domainId)) {
      issues.push(
        `Question ${question.id} has unknown domain ${question.domainId}`,
      )
    } else if (domain?.trackId !== question.trackId) {
      issues.push(`Question ${question.id} does not match its domain track`)
    }
    if (question.choices.length !== 4) {
      issues.push(`Question ${question.id} must provide four choices`)
    }
    if (
      !Number.isInteger(question.correctIndex) ||
      question.correctIndex < 0 ||
      question.correctIndex > 3
    ) {
      issues.push(`Question ${question.id} has an invalid answer index`)
    }
    const sourceUrl = catalog.sourceUrls[question.sourceId]
    if (!sourceUrl || !URL.canParse(sourceUrl)) {
      issues.push(`Question ${question.id} has no valid public source URL`)
    }
    if (Number.isNaN(Date.parse(question.reviewedAt))) {
      issues.push(`Question ${question.id} has an invalid review date`)
    }
    if (question.rights !== 'original-demo-copy') {
      issues.push(`Question ${question.id} has an unknown rights status`)
    }
  }

  for (const trial of catalog.trials) {
    if (!trackIds.has(trial.trackId)) {
      issues.push(`Trial ${trial.id} has unknown track ${trial.trackId}`)
    }
    if (new Set(trial.questionIds).size !== trial.questionIds.length) {
      issues.push(`Trial ${trial.id} contains duplicate question IDs`)
    }
    if (trial.questionIds.length < trial.questionCount) {
      issues.push(`Trial ${trial.id} has fewer questions than it selects`)
    }
    if (trial.domainId !== 'mixed' && trial.questionIds.length !== 10) {
      issues.push(`Focused trial ${trial.id} must contain ten questions`)
    }
    for (const questionId of trial.questionIds) {
      const question = questionsById.get(questionId)
      if (!questionIds.has(questionId) || !question) {
        issues.push(
          `Trial ${trial.id} references unknown question ${questionId}`,
        )
      } else if (question.trackId !== trial.trackId) {
        issues.push(`Trial ${trial.id} includes a question from another track`)
      } else if (
        trial.domainId !== 'mixed' &&
        question.domainId !== trial.domainId
      ) {
        issues.push(`Trial ${trial.id} includes a question from another domain`)
      }
    }
  }

  return issues
}

function uniqueIds<T extends { id: string }>(
  items: readonly T[],
  label: string,
  issues: string[],
): Set<string> {
  const ids = new Set<string>()
  for (const item of items) {
    if (ids.has(item.id)) issues.push(`Duplicate ${label} ID ${item.id}`)
    ids.add(item.id)
  }
  return ids
}
