import { useDispatch, useSelector } from "react-redux";
import { setEmployeeList, setFilteredEmployeeList } from "@/store/employeeSlice";
import type { EmployeeData } from "@/utils/types";

export default function useUpdateNodeManager() {
  const dispatch = useDispatch();
  const employeeList = useSelector(
    (store: any) => store.employeeData?.employeeList || []
  );
  const filteredEmployeeList = useSelector(
    (store: any) => store.employeeData?.filteredEmployeeList || []
  );
  const updateManager = async (employeeId: string, newManagerId: string) => {
    try {
      const response = await fetch(`/api/employees/${employeeId}/manager`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newManagerId }),
      });

      if (!response.ok) {
        throw new Error("Error updating manager Id");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating manager Id:", error);
    }
  };

  const updateManagerInStore = (employeeId: string, newManagerId: string) => {
    const employeeListCopy = [...employeeList.map((emp: EmployeeData) => ({ ...emp }))];
    const employee = employeeListCopy.find((emp) => emp.id === employeeId);

    const filteredEmployeeListCopy = [
      ...filteredEmployeeList.map((emp: EmployeeData) => ({ ...emp })),
    ];
    const filteredEmployee = filteredEmployeeListCopy.find(
      (emp) => emp.id === employeeId
    );

    const newManager = employeeList.find((emp) => emp.id === newManagerId);
    if (newManager) {
      employee.manager = newManagerId;
      employee.team = newManager.team;
      filteredEmployee.manager = newManagerId;
      filteredEmployee.team = newManager.team;
    }
    dispatch(setEmployeeList(employeeListCopy));
    dispatch(setFilteredEmployeeList(filteredEmployeeListCopy));
  };
  return { updateManager, updateManagerInStore };
}
