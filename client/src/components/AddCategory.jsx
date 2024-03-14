import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState()
  const handleSubmit = e => {
    e.preventDefault()
    axios.post("http://localhost:3002/auth/admin/add_category",{category})
    .then((result) => {
      if(result.data.success){
        navigate("/admin/dashboard/category")
      }
    })
    .catch((error) => {
      alert(error.data.message)
    })
  }
  return (
    <div className='flex justify-center items-center h-3/4'>
      <div className='p-3 rounded w-1/4 border'>
        <h2 className='text-center'>Add Category</h2>
        <form onSubmit={handleSubmit} className='mt-3'>
          <div className='mb-3'>
            <label htmlFor='category' className='block'>
              <strong>Category:</strong>
            </label>
            <input
              type='text'
              name='category'
              placeholder='Enter Category'
              onChange={e => setCategory(e.target.value)}
              className='w-full border rounded px-3 py-2 focus:outline-none focus:border-blue-400'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddCategory
