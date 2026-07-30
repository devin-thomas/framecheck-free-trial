export function InstallHelp({ onClose }: { onClose: () => void }) {
  return (
    <div className="dialog-backdrop" role="presentation">
      <section
        className="dialog-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="install-help-title"
      >
        <p className="kicker">Install on iPhone or iPad</p>
        <h2 id="install-help-title">Add FrameCheck to your Home Screen</h2>
        <ol>
          <li>Open the Share menu in Safari.</li>
          <li>Choose Add to Home Screen.</li>
          <li>Confirm Add to keep the offline-ready app nearby.</li>
        </ol>
        <button className="cta compact" onClick={onClose}>
          Got it
        </button>
      </section>
    </div>
  )
}
