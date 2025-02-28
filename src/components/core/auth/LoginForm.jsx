import React, { useState } from 'react'
import { LuEye } from "react-icons/lu";
import { Link } from 'react-router-dom';
import loginImage from "../../../assets/Images/login.webp"
import frame from "../../../assets/Images/frame.png"
import TextTemplate from './TextTemplate';
import { LuEyeOff } from "react-icons/lu";
import { useDispatch } from'react-redux'
import { useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authAPI';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        setLoginData(prev => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        )
        )
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(loginData.email , loginData.password , navigate))
    }
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-[70%] h-full flex gap-32'>
                <div className='w-1/2 bg-pink-20 flex items-center'>
                    <div className='w-full'>
                        <TextTemplate title={"Welcome Back"} desc1={"Build skills for today, tomorrow, and beyond."} desc2={"Education to future-proof your carrer."} />
                        <form onSubmit={handleSubmit} className='mt-6' action="">
                            <label className='text-white' htmlFor="">Email Address<sup className='text-pink-200'>*</sup></label>
                            <br></br>
                            <input onChange={handleChange} type="text" name='email' required placeholder="Enter email address" className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 mt-2" />
                            <br />
                            <br />
                            <div className='relative'>
                                <label className='text-white' htmlFor="">Password<sup className='text-pink-200'>*</sup><span onClick={() => { setShowPassword((prev) => !prev) }} className='text-richblack-500 cursor-pointer absolute top-[45%] left-[90%] text-2xl'>{showPassword ? <LuEye /> : <LuEyeOff />}</span></label>
                                <br></br>
                                <input onChange={handleChange} type={showPassword ? "text" : "password"} name='password' required placeholder="Enter Password" className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 mt-2" />
                                <Link to={"/forgot-password"} className='text-sm text-blue-100 text-right cursor-pointer'>Forgot Password?</Link>
                            </div>
                            <button
                                type="submit"
                                className="w-full mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                            >
                                Sign In
                            </button>

                        </form>

                    </div>
                </div>
                <div className='w-1/2 relative flex justify-center items-center'>
                    <img src={frame} alt="" className='absolute left-5 translate-y-[20px]' />
                    <img src={loginImage} alt="" className='absolute' />

                </div>
            </div>
        </div>
    )
}

export default LoginForm