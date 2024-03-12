import { useState } from 'react'
import './style.css'
import axios from 'axios'
function Login () {
  const [value, setValue] = useState({
    email : '',
    password : '',
  })

  function handleSubmit(event){
    event.preventDefault()
    axios.post('http://localhost:3002/auth/admin/adminlogin',value)
    .then(result => console.log(result))
    .catch(error => console.log(error))
  }
  return (
    <div className='loginPage flex justify-center items-center min-h-[100vh]'>
      <div className=''>
        <form onSubmit={handleSubmit}   action='email' className='loginForm'>
          <div className='max-w-md mx-auto p-6 border rounded-md'>
            <h1 className='text-3xl font-bold text-center text-white mb-6'>
              Login page
            </h1>

            <div className='mb-4'>
              <label htmlFor='Email'>
                <strong>Email : </strong>
              </label>
              <input
              onChange={(e) => setValue({...value,email:e.target.value})}
                type='email'
                name='email'
                autoComplete='off'
                placeholder='Enter email'
                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='Password'>
                <strong>Password : </strong>
              </label>
              <input
              onChange={(e) => setValue({...value,password:e.target.value})}
                type='Password'
                name='Password'
                autoComplete='off'
                placeholder='Enter Password'
                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>

            <div className='flex justify-center mb-3'>
              <button className='bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded'>
                submit
              </button>
            </div>

            <div className='mb-2'>
              <input type='checkbox' name='tick' id='tick' />
              <label htmlFor='checkbox'>
                you agree with all terms & conditions
                <span className='text-red-500 text-xl'>*</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
