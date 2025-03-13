import React from 'react'
import ContactText from '../components/core/Contact/ContactText'
import ContactForm from '../components/core/Contact/ContactForm'
import { BiSolidMessageRounded } from "react-icons/bi";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import Footer from "../components/common/Footer"

const Contact = () => {
    return (
        <div className="flex flex-col items-center justify-center p-6 w-full">
            {/* Contact Sections (Limited Width) */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-6xl">
                {/* First Section (Contact Info) */}
                <div className="w-full md:w-2/5 flex flex-col items-center">
                    <div className="bg-richblack-800 px-8 py-6 rounded-md border border-richblack-700 w-full max-w-md">
                        {/* Chat with us */}
                        <div className="flex gap-4 items-center mb-4">
                            <div className="text-2xl text-white">
                                <BiSolidMessageRounded />  {/* White Icon */}
                            </div>
                            <h1 className="text-xl font-bold text-white">Chat with us</h1> {/* White Heading */}
                        </div>
                        <p className="text-richblack-300 font-semibold">Our friendly team is here to help</p>
                        <p className="text-richblack-300 font-semibold">Info@studify.com</p>

                        {/* Visit us */}
                        <div className="flex gap-4 items-center mt-6">
                            <div className="text-2xl text-white">
                                <FaGlobeAmericas />  {/* White Icon */}
                            </div>
                            <h1 className="text-xl font-bold text-white">Visit us</h1> {/* White Heading */}
                        </div>
                        <p className="text-richblack-300 font-semibold">Come and say hello at our office HQ</p>
                        <p className="text-richblack-300 font-semibold">Akshya Nagar 1st Block, Rammurthy Nagar,</p>
                        <p className="text-richblack-300 font-semibold">Bangalore, 2030301</p>

                        {/* Call us */}
                        <div className="flex gap-4 items-center mt-6">
                            <div className="text-2xl text-white">
                                <FaPhone />  {/* White Icon */}
                            </div>
                            <h1 className="text-xl font-bold text-white">Call us</h1> {/* White Heading */}
                        </div>
                        <p className="text-richblack-300 font-semibold">Mon-Fri from 8 AM to 5 PM</p>
                        <p className="text-richblack-300 font-semibold">+123456789</p>
                    </div>
                </div>

                {/* Second Section (Contact Form) */}
                <div className="w-full md:w-3/5 p-5">
                    <div className="border border-richblue-700 p-6 rounded-md">
                        <ContactText 
                            heading={"Got an Idea? We've got the skills. Let's team up"} 
                            text={"Tell us more about yourself and what you've got in your mind"} 
                            active={false} 
                        />
                        <ContactForm />
                    </div>
                </div>
            </div>

            {/* Footer (Full Width) */}
            <div className="w-full">
                <Footer />
            </div>
        </div>
    )
}

export default Contact
