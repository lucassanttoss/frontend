import '@testing-library/jest-dom'
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Nav } from '@/components/nav'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn()
  }),
  useSearchParams: () => new URLSearchParams('?projectId=1'),
}))

jest.mock('../../../src/components/nav/actions.tsx', () => ({
  getProjects: jest.fn().mockResolvedValue([
    {
      id: 1,
      name: 'Project A',
      currency: 'USD',
      totalBudget: 10000,
      remainingBudget: 4500
    },
    {
      id: 2,
      name: 'Project B',
      currency: 'EUR',
      totalBudget: 20000,
      remainingBudget: 10000
    }
  ])
}))

describe('Nav', () => {
  it('renders the logo and project selector', async () => {
    render(<Nav />)
    await waitFor(() => {
      expect(screen.getByText('Project:')).toBeInTheDocument()
      expect(screen.getByRole('combobox')).toBeInTheDocument()
      expect(screen.getByText('Project A')).toBeInTheDocument()
    })
  })

  it('shows project budget info after loading', async () => {
    render(<Nav />)
    await waitFor(() => {
      expect(screen.getByText(/Total Project Budget:/)).toBeInTheDocument()
      expect(screen.getByText(/4500/)).toBeInTheDocument()
      expect(screen.getByText(/USD/)).toBeInTheDocument()
    })
  })

  it('toggles the dropdown menu when clicking the user', async () => {
    render(<Nav />)
    const welcome = screen.getByText(/Welcome, Ulrik Roger/)
    fireEvent.click(welcome)

    expect(await screen.findByText('Log out')).toBeInTheDocument()
  })
})
