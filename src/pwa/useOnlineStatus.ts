import { useEffect, useState } from 'react'

export function useOnlineStatus(): boolean {
  const [online, setOnline] = useState(() => navigator.onLine)

  useEffect(() => {
    const verifyConnection = async () => {
      if (!navigator.onLine) {
        setOnline(false)
        return
      }
      if (!import.meta.env.PROD) {
        setOnline(true)
        return
      }
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}online-check.txt?time=${Date.now()}`,
          { cache: 'no-store' },
        )
        setOnline(response.ok)
      } catch {
        setOnline(false)
      }
    }
    const markOnline = () => void verifyConnection()
    const markOffline = () => setOnline(false)
    addEventListener('online', markOnline)
    addEventListener('offline', markOffline)
    void verifyConnection()
    return () => {
      removeEventListener('online', markOnline)
      removeEventListener('offline', markOffline)
    }
  }, [])

  return online
}
