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

  const filteredEmployeeList: EmployeeData[] = selectedTeam
    ? employeeList.filter((employee: EmployeeData) => employee.team === selectedTeam)
    : employeeList;

  const EmployeesfilteredBySearch = filteredEmployeeList.filter((emp) =>
    [emp.name, emp.id, emp.designation].some((field) =>
      field.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
  );

  return (
    <div className="navbar flex flex-col bg-[#1F2937] h-full border-r-2 border-[#000] shadow-md ">
      <div className="shrink-0 p-8 border-b-2 border-[#000]">
        <div className="search-bar h-12">
          <input
            type="text"
            placeholder="Search by name, id or designation"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full px-4 py-2 mb-4 h-10 text-sm rounded border border-[#6B7280] bg-[#374151] text-[#F9FAFB] placeholder-[#9CA3AF] focus:outline-none focus:border-[#60A5FA]"
          />
        </div>
        <Filter teams={uniqueTeams} onTeamChange={handleTeamChange} />
      </div>
      <EmployeeList employeeList={EmployeesfilteredBySearch} />
    </div>
  );
};

export default NavBar;
