// @vitest-environment node

import { describe, expect, it } from 'vitest'
import { questionsById, trialsById } from '../content/question-bank'
import {
  answerQuestion,
  countUnanswered,
  createSession,
  submitSession,
} from './model'
import {
  SESSION_KEY,
  loadSession,
  saveSession,
  type SessionLoadResult,
} from './storage'
import { scoreSession } from './scoring'
import { selectTrialQuestionIds } from './selection'

describe('portfolio trial storage', () => {
  it('restores valid progress and removes malformed state', () => {
    const storage = new MemoryStorage()
    const questionIds = trialsById.get('ww-control')?.questionIds
    if (!questionIds) throw new Error('Expected World Warrior control trial')
    const session = createSession('ww-control', questionIds)

    expect(saveSession(storage, session)).toBe(true)
    expect(load(storage)).toEqual({ status: 'restored', session })

    storage.setItem(SESSION_KEY, '{bad json')
    expect(load(storage)).toEqual({ status: 'reset', session: null })
    expect(storage.getItem(SESSION_KEY)).toBeNull()
  })
})

describe('portfolio trial model', () => {
  it('locks answers after submission', () => {
    const questionIds = trialsById.get('ww-control')?.questionIds
    if (!questionIds) throw new Error('Expected World Warrior control trial')
    const session = createSession('ww-control', questionIds)
    const answered = answerQuestion(session, questionIds[0], 1)

    expect(countUnanswered(answered)).toBe(9)
    const submitted = submitSession(
      answered,
      () => new Date('2026-07-30T18:00:00.000Z'),
    )
    expect(submitted.submittedAt).toBe('2026-07-30T18:00:00.000Z')
    expect(answerQuestion(submitted, questionIds[0], 3)).toBe(submitted)
  })

  it('selects a unique mixed set and varies an identical retake', () => {
    const trial = trialsById.get('ww-mixed')
    if (!trial) throw new Error('Expected World Warrior mixed trial')

    const first = selectTrialQuestionIds(trial, () => 0)
    const retake = selectTrialQuestionIds(trial, () => 0, first)

    expect(first).toHaveLength(30)
    expect(new Set(first)).toHaveLength(30)
    expect([...retake].sort()).not.toEqual([...first].sort())
  })

  it('scores exact questions and domain totals', () => {
    const trial = trialsById.get('ww-mixed')
    if (!trial) throw new Error('Expected World Warrior mixed trial')
    const selected = selectTrialQuestionIds(trial, () => 0)
    let session = createSession(trial.id, selected)
    for (const questionId of selected) {
      const question = questionsById.get(questionId)
      if (!question) throw new Error(`Missing question ${questionId}`)
      session = answerQuestion(session, questionId, question.correctIndex)
    }

    const score = scoreSession(session, questionsById)
    expect(score.correct).toBe(30)
    expect(score.total).toBe(30)
    expect(
      score.domains.reduce((total, domain) => total + domain.total, 0),
    ).toBe(30)
  })
})

function load(storage: Storage): SessionLoadResult {
  return loadSession(storage, trialsById, questionsById)
}

class MemoryStorage implements Storage {
  private readonly data = new Map<string, string>()

  get length() {
    return this.data.size
  }

  clear() {
    this.data.clear()
  }

  getItem(key: string) {
    return this.data.get(key) ?? null
  }

  key(index: number) {
    return [...this.data.keys()][index] ?? null
  }

  removeItem(key: string) {
    this.data.delete(key)
  }

  setItem(key: string, value: string) {
    this.data.set(key, value)
  }
}
