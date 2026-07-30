import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { createServer } from 'vite'

const repositoryRoot = path.resolve('.')
const outputPath = path.join(
  repositoryRoot,
  'public',
  'questions-and-answers.md',
)
const server = await createServer({
  root: repositoryRoot,
  appType: 'custom',
  logLevel: 'silent',
  server: { middlewareMode: true },
})

try {
  const bank = await server.ssrLoadModule('/src/content/question-bank.ts')
  const validator = await server.ssrLoadModule('/src/content/validation.ts')
  const issues = validator.validateCatalog({
    questions: bank.questions,
    domains: bank.domains,
    tracks: bank.tracks,
    trials: bank.trials,
    sourceUrls: bank.sourceUrls,
  })
  if (issues.length) {
    throw new Error(`Question catalog validation failed:\n${issues.join('\n')}`)
  }

  const domainsById = new Map(bank.domains.map((domain) => [domain.id, domain]))
  const lines = [
    '# FrameCheck Beta Question and Answer Bank',
    '',
    `Generated from the public typed question catalog. Total questions: ${bank.questions.length}.`,
    '',
    'This is unofficial demonstration content. Source links support original educational wording but do not imply publisher affiliation or endorsement.',
  ]

  for (const track of bank.tracks) {
    lines.push('', `## ${track.title}`)
    for (const question of bank.questions.filter(
      (candidate) => candidate.trackId === track.id,
    )) {
      const domain = domainsById.get(question.domainId)
      lines.push(
        '',
        `### ${question.id} - ${domain?.title ?? track.title}`,
        '',
        question.prompt,
        '',
        ...question.choices.map(
          (choice, index) =>
            `- ${String.fromCharCode(65 + index)}) ${choice}${index === question.correctIndex ? ' **(Correct)**' : ''}`,
        ),
        '',
        `**Answer:** ${String.fromCharCode(65 + question.correctIndex)}) ${question.choices[question.correctIndex]}`,
        '',
        `**Rationale:** ${question.rationale}`,
        '',
        `**Source:** [${bank.sourceLabels[question.sourceId]}](${bank.sourceUrls[question.sourceId]})`,
        '',
        `**Reviewed:** ${question.reviewedAt} | **Rights:** ${question.rights}`,
      )
    }
  }

  const expected = `${lines.join('\n')}\n`
  if (process.argv.includes('--check')) {
    const current = await readFile(outputPath, 'utf8').catch(() => '')
    if (current !== expected) {
      throw new Error('Question export is stale. Run npm run questions:export.')
    }
  } else {
    await writeFile(outputPath, expected, 'utf8')
    console.log(`Wrote ${bank.questions.length} questions to ${outputPath}`)
  }
} finally {
  await server.close()
}
