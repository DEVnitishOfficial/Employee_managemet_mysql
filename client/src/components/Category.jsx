import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Category () {
  const [category, setCategory] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3002/auth/category')
      .then((result) => {
        console.log('result>>>>>>>>',result)
        if (result.data.success) {
          setCategory(result.data.data)
        } else {
          alert(result.data.message)
        }
      })
      .catch((error) => {
        alert(error.message)
      })
  }, [])

  return (
    <div className='px-5 mt-10'>
      <div className='flex justify-center items-center'>
        <h1 className='font-semibold text-2xl'>Category List</h1>
      </div>
      <Link
        to='/admin/dashboard/add_category'
        className='inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out'
      >
        Add category
      </Link>

<div className='overflow-hidden scroll-auto'> 
      <div className="overflow-y-auto flex justify-center items-center">
      <table className="table-auto border-collapse border border-gray-800">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-800 px-4 py-2">ID</th>
            <th className="border border-gray-800 px-4 py-2">Name</th>
          </tr>
        </thead>
        <tbody>
          {category.map(currentVal => (
            <tr key={currentVal.id} className="bg-gray-100">
              <td className="border border-gray-800 px-4 py-2">{currentVal.id}</td>
              <td className="border border-gray-800 px-4 py-2">{currentVal.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  )
}

export default Category
