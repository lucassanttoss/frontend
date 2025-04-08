import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Pagination from '@/components/budget-table/pagination'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams('?page=2'),
}))

describe('Pagination', () => {
  it('disables previous button on first page', () => {
    render(<Pagination total={100} currentPage={1} limit={10} />)
    const prevButton = screen.getAllByRole('button')[0]
    expect(prevButton).toBeDisabled()
  })

  it('disables next button on last page', () => {
    render(<Pagination total={20} currentPage={2} limit={10} />)
    const nextButton = screen.getAllByRole('button')[1]
    expect(nextButton).toBeDisabled()
  })

  it('renders correct range text', () => {
    render(<Pagination total={100} currentPage={2} limit={10} />)
    expect(screen.getByText('11 – 20 de 100')).toBeInTheDocument()
  })
})
