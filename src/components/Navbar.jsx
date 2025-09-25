import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex bg-violet-600 justify-between py-[20px] px-6 text-white font-semibold items-center'>
        <h2 className='font-bold lg:text-2xl text-3xl  cursor-pointer'>TaskManager</h2>
        <ul className="flex items-center gap-3">
            <li className='cursor-pointer  lg:text-xl text-2xl'>History</li>
            <li className='cursor-pointer  lg:text-xl text-2xl'>Contact Us</li>
            
        </ul>
    </nav>
  )
}

export default Navbar