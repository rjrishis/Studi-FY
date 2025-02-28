import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/common/Loader'
import OTPInput from 'react-otp-input'
import { Link, useNavigate } from 'react-router-dom'
import { GoArrowLeft } from 'react-icons/go'
import { FaClockRotateLeft } from "react-icons/fa6";
import { signup } from '../services/operations/authAPI'
function VerfiyEmail() {
    const { signupData, loading } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [otp, setOtp] = React.useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;
        dispatch(signup(
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate
        ))
        useEffect(() => {
            if (!signupData) {
                navigate("/signup");
              }
        }, [])
        

    }
    return (
        <div className='w-screen flex items-center justify-center h-screen'>
            {
                loading ? <Loader /> :
                    <div className='flex flex-col gap-5 w-[30%] mt-[-100px]'>
                        <h1 className='text-white text-3xl font-semibold'>Verify Email</h1>
                        <p className='text-richblack-200 text-xl'>
                            A verification code has been sent to you. Enter the ccode below
                        </p>
                        <form onSubmit={handleSubmit}>
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span>----</span>}
                                renderInput={(props) => <input {...props} style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)"
                                }} placeholder='-' className=" mb-2 w-full rounded-[0.5rem] bg-richblack-800 px-[25px] py-[15px] text-richblack-5" />}
                            />
                            <button
                                type="submit"
                                className="w-full  rounded-[8px] bg-yellow-50 py-[15px] px-[12px] font-semibold text-richblack-900"
                            >
                                Verify Email
                            </button>
                        </form>
                        <div className='w-full flex justify-between'>
                            <Link to={"/login"} className='flex gap-3 text-white items-center text-md'>
                                <GoArrowLeft />
                                <h1>Back To Login</h1>
                            </Link>
                            <div className='flex gap-2 text-richblue-200  items-center'>
                                <FaClockRotateLeft />
                                <button onClick={() => console.log("Hello")} className='text-md
                                '>Resend it</button>
                            </div>

                        </div>
                    </div>
            }
        </div>
    )
}

export default VerfiyEmail