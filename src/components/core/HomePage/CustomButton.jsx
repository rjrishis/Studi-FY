import React from 'react'
import { Link } from 'react-router-dom'
const CustomButton = ({children , active ,linkto ,width="w-fit"}) => {
  return (
    <Link to={linkto}>
        <div className={`text-center text-[13px] ${width} px-6 py-3 rounded-md font-bold hover:scale-105  transition-all duration-200 ${(active)?"bg-yellow-50 text-black":"bg-richblack-800 text-white"}`} >
            {children}
        </div>
    </Link>
  )
}

export default CustomButton