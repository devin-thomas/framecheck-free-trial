export function OfflineBanner({ online }: { online: boolean }) {
  if (online) return null
  return (
    <div className="offline-banner" role="status">
      Offline mode: saved trials and cached guidance remain available.
    </div>
  )
}
