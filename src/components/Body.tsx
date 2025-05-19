import Header from '@/components/Header'
import MainLayout from '@/components/MainLayout'
import NavBar from '@/components/NavBar'
import { setEmployeeList, setFilteredEmployeeList } from '@/store/employeeSlice'
import { useDispatch } from "react-redux"
import { useEffect, useState } from 'react'

const ERROR_MESSAGE = 'Error while fetching employee data'

const Body: React.FC = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true)
        setErrorMsg('')
        const response = await fetch('/api/employees');
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        dispatch(setEmployeeList(data.employees));
        dispatch(setFilteredEmployeeList(data.employees));
        if (data.employees.length === 0) {
          setErrorMsg('No employees found');
        }
      } catch (error) {
        console.error('Error while fetching employee data:', error);
        setErrorMsg(ERROR_MESSAGE);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmployees()
  }, [])

  return (
    <div className='bg-gray-100 app-grid'>
      <Header />
      {!isLoading && !errorMsg ?
        <>
          <NavBar />
          <MainLayout />
        </> 
        : 
        (errorMsg ?
        <div className="flex justify-center items-center bg-gray-500 error-message">
          <h1 className="text-red-700 text-2xl">{errorMsg}</h1>
        </div> 
        :
        <div role="loading-spinner" className="flex justify-center items-center bg-gray-500 loading-spinner">
          <div className="animate-spin rounded-full h-18 w-18 border-b-2 border-gray-900"></div>
        </div>)
      }
    </div>
  )
}

export default Body