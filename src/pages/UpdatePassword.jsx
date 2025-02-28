import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/common/Loader'
import { LuEye } from 'react-icons/lu'
import { LuEyeOff } from 'react-icons/lu'
import { Link, useLocation } from 'react-router-dom'
import { GoArrowLeft } from 'react-icons/go'
import { resetPassword } from '../services/operations/authAPI'
import toast from 'react-hot-toast'
const UpdatePassword = () => {
  const location = useLocation()
  const { loading } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    console.log(formData)
  }
  const { password, confirmPassword } = formData
  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      console.log("bohot gandi baat mere bhai ")
      toast.error("Passwords Does Not Match")
      return
    }
    const token = location.pathname.split("/").at(-1)
    dispatch(resetPassword(formData.password, formData.confirmPassword, token))


  }
  return (
    <div className='w-screen flex items-center justify-center h-screen'>
      {loading ? <Loader /> :
        <div className='flex flex-col gap-5 w-[30%] mt-[-100px]'>
          <h1 className='text-white text-3xl font-semibold'>Choose New Password</h1>
          <p className='text-richblack-200 text-xl'>
            Almost done. Enter your new password and you are all set
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="" className='text-white relative'>
              New Password<sup className='text-pink-200'>*</sup>
              <input
                onChange={handleChange}
                required
                type={showPassword ? "text" : "password"}
                name="password"
                // value={email}
                placeholder="Enter new password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="mt-2 mb-2 w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
              <span onClick={() => { setShowPassword(prev => !prev) }} className='absolute top-[65%] right-[4%] text-richblack-500 cursor-pointer text-2xl'>{showPassword ? <LuEye /> : <LuEyeOff />}</span>
            </label>
            <label htmlFor="" className='text-white relative'>
              Confirm New Password<sup className='text-pink-200'>*</sup>
              <input
                onChange={handleChange}
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                // value={email}
                placeholder="Confirm your password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="mt-2 w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
              <span onClick={() => { setShowConfirmPassword(prev => !prev) }} className='absolute top-[65%] right-[4%] text-richblack-500 cursor-pointer text-2xl'>{showConfirmPassword ? <LuEye /> : <LuEyeOff />}</span>
            </label>
            <button
            type="submit"
            className="w-full mt-6 mb-3 rounded-[8px] bg-yellow-50 py-[10px] px-[12px] font-semibold text-richblack-900"
          >
            Reset Password
          </button>

          <Link to={"/login"} className='flex gap-3 text-white items-center text-md'>
            <GoArrowLeft />
            <h1>Back To Login</h1>
          </Link>
          </form>
          
        </div>
      }
    </div>
  )
}

export default UpdatePassword