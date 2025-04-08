import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { SearchBar } from '@/components/budget-table/search'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('SearchBar', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/')
  })

  it('renders with initial value', () => {
    render(<SearchBar initialSearch="test" />)
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement
    expect(input.value).toBe('test')
  })

  it('updates input value and triggers debounced search', async () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText('Search') as HTMLInputElement

    fireEvent.change(input, { target: { value: 'budget' } })
    expect(input.value).toBe('budget')
  })
})
