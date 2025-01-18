import React from 'react'
import { FaSearch } from "react-icons/fa"

const Header = () => {
  return (
    <header className='h-16 shadow-md'>
        <div className='h-full container mx-auto flex items-center px-4 justify-between'>
            <div className=''>
                {/*Logo*/}
            </div>


            <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
                <input type='text' placeholder='search product here...' className='w-full outline-none'/>
                <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
                  <FaSearch />
                </div>
            </div>

            <div>
                user icons and card
            </div>
        </div>
    </header>
  )
}

export default Header