import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

function Employee() {

  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/auth/employee_details")
      .then((result) => {
        if (result.data.success) {
          setEmployee(result.data.data);
        } else {
          alert(result.data.message);
        }
      })
      .catch((err) => console.log(err));
  }, []);

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

    <div className="mt-3 flex justify-center items-center">
  <table className="table-auto">
    <thead>
      <tr>
        <th className="px-4 py-2">Name</th>
        <th className="px-4 py-2">Image</th>
        <th className="px-4 py-2">Email</th>
        <th className="px-4 py-2">Address</th>
        <th className="px-4 py-2">Salary</th>
        <th className="px-4 py-2">Action</th>
      </tr>
    </thead>
    <tbody>
      {employee.map((e) => (
      <tr key={e.id}>
        <td className="border px-4 py-2">{e.name}</td>
        <td className="border px-4 py-2">
          <img src={`http://localhost:3002/Images/` + e.image} className="employee_image" />
        </td>
        <td className="border px-4 py-2">{e.email}</td>
        <td className="border px-4 py-2">{e.address}</td>
        <td className="border px-4 py-2">{e.salary}</td>
        <td className="border px-4 py-2">
        <Link
        className=" me-2 inline-block px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Edit
      </Link>
      <button
        className="inline-block px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
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

export default Employee