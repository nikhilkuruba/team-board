
import type { EmployeeData } from '@/utils/types';


const EmployeeList: React.FC<{ employeeList: EmployeeData[] }> = (props) => {
  return (
    <div className='flex-1 overflow-y-auto p-4 nav-list'>
      <ul className='w-full h-full'>
        {props.employeeList.map((employee) => (
          <li key={employee.id} className='w-full px-4 py-2 border-b border-gray-300'>
            <h2 className='text-[var(--color-text-filter)]'>{employee.name}</h2>
            <p className='text-sm text-[var(--color-filter-designation)]'>{employee.designation}</p>
            <p className='text-sm text-[var(--color-emp-text)]'>{employee.team}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EmployeeList