import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import MainLayout from '@/components/MainLayout';
import { describe, it, expect, vi } from 'vitest'


vi.mock('@/components/CustomNode', () => ({
  __esModule: true,
  default: ({ nodeDatum }: any) => <div>{nodeDatum.name}</div>,
}));

// Mock react-d3-tree
vi.mock('react-d3-tree', async (importOriginal) => {
  const original: object = await importOriginal();
  return {
    ...original,
    default: ({ data }: any) => <div data-testid="tree-component">Tree: {data.name}</div>,
  };
});

const mockStore = configureStore([]);

describe('MainLayout', () => {
  it('should render Tree component when employee list exists', () => {
    const employeeList = [
      { id: '3', name: 'Eva', designation: 'Support Manager', team: 'Tech Support', manager: "1" },
      { id: '4', name: 'Grace', designation: 'Marketing Manager', team: 'Marketing', manager: "1" }
    ];

    const store = mockStore({
      employeeData: {
        filteredEmployeeList: employeeList,
      },
    });

    render(
      <Provider store={store}>
        <MainLayout />
      </Provider>
    );

    expect(screen.getByTestId('tree-component')).toBeInTheDocument();
  });

  it('should not render Tree when employee list is empty', () => {
    const store = mockStore({
      employeeData: {
        filteredEmployeeList: [],
      },
    });

    render(
      <Provider store={store}>
        <MainLayout />
      </Provider>
    );

    expect(screen.queryByTestId('tree-component')).not.toBeInTheDocument();
  });
});
