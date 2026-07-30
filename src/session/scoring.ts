import type {
  DomainId,
  DomainScore,
  Question,
  TrialSession,
} from '../content/types'

export type TrialScore = {
  correct: number
  total: number
  domains: readonly DomainScore[]
}

export function scoreSession(
  session: TrialSession,
  questionsById: ReadonlyMap<string, Question>,
): TrialScore {
  const scores = new Map<DomainId, DomainScore>()
  let correct = 0

  for (const questionId of session.questionIds) {
    const question = questionsById.get(questionId)
    if (!question) {
      throw new Error(`Cannot score unknown question ${questionId}`)
    }
    const isCorrect = session.answers[questionId] === question.correctIndex
    if (isCorrect) correct += 1
    const current = scores.get(question.domainId) ?? {
      domainId: question.domainId,
      correct: 0,
      total: 0,
    }
    current.total += 1
    if (isCorrect) current.correct += 1
    scores.set(question.domainId, current)
  }

  return {
    correct,
    total: session.questionIds.length,
    domains: [...scores.values()],
  }
}
