import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { Sidebar } from '@/components/sidebar'

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams('?projectId=1'),
}))

describe('Sidebar', () => {
  it('renders main nav items', () => {
    render(<Sidebar />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('BoQ')).toBeInTheDocument()
    expect(screen.getByText('Open Budget')).toBeInTheDocument()
  })

  it('expands dropdown on click', () => {
    render(<Sidebar />)
    const openBudgetBtn = screen.getByText('Open Budget')
    fireEvent.click(openBudgetBtn)
    expect(screen.getByText('Report')).toBeInTheDocument()
  })

  it('handles keyboard interaction', () => {
    render(<Sidebar />)
    const openBudgetBtn = screen.getByText('Open Budget')
    fireEvent.keyDown(openBudgetBtn, { key: 'Enter' })
    expect(screen.getByText('Report')).toBeInTheDocument()
  })
})
