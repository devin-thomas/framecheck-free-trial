import { brand } from '../app/brand'
import type { AppRoute } from '../app/routes'

type HeaderProps = {
  route: AppRoute
  onHome: () => void
  onMethod: () => void
  onInstall: (() => void) | null
  onInstallHelp: (() => void) | null
}

export function Header({
  route,
  onHome,
  onMethod,
  onInstall,
  onInstallHelp,
}: HeaderProps) {
  return (
    <header className="site-header">
      <button
        className="wordmark"
        onClick={onHome}
        aria-label="FrameCheck home"
      >
        <span>Frame</span>Check <small>{brand.creatorLine}</small>
      </button>
      <nav aria-label="Primary navigation">
        <button
          className={route === 'catalog' ? 'active' : ''}
          onClick={onHome}
        >
          Trials
        </button>
        <button onClick={onMethod}>How it works</button>
        {onInstall ? <button onClick={onInstall}>Install</button> : null}
        {onInstallHelp ? (
          <button onClick={onInstallHelp}>Install on iOS</button>
        ) : null}
      </nav>
    </header>
  )
}
