import { brand } from '../app/brand'
import { domains, tracks } from '../content/question-bank'
import type { TrackId } from '../content/types'

type CatalogViewProps = {
  trackId: TrackId
  onTrack: (trackId: TrackId) => void
  onStart: (trialId: string) => void
}

export function CatalogView({ trackId, onTrack, onStart }: CatalogViewProps) {
  const track = tracks.find((candidate) => candidate.id === trackId)
  if (!track) throw new Error(`Unknown catalog track ${trackId}`)
  const trackDomains = domains.filter((domain) => domain.trackId === trackId)

  return (
    <>
      <section className="hero">
        <p className="kicker">Free trial - no account required</p>
        <h1 data-view-heading tabIndex={-1}>
          Find the gap.
          <br />
          <em>Train the answer.</em>
        </h1>
        <p className="hero-copy">
          Free, focused fundamentals checks for players who want a clearer
          practice plan.
        </p>
        <a className="cta" href="#trials">
          Start a free trial <span aria-hidden="true">&#8600;</span>
        </a>
        <div className="hero-meter" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>
      <section className="trial-section" id="trials">
        <div className="section-heading">
          <p className="section-number">01 / choose a track</p>
          <h2>
            Two disciplines.
            <br />
            One sharper read.
          </h2>
        </div>
        <div className="track-tabs" aria-label="Demo tracks">
          {tracks.map((item, index) => (
            <button
              key={item.id}
              aria-pressed={item.id === trackId}
              onClick={() => onTrack(item.id)}
            >
              <b>0{index + 1}</b>
              {item.title}
            </button>
          ))}
        </div>
        <div className="track-intro">
          <div>
            <p className="kicker">Selected discipline</p>
            <h3>{track.title}</h3>
            <p>{track.description}</p>
          </div>
          <button
            className="cta compact"
            onClick={() =>
              onStart(trackId === 'world-warrior' ? 'ww-mixed' : 'if-mixed')
            }
          >
            Take the 30-question mix <span aria-hidden="true">&#8594;</span>
          </button>
        </div>
        <div className="domain-grid">
          {trackDomains.map((domain, index) => (
            <article className="domain-card" key={domain.id}>
              <div className="card-index">
                {String(index + 1).padStart(2, '0')}
                <span>10 questions</span>
              </div>
              <h3>{domain.title}</h3>
              <p>{domain.description}</p>
              <button onClick={() => onStart(domain.id)}>
                Start domain trial <span aria-hidden="true">&#8594;</span>
              </button>
            </article>
          ))}
        </div>
      </section>
      <section className="method" id="method">
        <p className="section-number">02 / how it works</p>
        <div>
          <h2>Answer. Review. Lab it.</h2>
          <p>
            Each result names the domain that needs attention and explains every
            answer. Progress stays on this device; no login, cloud profile, or
            payment is involved.
          </p>
        </div>
      </section>
      <p className="disclaimer">
        {brand.disclaimer} No account required. Progress stays on this device.
      </p>
    </>
  )
}
