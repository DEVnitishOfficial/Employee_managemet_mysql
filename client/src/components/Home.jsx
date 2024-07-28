import axios from 'axios'
import { useEffect, useState } from 'react'

function Home() {

  const [adminTotal, setAdminTotal] = useState(0)
  const [employeeTotal, setemployeeTotal] = useState(0)
  const [salaryTotal, setSalaryTotal] = useState(0)
  const [admins, setAdmins] = useState([])

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
  }, [])

  const AdminRecords = () => {
    axios.get('http://localhost:3002/auth/admin_details')
    .then(result => {
      if(result.data.success) {
        setAdmins(result.data.data)
      } else {
         alert(result.data.Error)
      }
    })
  }
  const adminCount = () => {
    axios.get('http://localhost:3002/auth/admin_count')
    .then(result => {
      console.log('resultt>>nkn.yess',result)
      if(result.data.success) {
        setAdminTotal(result.data.data[0].admin)
      }
    })
  }
  const employeeCount = () => {
    axios.get('http://localhost:3002/auth/employee_count')
    .then(result => {
      if(result.data.success) {
        setemployeeTotal(result.data.data[0].employee)
      }
    })
  }
  const salaryCount = () => {
    axios.get('http://localhost:3002/auth/salary_count')
    .then(result => {
      if(result.data.success) {
        setSalaryTotal(result.data.data[0].salaryOFEmp)
      } else {
        alert(result.data.Error)
      }
    })
  }
  return (
    <div>
  <div className="p-3 flex justify-around mt-3">
    <div className="px-3 pt-2 pb-3 border-4 border-yellow-500 w-1/4">
      <div className="text-center pb-1 bg-yellow-400">
        <h4>Admin</h4>
      </div>
      <hr />
      <div className="flex justify-between">
        <h5>Total:</h5>
        <h5>{adminTotal}</h5>
      </div>
    </div>
    <div className="px-3 pt-2 pb-3 border-4 border-blue-400 w-1/4">
      <div className="text-center bg-blue-400 pb-1">
        <h4>Employee</h4>
      </div>
      <hr />
      <div className="flex justify-between">
        <h5>Total:</h5>
        <h5>{employeeTotal}</h5>
      </div>
    </div>
    <div className="px-3 pt-2 pb-3 border-4 border-green-500 w-1/4">
      <div className="text-center bg-green-400 pb-1">
        <h4>Salary</h4>
      </div>
      <hr />
      <div className="flex justify-between">
        <h5>Total:</h5>
        <h5>${salaryTotal}</h5>
      </div>
    </div>
  </div>
  <div className="mt-4 px-5 pt-3">
    <h3>List of Admins</h3>
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {admins.map((a, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">{a.email}</td>
            <td className="border px-4 py-2">
              <button className="btn btn-info btn-sm me-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                Edit
              </button>
              <button className="btn btn-warning btn-sm bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  )
}

export default Home