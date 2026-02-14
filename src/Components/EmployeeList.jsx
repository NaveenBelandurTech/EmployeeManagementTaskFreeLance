import useEmployeeList from "../utils/useEmployeList";
import {doc,deleteDoc} from 'firebase/firestore'
import {Db} from '../utils/constant'
import {Link} from 'react-router-dom'
import Header from "../Common/Header";


const EmployeeList = () => {
  const [loading, users,setLoading] = useEmployeeList();

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  if(users.length == 0) 
    return <p className="text-center mt-10 text-gray-600">No Data Found <Link to='/Employee' className='text-blue-400'>Add Employee</Link> </p>;

  const handleDelete = async (id) =>{
   const DeletData = await deleteDoc(doc(Db,'employees',id))

   window.location.reload()


   
  }

  

  return (
    <>
   <Header/>
    <section className="p-6">
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                #
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Role
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users?.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {user.name ? user.name : "no data"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.task ? user.task : "no data"}
                </td>
                   <td className="px-6 py-4 text-sm text-gray-600">
                    <button onClick={()=>handleDelete(user.id)} className='bg-red-600 text-white border-2 border-red-500 px-2 py-1 rounded-2 cursor-pointer '>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    
      </div>
    </section>
    </>
  );
};

export default EmployeeList;
