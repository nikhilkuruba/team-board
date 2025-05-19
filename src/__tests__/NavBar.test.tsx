import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import NavBar from '@/components/NavBar';
import employeeReducer from '@/store/employeeSlice';
import { vi, describe, it, expect } from 'vitest';

// Mock useDebounce 
vi.mock('@/hooks/useDebounce', () => ({
  useDebounce: (value: string) => value,
}));

// Mock child components
vi.mock('@/components/Filter', () => ({
  default: ({ teams, onTeamChange }: any) => (
    <div>
      <select data-testid="team-filter" onChange={(e) => onTeamChange(e.target.value)}>
        <option value="">All</option>
        {teams.map((team: string) => (
          <option key={team} value={team}>{team}</option>
        ))}
      </select>
    </div>
  ),
}));

vi.mock('@/components/EmployeeList', () => ({
  default: ({ employeeList }: any) => (
    <ul data-testid="employee-list">
      {employeeList.map((emp: any) => (
        <li key={emp.id}>{emp.name}</li>
      ))}
    </ul>
  ),
}));

// Mock employee data
const mockEmployees = [
  { id: '12', name: 'Alice', designation: 'Support engineer', team: 'Tech Support', manager: '2' },
  { id: '2', name: 'Bob', designation: 'CTO', team: 'Engineering', manager: '1' },
  { id: '7', name: 'Charlie', designation: 'Development manager', team: 'Engineering', manager: '1' },
];

// render with store
const renderWithStore = (initialState: any) => {
  const store = configureStore({
    reducer: {
      employeeData: employeeReducer,
    },
    preloadedState: {
      employeeData: initialState,
    },
  });

  return render(
    <Provider store={store}>
      <NavBar />
    </Provider>
  );
};

describe('NavBar', () => {
  it('renders search input and filter dropdown', () => {
    renderWithStore({ employeeList: mockEmployees, filteredEmployeeList: mockEmployees });

    expect(screen.getByPlaceholderText('Search by name, id or designation')).toBeInTheDocument();
    expect(screen.getByTestId('team-filter')).toBeInTheDocument();
  });

  it('filters employee list by search input', async () => {
    renderWithStore({ employeeList: mockEmployees, filteredEmployeeList: mockEmployees });

    const input = screen.getByPlaceholderText('Search by name, id or designation');
    fireEvent.change(input, { target: { value: 'Ali' } });

    await waitFor(() => {
      const employees = screen.getAllByRole('listitem');
      expect(employees).toHaveLength(1);
      expect(employees[0]).toHaveTextContent('Alice');
    });
  });

  it('filters employee list by team', async () => {
    renderWithStore({ employeeList: mockEmployees, filteredEmployeeList: mockEmployees });

    const select = screen.getByTestId('team-filter');
    fireEvent.change(select, { target: { value: 'Engineering' } });

    await waitFor(() => {
      const employees = screen.getAllByRole('listitem');
      expect(employees).toHaveLength(2);
      expect(employees[0]).toHaveTextContent('Bob');
    });
  });

  it('shows all employees by default', () => {
    renderWithStore({ employeeList: mockEmployees, filteredEmployeeList: mockEmployees });

    const employees = screen.getAllByRole('listitem');
    expect(employees).toHaveLength(3);
  });
});
