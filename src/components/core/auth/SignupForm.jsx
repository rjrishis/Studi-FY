import React, { useState } from 'react'
import TextTemplate from './TextTemplate'
import { LuEye } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import SignupImage from "../../../assets/Images/signup.webp"
import frame from "../../../assets/Images/frame.png"
import Tab from '../../common/Tab'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { LuEyeOff } from "react-icons/lu";
// import { LuEye } from "react-icons/lu";
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setSignupData } from '../../store/reducers/authReducer'
import { sendOtp } from '../../../services/operations/authAPI'
import { Navigate } from 'react-router-dom'

const SignupForm = () => {
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const data = useSelector(state => state.auth)
    console.log(data)
    const [formData, setFormData] = useState(
        {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    )
    const { firstName, lastName, email, password, confirmPassword } = formData
    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id: 2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR,
        },
    ]
    const accountTabColor = () => {
        if (accountType === "student") {
            return
        }
    }


    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }
        ))
        // console.log(formData)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log("passwords are", password , confirmPassword)
        if (password !== confirmPassword) {
            console.log("bohot gandi baat mere bhai ")
            toast.error("Passwords Do Not Match")
            return
        }

        const signupData = {
            ...formData,
            accountType,
        }
        dispatch(setSignupData(signupData))
        dispatch(sendOtp(formData.email, navigate))

        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
        setAccountType(ACCOUNT_TYPE.STUDENT)


    }
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-[70%] h-full flex gap-32'>
                <div className='w-1/2 bg-pink-20 flex items-center'>
                    <div className='w-full'>
                        <TextTemplate title={"Join the millions learning to code with Studify for free"} desc1={"Build skills for today, tomorrow, and beyond."} desc2={"Education to future-proof your carrer."} />
                        <Tab tabData={tabData} field={accountType} setField={setAccountType} />
                        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-y-4">
                            <div className="flex gap-x-4">
                                <label>
                                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                        First Name <sup className="text-pink-200">*</sup>
                                    </p>
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="text"
                                        name="firstName"

                                        placeholder="Enter first name"
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                    />
                                </label>
                                <label>
                                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                        Last Name <sup className="text-pink-200">*</sup>
                                    </p>
                                    <input
                                        required
                                        type="text"
                                        name="lastName"
                                        onChange={handleChange}

                                        placeholder="Enter last name"
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                    />
                                </label>
                            </div>
                            <label className="w-full">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                    Email Address <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                    required
                                    type="text"
                                    name="email"
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                />
                            </label>
                            <div className="flex gap-x-4">
                                <label className="relative">
                                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                        Create Password <sup className="text-pink-200">*</sup>
                                    </p>
                                    <input
                                        required
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        onChange={handleChange}
                                        placeholder="Enter Password"
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                                    />
                                    <span
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                    >
                                        {showPassword ? (
                                            <LuEye fontSize={24} className='text-richblack-500' />
                                        ) : (
                                            <LuEyeOff fontSize={24} className='text-richblack-500' />
                                        )}
                                    </span>
                                </label>
                                <label className="relative">
                                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                        Confirm Password <sup className="text-pink-200">*</sup>
                                    </p>
                                    <input
                                        required
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        onChange={handleChange}
                                        placeholder="Confirm Password"
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
                                    />
                                    <span
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                    >
                                        {showConfirmPassword ? (
                                            <LuEye fontSize={24} className='text-richblack-500' />
                                        ) : (
                                            <LuEyeOff fontSize={24} className='text-richblack-500' />
                                        )}
                                    </span>
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                            >
                                Create Account
                            </button>
                        </form>
                    </div>
                </div>
                <div className='w-1/2 relative flex justify-center items-center'>
                    <img src={frame} alt="" className='absolute left-5 translate-y-[20px]' />
                    <img src={SignupImage} alt="" className='absolute' />

                </div>
            </div>
        </div>
    )
}

export default SignupForm