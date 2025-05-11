import { useState, useEffect } from 'react'
import { useDebounce } from '@/hooks/useDebounce';
import Filter from '@/components/Filter'
import EmployeeList from '@/components/EmployeeList';

const NavBar = () => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, 500);
  const [ employeeList, setEmployeeList ] = useState([])
  const [selectedTeam, setSelectedTeam] = useState('')
  
  useEffect(() => {
    fetch('/api/employees')
    .then(response => response.json())
    .then(data => {
      setEmployeeList(data.employees)
    })
    
  }, [])

  function handleTeamChange(team: string) {
    setSearchText('')
    setSelectedTeam(team)
  }
  
  const FilterList = employeeList.map((employee) => employee.team)
  const uniqueTeams = Array.from(new Set(FilterList))
  
  const filteredEmployeeList = selectedTeam ? employeeList.filter((employee) => employee.team === selectedTeam) :employeeList

  const EmployeesfilteredBySearch = filteredEmployeeList.filter((emp) =>
      [emp.name, emp.id, emp.designation].some((field) =>
        field.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    );
  
  return (
    <div className='navbar flex flex-col h-full border-r-2 border-gray-200 shadow-md '>
      <div className="shrink-0 p-8">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name, id or designation"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className=" border border-[#222222] rounded px-4 py-2 overflow-hidden mb-4 max-w-full text-sm"
          />
        </div>
        <Filter teams={uniqueTeams} onTeamChange={handleTeamChange} />
      </div>
      <EmployeeList employeeList={EmployeesfilteredBySearch} />
    </div>
  )
}

export default NavBar