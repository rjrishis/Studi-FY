import React from 'react'
import ContactText from '../components/core/Contact/ContactText'
import ContactForm from '../components/core/Contact/ContactForm'
import { BiSolidMessageRounded } from "react-icons/bi";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import Footer from "../components/common/Footer"

const Contact = () => {
    return (
        <div>
            <div className='w-screen flex flex-col items-center justify-center'>
                <div className='w-[70%] flex g ml-16'>
                    <div className='w-[40%] '>
                        <div className='text-richblack-5 flex flex-col gap-10 mt-5 bg-richblack-800 px-8 py-4 rounded-md border border-richblack-700'>
                            <div>
                                <div className='flex gap-4 items-center'>
                                    <div className='text-2xl'>
                                        <BiSolidMessageRounded />
                                    </div>
                                    <h1 className='text-xl font-bold'>Chat on us</h1>
                                </div>
                                <p className='text-richblack-300 font-semibold'>Our friendly team is here to help</p>
                                <p className='text-richblack-300 font-semibold'>Info@studify.com</p>
                            </div>
                            <div>
                                <div className='flex items-center gap-4'>
                                    <div className='text-2xl'>
                                        <FaGlobeAmericas />
                                    </div>
                                    <h1 className='text-xl font-bold'>Visit us</h1>
                                </div>
                                <p className='text-richblack-300 font-semibold'>come and say hello at our office HQ</p>
                                <p className='text-richblack-300 font-semibold'>Akshya nagar 1st Block 1st Cross , Rammurthy nagar,</p>
                                <p className='text-richblack-300 font-semibold'>Banglore,2030301</p>
                            </div>
                            <div>
                                <div className='flex gap-4 items-center'>
                                    <div className='text-2xl'>
                                        <FaPhone />
                                    </div>
                                    <h1 className='text-xl font-bold'>Call us</h1>
                                </div>
                                <p className='text-richblack-300 font-semibold'>Mon-Fri From 8am to 5pm</p>
                                <p className='text-richblack-300 font-semibold'>+123456789</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-[60%] p-5'>
                        <div className=' border border-richblue-700 p-5'>
                            <ContactText heading={"Got an Idea? We've got the skills. Let's team up"}
                                text={"Tell us more about yourself and what you've got in your mind"} active={false} />
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact