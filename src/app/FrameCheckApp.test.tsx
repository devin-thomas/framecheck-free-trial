import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { trialsById } from '../content/question-bank'
import { createSession, submitSession } from '../session/model'
import { SESSION_KEY, saveSession } from '../session/storage'
import { FrameCheckApp } from './FrameCheckApp'

describe('FrameCheck public assessment flow', () => {
  beforeEach(() => {
    localStorage.clear()
    location.hash = '#/'
    vi.stubGlobal('scrollTo', vi.fn())
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('runs a focused trial through confirmation and explainable results', async () => {
    render(<FrameCheckApp />)

    expect(
      screen.getByRole('button', { name: /World Warrior Fundamentals/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Iron Fist Fundamentals/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /Devin Thomas portfolio/i }),
    ).toHaveAttribute('href', 'https://devthomas.site')
    expect(
      screen.getByRole('link', { name: /Source on GitHub/i }),
    ).toHaveAttribute(
      'href',
      'https://github.com/devin-thomas/framecheck-free-trial',
    )

    fireEvent.click(
      screen.getAllByRole('button', { name: /Start domain trial/i })[0],
    )
    expect(screen.getByText('Question 01 / 10')).toBeInTheDocument()
    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 })).toHaveFocus(),
    )

    fireEvent.click(
      screen.getByRole('radio', {
        name: /It becomes the direction the character faces/i,
      }),
    )
    expect(localStorage.getItem(SESSION_KEY)).toContain('ww-control-01')

    fireEvent.click(screen.getByRole('button', { name: 'Question 10' }))
    fireEvent.click(screen.getByRole('button', { name: /Score my trial/i }))
    expect(
      screen.getByRole('dialog', { name: /Submit with unanswered questions/i }),
    ).toHaveTextContent('9 questions are unanswered')
    fireEvent.click(screen.getByRole('button', { name: /Submit anyway/i }))

    expect(screen.getByText('Trial complete')).toBeInTheDocument()
    expect(screen.getByText(/Review the misses/)).toHaveTextContent(
      '1 correct from 10',
    )
    expect(screen.getByText('Answer review')).toBeInTheDocument()
  })

  it('resets damaged progress visibly and announces offline mode', () => {
    localStorage.setItem(SESSION_KEY, '{damaged')
    render(<FrameCheckApp />)

    expect(
      screen.getByText(/Saved progress.*safely reset/i),
    ).toBeInTheDocument()
    fireEvent(window, new Event('offline'))
    expect(screen.getByText(/Offline mode/)).toBeInTheDocument()
  })

  it('routes a restored submitted attempt away from editable quiz controls', async () => {
    const trial = trialsById.get('ww-control')
    if (!trial) throw new Error('Expected World Warrior control trial')
    const submitted = submitSession(createSession(trial.id, trial.questionIds))
    saveSession(localStorage, submitted)
    location.hash = '#/quiz'

    render(<FrameCheckApp />)

    expect(screen.getByText('Trial complete')).toBeInTheDocument()
    await waitFor(() => expect(location.hash).toBe('#/results'))
    expect(
      screen.queryByRole('button', { name: /Score my trial/i }),
    ).not.toBeInTheDocument()
  })
})
