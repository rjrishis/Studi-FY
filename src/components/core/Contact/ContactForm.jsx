import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import CountryCode from "../../../data/countrycode.json"
import { contactUs } from '../../../services/operations/authAPI'
import { useDispatch } from 'react-redux'

const ContactForm = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful }, } = useForm()
    const submitContactForm = (data)=>{
        console.log(data)
        dispatch(contactUs(data))
    }
    useEffect(() => {
        if (isSubmitSuccessful) {
          reset({
            email: "",
            firstname: "",
            lastname: "",
            message: "",
            phoneNumber: "",
          })
        }
      }, [reset, isSubmitSuccessful])
    return (
        <form onSubmit={handleSubmit(submitContactForm)}>
            <div className='flex gap-4 mx-auto'>
                <div>
                    <label className='text-richblack-5' htmlFor="firstname">First Name</label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        {...register("firstname", { required: true })}
                        placeholder="Enter first name"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full mt-2 rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                    />
                    {errors.firstname && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your name.
                        </span>
                    )}
                </div>
                <div>
                    <label className='text-richblack-5' htmlFor="lastname">Last Name</label>
                    <input
                        required
                        type="text"
                        name="lastname"
                        id='lastname'
                        placeholder="Enter last name"
                        {...register("lastname")}
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full mt-2 rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                    />
                </div>
            </div>
            <div className='my-6'>
                <label className='text-richblack-5' htmlFor="email">Email Address</label>
                <input
                    required
                    type="email"
                    name="email"
                    {...register("email", { required: true })}
                    placeholder="Enter email address"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full mt-2 rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                />
                {errors.email && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your Email address.
                    </span>
                )}
            </div>
            <div className='flex flex-col gap-3'>
                <label htmlFor="phonenumber" className='text-richblack-5'>Phone Number</label>
                <div className='flex gap-3 items-center mt-[-10px]'>
                    <select
                        name="countrycode"
                        id="countrycode"
                        {...register("countrycode", { required: true })}
                        type="text"
                        className='w-20 h-12 bg-richblack-700 text-white rounded-md p-3 mt-2'>
                        {CountryCode.map((e, i) => (
                            <option key={i} value={e.code}>
                                {e.code} -{e.country}
                            </option>
                        ))}
                    </select>
                    <input
                        required
                        type="number"
                        name="phonenumber"
                        {...register("phonenumber", {
                            required: {
                              value: true,
                              message: "Please enter your Phone Number.",
                            },
                            maxLength: { value: 12, message: "Invalid Phone Number" },
                            minLength: { value: 10, message: "Invalid Phone Number" },
                          })}
                        placeholder="Enter phone number"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full mt-2 rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                    />
                    {errors.phonenumber && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter a valid phone
                        </span>
                    )}
                </div>

            </div>
            <div className='mt-6' >
                <label htmlFor="message" className="text-richblack-5">
                    Message
                </label>
                <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="7"
                    placeholder="Enter your message here"
                    className="mt-3 w-full text-richblack-5 h-full rounded-md p-4 bg-richblack-700"
                    {...register("message", { required: true })}
                />
                {errors.message && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your Message.
                    </span>
                )}
            </div>
            <div>
                <button
                    type="submit"
                    className="mt-6 w-full rounded-[8px]  bg-yellow-50 py-[10px] px-[12px] font-bold text-richblack-900"
                >
                    Send Message
                </button>
            </div>
        </form>
    )
}

export default ContactForm