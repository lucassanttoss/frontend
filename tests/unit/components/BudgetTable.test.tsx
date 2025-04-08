import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import BudgetTable from '@/components/budget-table/table'

describe('BudgetTable', () => {
  const budgets = [
    {
      id: 1,
      projectId: 101,
      code: 'TR-001',
      fromFTMCode: 'FTM-A',
      fromAmount: '1000.00',
      toFTMCode: 'FTM-B',
      toAmount: '500.00',
      typeAction: 'Transfer',
      createdOn: '2024-04-01T00:00:00Z',
      createdBy: 'victor.muniz@cts-nordics.com',
      UpdateOn: '2024-04-02T00:00:00Z'
    }
  ]

  it('renders no results message when budgets is undefined', () => {
    render(<BudgetTable budgets={undefined} />)
    expect(screen.getByText(/No results were found/)).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/')
  })

  it('renders no results message when budgets is empty', () => {
    render(<BudgetTable budgets={[]} />)
    expect(screen.getByText(/No results were found/)).toBeInTheDocument()
  })

  it('renders table headers correctly', () => {
    render(<BudgetTable budgets={budgets} />)
    expect(screen.getByText('Code')).toBeInTheDocument()
    expect(screen.getByText('From TFM Code')).toBeInTheDocument()
    expect(screen.getByText('From Amount')).toBeInTheDocument()
    expect(screen.getByText('To TFM Code')).toBeInTheDocument()
    expect(screen.getByText('To Amount')).toBeInTheDocument()
    expect(screen.getByText('Created On')).toBeInTheDocument()
    expect(screen.getByText('Created By')).toBeInTheDocument()
    expect(screen.getByText('Updated On')).toBeInTheDocument()
  })

  it('renders budget data correctly', () => {
    render(<BudgetTable budgets={budgets} />)
    expect(screen.getByText('TR-001')).toBeInTheDocument()
    expect(screen.getByText('FTM-A')).toBeInTheDocument()
    expect(screen.getByText('1000.00')).toBeInTheDocument()
    expect(screen.getByText('500.00')).toBeInTheDocument()
    expect(screen.getByText('Transfer')).toBeInTheDocument()
    expect(screen.getByText('victor.muniz@cts-nordics.com')).toBeInTheDocument()
  })
})
