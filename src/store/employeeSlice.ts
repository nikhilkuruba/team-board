import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employeeList",
  initialState: {
    employeeList: [],
    
  },
  reducers: {
    setEmployeeList: (state, action) => {
      state.employeeList = action.payload;
    },
  }
})


export const { setEmployeeList } = employeeSlice.actions;
export default employeeSlice.reducer;