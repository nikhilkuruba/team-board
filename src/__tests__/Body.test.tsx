import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { describe, beforeEach, it, expect } from 'vitest'
import Body from '@/components/Body'
import employeeReducer from '@/store/employeeSlice'
import { vi } from 'vitest'

// Mock child components
vi.mock('@/components/Header', () => ({
  default: () => <div>Header</div>,
}))

vi.mock('@/components/MainLayout', () => ({
  default: () => <div>MainLayout</div>,
}))

vi.mock('@/components/NavBar', () => ({
  default: () => <div>NavBar</div>,
}))

// render with store
const renderWithStore = (el: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      employee: employeeReducer,
    },
  })

  return render(<Provider store={store}>{el}</Provider>)
}

beforeEach(() => {
  vi.restoreAllMocks()
})

describe('Body', () => {
  it('renders loader while fetching', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() =>
      new Promise(() => {})
    )

    renderWithStore(<Body />)
    expect(screen.getByRole('loading-spinner')).toBeInTheDocument()
  })

  it('renders error message when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
    }))

    renderWithStore(<Body />)

    await waitFor(() => {
      expect(screen.getByText('Error while fetching employee data')).toBeInTheDocument()
    })
  })

  it('renders no employee message when response is empty', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ employees: [] }),
    }))

    renderWithStore(<Body />)

    await waitFor(() => {
      expect(screen.getByText('No employees found')).toBeInTheDocument()
    })
  })

  it('renders NavBar and MainLayout components when data is fetched', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ employees: [{ id: 1, name: 'John Doe' }] }),
    }))

    renderWithStore(<Body />)

    await waitFor(() => {
      expect(screen.getByText('Header')).toBeInTheDocument()
      expect(screen.getByText('NavBar')).toBeInTheDocument()
      expect(screen.getByText('MainLayout')).toBeInTheDocument()
    })
  })
})
