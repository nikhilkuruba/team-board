import Header from '@/components/Header'
import MainLayout from '@/components/MainLayout'
import NavBar from '@/components/NavBar'
import { setEmployeeList, setFilteredEmployeeList } from '@/store/employeeSlice'
import { useDispatch } from "react-redux"
import { useEffect } from 'react'


const Body = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    fetch('/api/employees')
      .then(response => response.json())
      .then(data => {
        dispatch(setEmployeeList(data.employees))
        dispatch(setFilteredEmployeeList(data.employees))
      })
      .catch(error => {
        console.error('Error while fetching employee data:', error);
      });
  }, [])

  return (
    <div className='bg-gray-100 app-grid'>
      <Header />
      <NavBar />
      <MainLayout />
    </div>
  )
}

export default Body