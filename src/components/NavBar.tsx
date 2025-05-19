import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import Filter from "@/components/Filter";
import EmployeeList from "@/components/EmployeeList";
import { useSelector, useDispatch } from "react-redux";
import { setFilteredEmployeeList } from "@/store/employeeSlice";
import type { EmployeeData } from "@/utils/types";

const NavBar = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  const dispatch = useDispatch();

  const employeeList = useSelector((store: any) => store.employeeData?.employeeList || []);
  const filteredEmployeeList: EmployeeData[] = useSelector((store: any) => store.employeeData?.filteredEmployeeList || []);
  const debouncedSearch = useDebounce(searchText, 500);
  
  useEffect(() => {
    const filteredEmployeeList = selectedTeam
      ? employeeList.filter((employee: EmployeeData) => employee.team === selectedTeam)
      : employeeList;
    dispatch(setFilteredEmployeeList(filteredEmployeeList));
  }, [selectedTeam]);

  if (!employeeList) {
    return <div>Loading...</div>;
  }

  function handleTeamChange(team: string) {
    setSearchText("");
    setSelectedTeam(team);
  }

  const FilterList: string[] = employeeList
    .map((employee: EmployeeData) => employee.team)
    .filter((team: string | null) => !!team);
  const uniqueTeams = Array.from(new Set(FilterList));

  const EmployeesfilteredBySearch = filteredEmployeeList.filter((emp) =>
    [emp.name, emp.id, emp.designation].some((field) =>
      field.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
  );

  return (
    <div className="navbar flex flex-col bg-[var(--color-bg-navbar)] h-full border-r-2 border-[var(--color-black)] shadow-md ">
      <div className="shrink-0 p-8 border-b-2 border-[var(--color-black)]">
        <div className="search-bar h-12">
          <input
            type="text"
            placeholder="Search by name, id or designation"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full px-4 py-2 mb-4 h-10 text-sm rounded border border-[var(--color-border-filter)] bg-[var(--color-bg-sidebar)] text-[var(--color-text-filter)] placeholder-[var(--color-emp-text)] focus:outline-none focus:border-[var(--color-input-border)]"
          />
        </div>
        <Filter teams={uniqueTeams} onTeamChange={handleTeamChange} />
      </div>
      <EmployeeList employeeList={EmployeesfilteredBySearch} />
    </div>
  );
};

export default NavBar;
