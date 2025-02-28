import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
import { useDispatch } from 'react-redux';
import { getPasswordResetToken } from '../services/operations/authAPI';
import Loader from '../components/common/Loader';
const ForgotPassword = () => {
    const {laoding} = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("")
    const { loading } = useSelector(state => state.auth)
    const handleChange = (e) => {
        setEmail(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getPasswordResetToken(email , setEmailSent , loading))
    }
    return (
        <div className='w-screen flex items-center justify-center h-screen'>
            {
                loading ? <Loader/> : <div className='flex flex-col gap-5 w-[30%] mt-[-100px]'>
                    <h1 className='text-white text-3xl font-semibold'>
                        {!emailSent ? "Reset Your Password" : "Check email"}
                    </h1>
                    <p className='text-richblack-200 text-xl'>
                        {!emailSent ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                            : `We have sent the reset email to you at your email address ${email}`}
                    </p>
                    <form onSubmit={handleSubmit} >
                    {
                        !emailSent &&
                        <label htmlFor="" className='text-white'>
                            Email address<sup className='text-pink-200'>*</sup>
                            <input
                                onChange={handleChange}
                                required
                                type="text"
                                name="email"
                                value={email}
                                placeholder="Enter email address"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="mt-2 w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                            />
                        </label>
                    }
                    <button
                        type="submit"
                        className="w-full mt-6 mb-3 rounded-[8px] bg-yellow-50 py-[10px] px-[12px] font-semibold text-richblack-900"
                    >
                        {!emailSent ? "Submit" : "Resend email"}
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

export default ForgotPassword