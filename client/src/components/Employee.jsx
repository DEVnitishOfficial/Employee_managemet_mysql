import { Link } from "react-router-dom"

function Employee() {
  return (
    <div className='px-5 mt-10'>
    <div className='flex justify-center items-center'>
      <h1 className='font-semibold text-2xl'>Employee List</h1>
    </div>
    <Link
      to='/admin/dashboard/add_employee'
      className='inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out'
    >
      Add employee
    </Link>

    </div>
  )
}

export default Employee