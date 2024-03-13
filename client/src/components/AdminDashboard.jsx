import {  Outlet,Link } from "react-router-dom"
import { FaPowerOff, FaTachometerAlt, FaUser, FaUsers } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";

function AdminDashboard() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
    {/* Sidebar */}
    <div className="bg-gray-900 text-white flex-shrink-0 w-56 md:w-64">
        <div className="p-4">
            <Link to="/admin/dashboard" className="flex items-center pb-3 mb-3 mt-3 md:mb-1 md:mt-0 text-white text-xl font-bold">
                <span className="hidden md:inline">Admin Dashboard</span>
            </Link>
            <ul className="flex flex-col gap-2">
                <li>
                    <Link to="/admin/dashboard" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700">
                        <FaTachometerAlt className="text-3xl mr-2" />
                        <span className="hidden md:inline">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/dashboard/employee" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700">
                        <FaUsers className="text-3xl mr-2" />
                        <span className="hidden md:inline">Manage Employees</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/dashboard/category" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700">
                        <BiCategory className="text-3xl mr-2" />
                        <span className="hidden md:inline">Category</span>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/dashboard/profile" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700">
                        <FaUser className="text-3xl mr-2" />
                        <span className="hidden md:inline">Profile</span>
                    </Link>
                </li>
                <li>
                    <Link to="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 cursor-pointer">
                        <FaPowerOff className="text-3xl mr-2" />
                        <span className="hidden md:inline">Logout</span>
                    </Link>
                </li>
            </ul>
        </div>
    </div>
    {/* Content Area */}
    <div className="flex-grow p-4">
        <div className="p-4 bg-white shadow-2xl">
            <h4 className="text-2xl font-semibold flex justify-center items-center">Employee Management System</h4>
        </div>
        <Outlet />
    </div>
</div>


  )
}

export default AdminDashboard