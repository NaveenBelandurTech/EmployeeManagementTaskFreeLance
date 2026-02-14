import { useRef, useState } from "react";
import {collection,addDoc} from 'firebase/firestore'
import {Db} from '../utils/constant'
import {ToastContainer,toast} from 'react-toastify'
import {Link,Navigate} from 'react-router-dom'
import Header from "../Common/Header";


const AddEmployee = () => {
  const Employee = useRef();
  const Task = useRef();
  const [error, setError] = useState("");



  const validateEmployee = (employee, task) => {
    if (employee.trim("") == "") {
      return "Employee Cannot Be Empty";
    } else if (task.trim("") == "") {
      return "Task Cannot Be Empty";
    }
    return null;
  };

  const handleClick = async (e) => {
      e.preventDefault();
    try{
       const isValid = validateEmployee(
      Employee.current.value,
      Task.current.value,
    );
    setError(isValid);

    const docRef = await addDoc(collection(Db,"employees"),{
      name:Employee.current.value,
      task:Task.current.value,
    })
    console.log(docRef,'doc Ref')
    toast.success('Employee Added successFully')
    if(docRef){
      Employee.current.value = ''
      Task.current.value = ''
    }

    }
    catch(err){
      console.log(err)
    }
    
  

  };



  return (
    <>
    <Header/>
    <ToastContainer/>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Add New Employee</h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter employee details below
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employee Name
            </label>
            <input
              ref={Employee}
              type="text"
              placeholder="Enter employee name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">
              Add Task
            </label>

            <textarea
              ref={Task}
              rows="4"
              placeholder="Enter task details..."
              className="w-full rounded-2xl bg-gray-50 border border-gray-200 
               px-5 py-4 text-gray-700 placeholder-gray-400 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               focus:bg-white focus:border-blue-500
               transition-all duration-200 resize-none"
            ></textarea>
            {error && <span className="text-md text-red-500">{error}</span>}
          </div>

          <div>
            <button
              onClick={handleClick}
              type="button"
              className="w-full cursor-pointer  bg-blue-600 text-white py-2.5 px-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddEmployee;
