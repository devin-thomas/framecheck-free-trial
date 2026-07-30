import { useState } from 'react'
import {
  domainsById,
  questionsById,
  trialsById,
} from '../content/question-bank'
import type { TrialSession } from '../content/types'
import {
  answerQuestion,
  countUnanswered,
  moveToQuestion,
} from '../session/model'

type QuizViewProps = {
  session: TrialSession
  onChange: (session: TrialSession) => void
  onSubmit: () => void
  onRecover: () => void
}

export function QuizView({
  session,
  onChange,
  onSubmit,
  onRecover,
}: QuizViewProps) {
  const [confirming, setConfirming] = useState(false)
  const trial = trialsById.get(session.trialId)
  const question = questionsById.get(session.questionIds[session.currentIndex])

  if (!trial || !question) {
    return (
      <section className="empty">
        <p className="kicker">Trial recovery needed</p>
        <h1 data-view-heading tabIndex={-1}>
          This saved trial is no longer available.
        </h1>
        <button className="cta compact" onClick={onRecover}>
          Reset and browse trials
        </button>
      </section>
    )
  }

  const answer = session.answers[question.id]
  const unanswered = countUnanswered(session)
  const requestSubmission = () => {
    if (unanswered > 0) {
      setConfirming(true)
      return
    }
    onSubmit()
  }

  return (
    <section className="quiz-layout">
      <aside className="quiz-rail">
        <p className="kicker">Active trial</p>
        <h1 data-view-heading tabIndex={-1}>
          {trial.title}
        </h1>
        <p>
          {session.questionIds.length - unanswered} of{' '}
          {session.questionIds.length} answered
        </p>
        <div className="question-map" aria-label="Question map">
          {session.questionIds.map((id, index) => (
            <button
              key={id}
              className={`${index === session.currentIndex ? 'current' : ''} ${session.answers[id] !== undefined ? 'answered' : ''}`}
              aria-label={`Question ${index + 1}`}
              aria-current={index === session.currentIndex ? 'step' : undefined}
              onClick={() => onChange(moveToQuestion(session, index))}
            >
              {String(index + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      </aside>
      <article className="question-panel">
        <div className="question-meta">
          <span>
            Question {String(session.currentIndex + 1).padStart(2, '0')} /{' '}
            {session.questionIds.length}
          </span>
          <span>{domainsById.get(question.domainId)?.title}</span>
        </div>
        <h2>{question.prompt}</h2>
        <fieldset>
          <legend className="sr-only">Choose one answer</legend>
          {question.choices.map((choice, index) => (
            <label key={choice} className={answer === index ? 'selected' : ''}>
              <input
                type="radio"
                name={question.id}
                checked={answer === index}
                onChange={() =>
                  onChange(answerQuestion(session, question.id, index))
                }
              />
              <b>{String.fromCharCode(65 + index)}</b>
              <span>{choice}</span>
            </label>
          ))}
        </fieldset>
        <div className="quiz-actions">
          <button
            disabled={session.currentIndex === 0}
            onClick={() =>
              onChange(moveToQuestion(session, session.currentIndex - 1))
            }
          >
            &#8592; Previous
          </button>
          {session.currentIndex < session.questionIds.length - 1 ? (
            <button
              className="cta compact"
              onClick={() =>
                onChange(moveToQuestion(session, session.currentIndex + 1))
              }
            >
              Next question &#8594;
            </button>
          ) : (
            <button className="cta compact" onClick={requestSubmission}>
              Score my trial &#8594;
            </button>
          )}
        </div>
      </article>
      {confirming ? (
        <div className="dialog-backdrop" role="presentation">
          <section
            className="dialog-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="submit-dialog-title"
          >
            <p className="kicker">Check your read</p>
            <h2 id="submit-dialog-title">Submit with unanswered questions?</h2>
            <p>
              {unanswered} {unanswered === 1 ? 'question is' : 'questions are'}{' '}
              unanswered. Unanswered questions count as misses, and a submitted
              trial cannot be edited.
            </p>
            <div className="dialog-actions">
              <button onClick={() => setConfirming(false)}>
                Keep answering
              </button>
              <button className="cta compact" onClick={onSubmit}>
                Submit anyway
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </section>
  )
}
