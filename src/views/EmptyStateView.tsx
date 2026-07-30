type EmptyStateViewProps = {
  title: string
  message: string
  onHome: () => void
}

export function EmptyStateView({
  title,
  message,
  onHome,
}: EmptyStateViewProps) {
  return (
    <section className="empty">
      <p className="kicker">No active trial</p>
      <h1 data-view-heading tabIndex={-1}>
        {title}
      </h1>
      <p>{message}</p>
      <button className="cta compact" onClick={onHome}>
        Browse free trials
      </button>
    </section>
  )
}
