import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PlaceholderApp } from './PlaceholderApp'

describe('public-safe application baseline', () => {
  it('renders the product and creator identity', () => {
    render(<PlaceholderApp />)

    expect(
      screen.getByRole('heading', { name: /find the gap/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/prototype by Devin Thomas/i)).toBeInTheDocument()
  })
})
