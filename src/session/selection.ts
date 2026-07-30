import type { TrialDefinition } from '../content/types'

export function selectTrialQuestionIds(
  trial: TrialDefinition,
  random: () => number = Math.random,
  previousQuestionIds: readonly string[] = [],
): readonly string[] {
  if (trial.questionIds.length <= trial.questionCount) {
    return [...trial.questionIds]
  }

  const shuffled = [...trial.questionIds]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    const current = shuffled[index]
    shuffled[index] = shuffled[swapIndex]
    shuffled[swapIndex] = current
  }

  const selected = shuffled.slice(0, trial.questionCount)
  const previous = new Set(previousQuestionIds)
  const repeatedSet =
    previous.size === selected.length &&
    selected.every((questionId) => previous.has(questionId))

  if (repeatedSet) {
    const replacement = shuffled[selected.length]
    if (replacement) selected[selected.length - 1] = replacement
  }
  return selected
}
