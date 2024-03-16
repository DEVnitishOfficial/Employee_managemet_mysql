import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddEmployee = () => {
  const navigate = useNavigate()
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    password: '',
    salary: '',
    address: '',
    category_id: '',
    image: null
  })
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

  const handleChange = (e, field) => {
    setEmployee({ ...employee, [field]: e.target.value })
  }

  const handleFileChange = e => {
    setEmployee({ ...employee, image: e.target.files[0] })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', employee.name)
    formData.append('email', employee.email)
    formData.append('password', employee.password)
    formData.append('address', employee.address)
    formData.append('salary', employee.salary)
    formData.append('image', employee.image)
    formData.append('category_id', employee.category_id)

    axios
      .post('http://localhost:3002/auth/admin/add_employee', formData)
      .then(result => {
        console.log('formData>REsult>>>',result)
        if (result.data.success) {
          navigate('/admin/dashboard/employee')
        } else {
          alert(result.data.message)
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='flex justify-center items-center mt-3 '>
      <div className='p-3 rounded md:min-w-[760px] min-w-96 border shadow-xl bg-indigo-100 '>
        <h3 className='text-center text-3xl font-bold text-yellow-500 animate'>
          Add Employee
        </h3>

        <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4'>
          <div>
            <label htmlFor='inputName' className='block text-xl font-semibold'>
              Name :
            </label>
            <input
              type='text'
              id='inputName'
              placeholder='Enter Name'
              className='rounded px-4 py-2 w-full text-lg '
              value={employee.name}
              onChange={e => handleChange(e, 'name')}
            />
          </div>
          <div>
            <label htmlFor='inputEmail' className='block text-xl font-semibold'>
              Email
            </label>
            <input
              type='email'
              id='inputEmail'
              placeholder='Enter Email'
              className='rounded px-4 py-2 w-full text-lg'
              value={employee.email}
              onChange={e => handleChange(e, 'email')}
            />
          </div>
          <div>
            <label htmlFor='inputPassword' className='block text-xl font-semibold'>
              Password
            </label>
            <input
              type='password'
              id='inputPassword'
              placeholder='Enter Password'
              className='rounded px-4 py-2 w-full text-lg'
              value={employee.password}
              onChange={e => handleChange(e, 'password')}
            />
          </div>
          <div>
            <label htmlFor='inputSalary' className='block text-xl font-semibold'>
              Salary
            </label>
            <input
              type='text'
              id='inputSalary'
              placeholder='Enter Salary'
              className='rounded px-4 py-2 w-full text-lg'
              value={employee.salary}
              onChange={e => handleChange(e, 'salary')}
            />
          </div>
          <div>
            <label htmlFor='inputAddress' className='block text-xl font-semibold'>
              Address
            </label>
            <input
              type='text'
              id='inputAddress'
              placeholder='1234 Main St'
              className='rounded px-4 py-2 w-full text-lg'
              value={employee.address}
              onChange={e => handleChange(e, 'address')}
            />
          </div>
          <div>
            <label htmlFor='category' className='block text-xl font-semibold'>
              Category
            </label>
            <select
              id='category'
              className='rounded px-4 py-2 w-full text-lg'
              onChange={e => handleChange(e, 'category_id')}
              value={employee.category_id}
            >
                 {category.map((currentVal) => {
                return <option key={currentVal.id} value={currentVal.id}>{currentVal.name}</option>;
              })}
            </select>
          </div>
          <div>
            <label htmlFor='inputImage' className='block text-xl font-semibold'>
              Select Image
            </label>
            <input
              type='file'
              id='inputImage'
              name='image'
              className='rounded px-4 py-2 w-full text-lg'
              onChange={handleFileChange}
            />
          </div>
          <div>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEmployee
