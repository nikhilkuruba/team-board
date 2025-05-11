import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from './employeeSlice'

const store = configureStore(
  {
    reducer: {
      employeeData: employeeReducer
    }
  }
)

export default store