import { render, screen } from '@testing-library/react'
import EmployeeList from '@/components/EmployeeList'
import type { EmployeeData } from '@/utils/types'
import { describe, it, expect } from 'vitest'

describe('EmployeeList', () => {
  const mockEmployees: EmployeeData[] = [
    { id: "2", name: "Bob", designation: "CTO", team: "Engineering", manager: "1"},
    { id: "3", name: "Eva", designation: "Support Manager", team: "Tech Support", manager: "1" }
  ]

  it('renders the correct number of employees', () => {
    render(<EmployeeList employeeList={mockEmployees} />)
    const employeeNames = screen.getAllByRole('heading', { level: 2 })
    expect(employeeNames).toHaveLength(mockEmployees.length)
  })

  it('renders employee details correctly', () => {
    render(<EmployeeList employeeList={mockEmployees} />)

    mockEmployees.forEach((employee) => {
      expect(screen.getByText(employee.name)).toBeInTheDocument()
      expect(screen.getByText(employee.designation)).toBeInTheDocument()
      expect(screen.getByText(employee.team)).toBeInTheDocument()
    })
  })

  it('renders nothing if employee list is empty', () => {
    render(<EmployeeList employeeList={[]} />)
    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument()
  })
})
