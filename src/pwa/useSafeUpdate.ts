import { useCallback, useEffect, useState } from 'react'

export function useSafeUpdate() {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null)

  useEffect(() => {
    if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return
    let disposed = false
    let registration: ServiceWorkerRegistration | null = null

    const detectWaitingWorker = () => {
      const worker = registration?.installing
      if (!worker) return
      const detectInstalled = () => {
        if (
          !disposed &&
          worker.state === 'installed' &&
          navigator.serviceWorker.controller
        ) {
          setWaitingWorker(registration?.waiting ?? worker)
        }
      }
      worker.addEventListener('statechange', detectInstalled)
    }

    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`)
      .then((nextRegistration) => {
        if (disposed) return
        registration = nextRegistration
        if (registration.waiting) setWaitingWorker(registration.waiting)
        registration.addEventListener('updatefound', detectWaitingWorker)
        return registration.update()
      })
      .catch((error: unknown) => {
        console.error('FrameCheck offline worker registration failed', error)
      })

    return () => {
      disposed = true
      registration?.removeEventListener('updatefound', detectWaitingWorker)
    }
  }, [])

  const activateUpdate = useCallback(() => {
    if (!waitingWorker) return
    let reloading = false
    const reload = () => {
      if (reloading) return
      reloading = true
      location.reload()
    }
    navigator.serviceWorker.addEventListener('controllerchange', reload, {
      once: true,
    })
    waitingWorker.postMessage('SKIP_WAITING')
  }, [waitingWorker])

  return {
    updateAvailable: Boolean(waitingWorker),
    activateUpdate,
    dismissUpdate: () => setWaitingWorker(null),
  }
}
