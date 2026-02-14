import { Link, useLocation, useNavigate } from "react-router-dom"
import { Auth } from "../utils/constant"
import {useDispatch} from 'react-redux'
import {removeUser} from '../utils/userSlice'
import {ToastContainer,toast} from 'react-toastify'

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const Dispatch = useDispatch()


  const handleLogout = async () => {
     toast.success('Logged Out SuccessFully')
    await Auth.signOut()
    Dispatch(removeUser())
    navigate("/")
    
  }



  return (
    <>
    <ToastContainer/>
    <header className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
      
        <h1 className="text-2xl font-bold text-blue-600 tracking-wide">
          Employee System
        </h1>

        <nav className="flex items-center space-x-4">
          <Link to="/employee" >
            Add Employee
          </Link>

          <Link to="/employeelist" >
            List Employees
          </Link>

          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
    </>
  )
}

export default Header
