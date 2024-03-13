import './App.css'
import AdminDashboard from './components/AdminDashboard'
import Login from './components/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/adminlogin' element={<Login />}> </Route>
      <Route path='/admin/dashboard' element={<AdminDashboard />}> </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
