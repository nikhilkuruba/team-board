import SearchBar from './SearchBar'
import Filter from './Filter'
import EmployeeList from './EmployeeList';

const NavBar = () => {
  return (
    <div>
      <SearchBar />
      <Filter />
      <EmployeeList />
    </div>
  )
}

export default NavBar