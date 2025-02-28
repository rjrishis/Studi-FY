import React from 'react'
import * as Icons from "react-icons/vsc"
import { NavLink } from 'react-router-dom'
const SidebarLink = ({link , iconName , name}) => {
    const Icon = Icons[iconName]
  return (
    <NavLink to={link} className={({ isActive }) =>
        isActive
          ? 'text-yellow-50 font-bold' 
          : 'text- hover:text-blue-500'
      }>
        <div className='flex gap-3 items-center  mb-5 w-full '>
        <Icon/>
        <h1 className='text-md'>{name}</h1>
        </div>
    </NavLink>
  )
}

export default SidebarLink