import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='md:w-[20rem]  h-[5rem] md:h-full flex justify-center items-center bg-blue'>
       <ul className='flex flex-col justify-around items-center space-y-2  md:space-y-4 text-[.8rem] md:text-[1.6rem] font-semibold ' >
        <li>
          <NavLink to={"/produk"}>
            <p className='bg-biru text-white px-5 rounded-md'>Produk</p>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/fetch"}>
            <p className='bg-biru text-white px-8 rounded-md'>Fetch PokeAPI</p>
          </NavLink>
        </li>
        <li></li>
        <li></li>
       </ul>
    </div>
  )
}

export default Sidebar