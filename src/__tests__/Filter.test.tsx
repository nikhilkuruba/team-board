import { render, screen, fireEvent } from '@testing-library/react'
import TeamFilterSelect from '@/components/Filter'
import { describe, beforeEach, vi,  it, expect } from 'vitest'

describe('Filter', () => {
  const mockTeams = ['Engineering', 'Tech Support', 'DevOps']
  const mockOnTeamChange = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the select dropdown and options', () => {
    render(<TeamFilterSelect teams={mockTeams} onTeamChange={mockOnTeamChange} />)

    fireEvent.mouseDown(screen.getByLabelText('Filter by Team'))
    expect(screen.getByText('All Teams')).toBeInTheDocument()
    mockTeams.forEach(team => {
      expect(screen.getByText(team)).toBeInTheDocument()
    })
  })

  it('calls onTeamChange when a team is selected', () => {
    render(<TeamFilterSelect teams={mockTeams} onTeamChange={mockOnTeamChange} />)

    fireEvent.mouseDown(screen.getByLabelText('Filter by Team'))
    const option = screen.getByText('Engineering')
    fireEvent.click(option)

    expect(mockOnTeamChange).toHaveBeenCalledWith('Engineering')
  })

  it('renders nothing if teams array is empty', () => {
    render(<TeamFilterSelect teams={[]} onTeamChange={mockOnTeamChange} />)
    fireEvent.mouseDown(screen.getByLabelText('Filter by Team'))
    expect(screen.queryByText('All Teams')).not.toBeInTheDocument()
  })
})
