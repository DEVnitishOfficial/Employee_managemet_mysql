import './App.css'
import AdminDashboard from './components/AdminDashboard'
import Employee from './components/Employee'
import Category from './components/Category'
import Home from './components/Home'
import Login from './components/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Profile from './components/Profile'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />}> </Route>
      <Route path='/admin/dashboard' element={<AdminDashboard />}> 
        <Route path='/admin/dashboard/Home' element={<Home />}></Route>
        <Route path='/admin/dashboard/employee' element={<Employee />}></Route>
        <Route path='/admin/dashboard/category' element={<Category />}></Route>
        <Route path='/admin/dashboard/profile' element={<Profile />}></Route>
        <Route path='' element={<Home />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
