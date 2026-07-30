import {
  domainsById,
  questionsById,
  sourceLabels,
  sourceUrls,
} from '../content/question-bank'
import type { TrialSession } from '../content/types'
import { scoreSession } from '../session/scoring'

type ResultsViewProps = {
  session: TrialSession
  onRetake: () => void
  onChooseTrack: () => void
  onClear: () => void
}

export function ResultsView({
  session,
  onRetake,
  onChooseTrack,
  onClear,
}: ResultsViewProps) {
  const score = scoreSession(session, questionsById)
  const percent = score.total
    ? Math.round((score.correct / score.total) * 100)
    : 0

  return (
    <section className="results">
      <div className="score-block">
        <p className="kicker">Trial complete</p>
        <p className="score">
          {percent}
          <small>%</small>
        </p>
        <h1 data-view-heading tabIndex={-1}>
          {percent >= 80
            ? 'Sharp read.'
            : percent >= 60
              ? 'Foundation found.'
              : 'Gap located.'}
        </h1>
        <p>
          {score.correct} correct from {score.total}. Review the misses, then
          take one focused idea into training.
        </p>
        <div className="result-actions">
          <button className="cta compact" onClick={onRetake}>
            Retake trial
          </button>
          <button onClick={onChooseTrack}>Choose another track</button>
          <button onClick={onClear}>Clear local progress</button>
        </div>
      </div>
      <div className="domain-scores">
        <p className="section-number">Domain readout</p>
        {score.domains.map((domainScore) => {
          const domain = domainsById.get(domainScore.domainId)
          if (!domain)
            throw new Error(`Unknown score domain ${domainScore.domainId}`)
          const value = Math.round(
            (domainScore.correct / domainScore.total) * 100,
          )
          return (
            <div key={domain.id}>
              <span>{domain.title}</span>
              <div
                className="score-bar"
                role="meter"
                aria-label={`${domain.title} score`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={value}
              >
                <i style={{ width: `${value}%` }} />
              </div>
              <b>
                {domainScore.correct}/{domainScore.total}
              </b>
            </div>
          )
        })}
      </div>
      <div className="review-list">
        <p className="section-number">Answer review</p>
        {session.questionIds.map((id, index) => {
          const question = questionsById.get(id)
          if (!question) throw new Error(`Unknown review question ${id}`)
          const learnerAnswer = session.answers[id]
          const correct = learnerAnswer === question.correctIndex
          return (
            <details key={id}>
              <summary>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <b className={correct ? 'pass' : 'miss'}>
                  {correct ? 'Correct' : 'Review'}
                </b>
                {question.prompt}
              </summary>
              <div>
                <p>
                  <strong>Your answer:</strong>{' '}
                  {learnerAnswer === undefined
                    ? 'Not answered'
                    : question.choices[learnerAnswer]}
                </p>
                <p>
                  <strong>Correct answer:</strong>{' '}
                  {question.choices[question.correctIndex]}
                </p>
                <p>{question.rationale}</p>
                <small>
                  <a
                    href={sourceUrls[question.sourceId]}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {sourceLabels[question.sourceId]}
                  </a>{' '}
                  - reviewed {question.reviewedAt} - {question.rights}
                </small>
              </div>
            </details>
          )
        })}
      </div>
    </section>
  )
}
