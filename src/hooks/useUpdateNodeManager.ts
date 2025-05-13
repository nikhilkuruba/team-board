import { useDispatch, useSelector } from "react-redux";
import {
  setEmployeeList,
  setFilteredEmployeeList,
} from "@/store/employeeSlice";
import type { EmployeeData } from "@/utils/types";

export default function useUpdateNodeManager() {
  const dispatch = useDispatch();
  const employeeList = useSelector(
    (store: any) => store.employeeData?.employeeList || []
  );
  const filteredEmployeeList = useSelector(
    (store: any) => store.employeeData?.filteredEmployeeList || []
  );
  const updateManager = (employeeId: string, newManagerId: string) =>
    fetch(`/api/employees/${employeeId}/manager`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newManagerId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error updating manager:", error);
      });

  const updateManagerInStore = (employeeId: string, newManagerId: string) => {
    const employeeListCopy = [...employeeList.map((emp: EmployeeData) => ({ ...emp }))];
    const employee = employeeListCopy.find((emp) => emp.id === employeeId);

    const filteredEmployeeListCopy = [
      ...filteredEmployeeList.map((emp: EmployeeData) => ({ ...emp })),
    ];
    const filteredEmployee = filteredEmployeeListCopy.find(
      (emp) => emp.id === employeeId
    );

    employee.manager = newManagerId;
    filteredEmployee.manager = newManagerId;
    dispatch(setEmployeeList(employeeListCopy));
    dispatch(setFilteredEmployeeList(filteredEmployeeListCopy));
  };
  return { updateManager, updateManagerInStore };
}
