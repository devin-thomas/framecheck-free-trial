type UpdatePromptProps = {
  activeQuiz: boolean
  onActivate: () => void
  onDismiss: () => void
}

export function UpdatePrompt({
  activeQuiz,
  onActivate,
  onDismiss,
}: UpdatePromptProps) {
  return (
    <div className="update-toast" role="status">
      <span>
        {activeQuiz
          ? 'A fresh build is ready. Finish this trial before updating.'
          : 'A fresh build is ready.'}
      </span>
      {!activeQuiz ? <button onClick={onActivate}>Update now</button> : null}
      <button aria-label="Dismiss update" onClick={onDismiss}>
        x
      </button>
    </div>
  )
}
