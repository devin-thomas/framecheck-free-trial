import { useCallback, useEffect, useState } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { InstallHelp } from '../components/InstallHelp'
import { OfflineBanner } from '../components/OfflineBanner'
import { UpdatePrompt } from '../components/UpdatePrompt'
import { questionsById, trialsById } from '../content/question-bank'
import type { TrackId, TrialSession } from '../content/types'
import { useInstallPrompt } from '../pwa/useInstallPrompt'
import { useOnlineStatus } from '../pwa/useOnlineStatus'
import { useSafeUpdate } from '../pwa/useSafeUpdate'
import { createSession, submitSession } from '../session/model'
import { selectTrialQuestionIds } from '../session/selection'
import { clearSession, loadSession, saveSession } from '../session/storage'
import { CatalogView } from '../views/CatalogView'
import { EmptyStateView } from '../views/EmptyStateView'
import { QuizView } from '../views/QuizView'
import { ResultsView } from '../views/ResultsView'
import { hashForRoute, routeFromHash, type AppRoute } from './routes'

export function FrameCheckApp() {
  const [initialLoad] = useState(() =>
    loadSession(localStorage, trialsById, questionsById),
  )
  const [route, setRoute] = useState<AppRoute>(routeFromHash)
  const [trackId, setTrackId] = useState<TrackId>('world-warrior')
  const [session, setSession] = useState<TrialSession | null>(
    initialLoad.session,
  )
  const [notice, setNotice] = useState<string | null>(() => {
    if (initialLoad.status === 'reset') {
      return 'Saved progress was incompatible or damaged, so it was safely reset.'
    }
    if (initialLoad.status === 'unavailable') {
      return 'Browser storage is unavailable. This trial will not survive a refresh.'
    }
    if (initialLoad.status === 'restored') {
      return initialLoad.session.submittedAt
        ? 'Your submitted result was restored on this device.'
        : 'Your in-progress trial was restored on this device.'
    }
    return null
  })
  const [showInstallHelp, setShowInstallHelp] = useState(false)
  const online = useOnlineStatus()
  const installPrompt = useInstallPrompt()
  const update = useSafeUpdate()

  const navigate = useCallback((nextRoute: AppRoute, replace = false) => {
    const hash = hashForRoute(nextRoute)
    if (replace) history.replaceState({}, '', hash)
    else history.pushState({}, '', hash)
    setRoute(nextRoute)
    scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const followHistory = () => setRoute(routeFromHash())
    addEventListener('hashchange', followHistory)
    return () => removeEventListener('hashchange', followHistory)
  }, [])

  useEffect(() => {
    const focusHeading = window.setTimeout(() => {
      document.querySelector<HTMLElement>('[data-view-heading]')?.focus()
    })
    return () => window.clearTimeout(focusHeading)
  }, [route])

  useEffect(() => {
    if (route === 'quiz' && session?.submittedAt) navigate('results', true)
  }, [navigate, route, session?.submittedAt])

  const persist = (nextSession: TrialSession) => {
    if (!saveSession(localStorage, nextSession)) {
      setNotice('Browser storage is unavailable. Keep this tab open to finish.')
    }
    setSession(nextSession)
  }

  const startTrial = (trialId: string) => {
    const trial = trialsById.get(trialId)
    if (!trial) throw new Error(`Unknown public trial ${trialId}`)
    const previousQuestionIds =
      session?.trialId === trial.id ? session.questionIds : []
    const nextSession = createSession(
      trial.id,
      selectTrialQuestionIds(trial, Math.random, previousQuestionIds),
    )
    persist(nextSession)
    setNotice(null)
    navigate('quiz')
  }

  const submit = () => {
    if (!session) return
    const submitted = submitSession(session)
    persist(submitted)
    navigate('results')
  }

  const clearProgress = () => {
    if (!clearSession(localStorage)) {
      setNotice(
        'Browser storage could not be cleared. You can still start over here.',
      )
    } else {
      setNotice('Local trial progress was cleared.')
    }
    setSession(null)
    navigate('catalog')
  }

  const showMethod = () => {
    navigate('catalog')
    window.setTimeout(() => {
      document.getElementById('method')?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  const activeQuiz =
    route === 'quiz' && Boolean(session && !session.submittedAt)
  const routeLabel =
    route === 'catalog'
      ? 'Trial catalog'
      : route === 'quiz'
        ? 'Active trial'
        : 'Trial results'

  return (
    <div className="beta-shell">
      <Header
        route={route}
        onHome={() => navigate('catalog')}
        onMethod={showMethod}
        onInstall={installPrompt.install}
        onInstallHelp={
          installPrompt.showIosHelp ? () => setShowInstallHelp(true) : null
        }
      />
      <OfflineBanner online={online} />
      <div className="sr-only" role="status" aria-live="polite">
        {routeLabel}
      </div>
      {notice ? (
        <div className="notice-banner" role="status">
          <span>{notice}</span>
          <button aria-label="Dismiss notice" onClick={() => setNotice(null)}>
            x
          </button>
        </div>
      ) : null}
      <main>
        {route === 'catalog' ? (
          <CatalogView
            trackId={trackId}
            onTrack={setTrackId}
            onStart={startTrial}
          />
        ) : null}
        {route === 'quiz' && session && !session.submittedAt ? (
          <QuizView
            session={session}
            onChange={persist}
            onSubmit={submit}
            onRecover={clearProgress}
          />
        ) : null}
        {(route === 'results' || (route === 'quiz' && session?.submittedAt)) &&
        session?.submittedAt ? (
          <ResultsView
            session={session}
            onRetake={() => startTrial(session.trialId)}
            onChooseTrack={clearProgress}
            onClear={clearProgress}
          />
        ) : null}
        {route !== 'catalog' && !session ? (
          <EmptyStateView
            title="Pick a check. Find the gap."
            message="There is no recoverable trial on this device. Choose a track to begin."
            onHome={() => navigate('catalog')}
          />
        ) : null}
        {route === 'results' && session && !session.submittedAt ? (
          <EmptyStateView
            title="Finish the read before the result."
            message="This trial is still active. Return to it, or choose another track."
            onHome={() => navigate('quiz')}
          />
        ) : null}
      </main>
      <Footer />
      {showInstallHelp ? (
        <InstallHelp onClose={() => setShowInstallHelp(false)} />
      ) : null}
      {update.updateAvailable ? (
        <UpdatePrompt
          activeQuiz={activeQuiz}
          onActivate={update.activateUpdate}
          onDismiss={update.dismissUpdate}
        />
      ) : null}
    </div>
  )
}
