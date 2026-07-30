import { useEffect, useState } from 'react'

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

type NavigatorWithStandalone = Navigator & { standalone?: boolean }

export function useInstallPrompt() {
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(
    null,
  )
  const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent)
  const isStandalone =
    (typeof matchMedia === 'function' &&
      matchMedia('(display-mode: standalone)').matches) ||
    Boolean((navigator as NavigatorWithStandalone).standalone)

  useEffect(() => {
    const capturePrompt = (event: Event) => {
      event.preventDefault()
      setInstallEvent(event as InstallPromptEvent)
    }
    addEventListener('beforeinstallprompt', capturePrompt)
    return () => removeEventListener('beforeinstallprompt', capturePrompt)
  }, [])

  const install = installEvent
    ? async () => {
        await installEvent.prompt()
        await installEvent.userChoice
        setInstallEvent(null)
      }
    : null

  return {
    install,
    showIosHelp: isIos && !isStandalone && !installEvent,
  }
}
