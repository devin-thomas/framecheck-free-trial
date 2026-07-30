import { brand } from '../app/brand'

export function Footer() {
  return (
    <footer>
      <div className="wordmark">
        <span>Frame</span>Check <small>{brand.creatorLine}</small>
      </div>
      <p>Original demonstration questions. Progress stays in this browser.</p>
      <div>
        <a
          href={`${import.meta.env.BASE_URL}questions-and-answers.md`}
          download
        >
          Download question bank
        </a>
        <a
          href="https://game.capcom.com/manual/sfv/en-us/page.html?cat=2&subcat=2"
          target="_blank"
          rel="noreferrer"
        >
          Capcom references
        </a>
        <a
          href="https://en.bandainamcoent.eu/tekken/news/tekken-8-the-guide-start-playing"
          target="_blank"
          rel="noreferrer"
        >
          Bandai Namco references
        </a>
      </div>
    </footer>
  )
}
