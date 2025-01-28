import React from 'react'
import ROLE from '../common/role'
import { IoCloseSharp } from "react-icons/io5";

const ChangeUserRole = () => {

  const [userRole,setUserRole] = useState()



  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center'>
      <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>

        <button className='block ml-auto'><IoCloseSharp /></button>

        <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
        <p>Name : </p>
        <p>Email : </p>
        <div className='flex items-center justify-between'>
          <p>Role : </p>
          <select className='border px-4 py-1 my-4' value={userRole} onChange={setUserRole}>
            {
              Object.values(ROLE).map(el => {
                return (
                  <option value={el} key={el}>{el}</option>
                )
              })
            }
          </select>
        </div>

        <button className='w-fit mx-auto block shadow-md rounded-full py-1 px-3 bg-red-500 hover:bg-red-600 text-white'>Change Role</button>

      </div>
    </div>
  )
}

export default ChangeUserRole