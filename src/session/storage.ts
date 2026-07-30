import type { Question, TrialDefinition, TrialSession } from '../content/types'

export const SESSION_KEY = 'framecheck.portfolio.trial.v1'

export type SessionLoadResult =
  | { status: 'empty' | 'reset' | 'unavailable'; session: null }
  | { status: 'restored'; session: TrialSession }

export function loadSession(
  storage: Storage,
  trialsById: ReadonlyMap<string, TrialDefinition>,
  questionsById: ReadonlyMap<string, Question>,
): SessionLoadResult {
  let raw: string | null
  try {
    raw = storage.getItem(SESSION_KEY)
  } catch {
    return { status: 'unavailable', session: null }
  }

  if (!raw) return { status: 'empty', session: null }

  try {
    const session = parseSession(JSON.parse(raw), trialsById, questionsById)
    if (session) return { status: 'restored', session }
  } catch {
    // The invalid state is removed below and reported to the learner.
  }

  try {
    storage.removeItem(SESSION_KEY)
  } catch {
    return { status: 'unavailable', session: null }
  }
  return { status: 'reset', session: null }
}

export function saveSession(storage: Storage, session: TrialSession): boolean {
  try {
    storage.setItem(SESSION_KEY, JSON.stringify(session))
    return true
  } catch {
    return false
  }
}

export function clearSession(storage: Storage): boolean {
  try {
    storage.removeItem(SESSION_KEY)
    return true
  } catch {
    return false
  }
}

function parseSession(
  value: unknown,
  trialsById: ReadonlyMap<string, TrialDefinition>,
  questionsById: ReadonlyMap<string, Question>,
): TrialSession | null {
  if (!isRecord(value) || value.version !== 1) return null
  if (typeof value.trialId !== 'string') return null
  const trial = trialsById.get(value.trialId)
  if (!trial) return null
  if (!Array.isArray(value.questionIds)) return null
  if (!value.questionIds.every((id): id is string => typeof id === 'string')) {
    return null
  }
  if (
    value.questionIds.length !== trial.questionCount ||
    new Set(value.questionIds).size !== value.questionIds.length ||
    value.questionIds.some(
      (id) => !trial.questionIds.includes(id) || !questionsById.has(id),
    )
  ) {
    return null
  }
  if (!isRecord(value.answers)) return null
  const answers: Record<string, number> = {}
  for (const [questionId, answer] of Object.entries(value.answers)) {
    if (
      !value.questionIds.includes(questionId) ||
      !Number.isInteger(answer) ||
      Number(answer) < 0 ||
      Number(answer) > 3
    ) {
      return null
    }
    answers[questionId] = Number(answer)
  }
  if (
    !Number.isInteger(value.currentIndex) ||
    Number(value.currentIndex) < 0 ||
    Number(value.currentIndex) >= value.questionIds.length
  ) {
    return null
  }
  if (!isIsoDate(value.startedAt)) return null
  if (value.submittedAt !== null && !isIsoDate(value.submittedAt)) return null

  return {
    version: 1,
    trialId: value.trialId,
    questionIds: [...value.questionIds],
    answers,
    currentIndex: Number(value.currentIndex),
    startedAt: value.startedAt,
    submittedAt: value.submittedAt,
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function isIsoDate(value: unknown): value is string {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value))
}
