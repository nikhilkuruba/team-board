import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employeeList",
  initialState: {
    employeeList: [],
    filteredEmployeeList: [],
  },
  reducers: {
    setEmployeeList: (state, action) => {
      state.employeeList = action.payload;
    },
    setFilteredEmployeeList: (state, action) => {
      state.filteredEmployeeList = action.payload;
    },
  },
});

export const { setEmployeeList, setFilteredEmployeeList } =
  employeeSlice.actions;
export default employeeSlice.reducer;
