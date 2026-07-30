import type { TrialSession } from '../content/types'

export function createSession(
  trialId: string,
  questionIds: readonly string[],
  now: () => Date = () => new Date(),
): TrialSession {
  return {
    version: 1,
    trialId,
    questionIds: [...questionIds],
    answers: {},
    currentIndex: 0,
    startedAt: now().toISOString(),
    submittedAt: null,
  }
}

export function answerQuestion(
  session: TrialSession,
  questionId: string,
  answerIndex: number,
): TrialSession {
  if (session.submittedAt) return session
  if (!session.questionIds.includes(questionId)) {
    throw new Error(`Question ${questionId} is not part of this trial`)
  }
  if (!Number.isInteger(answerIndex) || answerIndex < 0 || answerIndex > 3) {
    throw new RangeError('Answer index must be an integer from 0 through 3')
  }
  return {
    ...session,
    answers: { ...session.answers, [questionId]: answerIndex },
  }
}

export function moveToQuestion(
  session: TrialSession,
  currentIndex: number,
): TrialSession {
  if (session.submittedAt) return session
  if (
    !Number.isInteger(currentIndex) ||
    currentIndex < 0 ||
    currentIndex >= session.questionIds.length
  ) {
    throw new RangeError('Question index is outside this trial')
  }
  return { ...session, currentIndex }
}

export function countUnanswered(session: TrialSession): number {
  return session.questionIds.filter(
    (questionId) => session.answers[questionId] === undefined,
  ).length
}

export function submitSession(
  session: TrialSession,
  now: () => Date = () => new Date(),
): TrialSession {
  if (session.submittedAt) return session
  return { ...session, submittedAt: now().toISOString() }
}
