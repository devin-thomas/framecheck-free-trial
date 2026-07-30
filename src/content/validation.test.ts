// @vitest-environment node

import { describe, expect, it } from 'vitest'
import { domains, questions, sourceUrls, tracks, trials } from './question-bank'
import { validateCatalog } from './validation'

describe('public question catalog', () => {
  it('contains the complete validated assessment inventory', () => {
    const focused = trials.filter((trial) => trial.domainId !== 'mixed')
    const mixed = trials.filter((trial) => trial.domainId === 'mixed')

    expect(questions).toHaveLength(164)
    expect(domains).toHaveLength(11)
    expect(focused).toHaveLength(11)
    expect(mixed).toHaveLength(2)
    expect(
      validateCatalog({ questions, domains, tracks, trials, sourceUrls }),
    ).toEqual([])
  })
})
