export type TrackId = 'world-warrior' | 'iron-fist'

export type DomainId =
  | 'ww-control'
  | 'ww-defense'
  | 'ww-spacing'
  | 'if-control'
  | 'if-movement'
  | 'if-launch'
  | 'legacy-xvsf'
  | 'legacy-mshvsf'
  | 'legacy-mvc1'
  | 'legacy-tekken2'
  | 'legacy-t5dr'

export type Question = {
  id: string
  trackId: TrackId
  domainId: DomainId
  prompt: string
  choices: readonly [string, string, string, string]
  correctIndex: number
  rationale: string
  sourceId:
    | 'capcom-controls'
    | 'capcom-offense'
    | 'capcom-sfii'
    | 'bandai-guide'
    | 'bandai-3d'
    | 'capcom-xvsf'
    | 'capcom-mshvsf'
    | 'capcom-mvc1'
    | 'playstation-tekken-history'
    | 'playstation-t5dr'
  reviewedAt: '2026-07-28'
  rights: 'original-demo-copy'
}

export type Domain = {
  id: DomainId
  trackId: TrackId
  title: string
  description: string
}

export type Track = {
  id: TrackId
  title: string
  shortTitle: string
  description: string
  domainIds: readonly DomainId[]
}

export type TrialDefinition = {
  id: string
  trackId: TrackId
  domainId: DomainId | 'mixed'
  title: string
  questionCount: number
  questionIds: readonly string[]
}

export type TrialSession = {
  version: 1
  trialId: string
  questionIds: readonly string[]
  answers: Record<string, number>
  currentIndex: number
  startedAt: string
  submittedAt: string | null
}

export type DomainScore = {
  domainId: DomainId
  correct: number
  total: number
}
