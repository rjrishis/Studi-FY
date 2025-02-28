import React from 'react'
import Highlighter from '../components/core/HomePage/Highlighter'
import FirstImage from "../assets/Images/aboutus1.webp"
import SecondImage from "../assets/Images/aboutus2.webp"
import ThirdImage from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactText from '../components/core/Contact/ContactText'
import ContactForm from '../components/core/Contact/ContactForm'
import Footer from '../components/common/Footer'
const About = () => {
    return (
        <div className='w-screen'>
            <div className='w-full flex items-center justify-center  border-richblack-300 border-b border-opacity-50 pb-20'>
                <div className='w-[80%] flex flex-col gap-8 items-center justify-center mt-16'>
                    <header className='text-richblack-5 text-4xl text-center font-bold w-[800px]'>
                        Driving innovation in online education for a {" "}
                        <Highlighter text={"Brighter Future"} />
                    </header>
                    <p className='text-richblack-300 lg:w-[800px] text-center'>
                        Studify is at the forefront of driving innovation in online eduation. We're passionate about creating a brighter future by offering cutting-edge
                        courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>
                    <div className='flex gap-12'>
                        <img src={FirstImage} alt="" className='w-[350px] h-[250px]' />
                        <img src={SecondImage} alt="" className='w-[350px] h-[250px]' />
                        <img src={ThirdImage} alt="" className='w-[350px] h-[250px]' />
                    </div>
                    <Quote />

                </div>
            </div>
            <div className='w-full flex flex-col items-center justify-center pb-20 '>
                <div className='w-[80%] flex gap-8 items-center justify-center mt-16 mb-40'>
                    <div className='w-[50%] flex flex-col gap-10'>
                        <h1 className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]'>Our Founding Story</h1>
                        <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for
                            accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                        </p>
                        <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that
                            could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                        </p>

                    </div>
                    <div className='w-[50%] h-full '>
                        <img src={FoundingStory} alt="" className='ml-24 shadow-[0_0_20px_0] shadow-[#FC6767]' />
                    </div>
                </div>
                <div className='w-[80%] flex gap-52 items-center justify-center mb-16'>
                    <div className='w-[50%] flex flex-col gap-10'>
                        <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                            Our Vision
                        </h1>
                        <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                            With this vision in mind, we set out on a journey to create an
                            e-learning platform that would revolutionize the way people
                            learn. Our team of dedicated experts worked tirelessly to
                            develop a robust and intuitive platform that combines
                            cutting-edge technology with engaging content, fostering a
                            dynamic and interactive learning experience.
                        </p>
                    </div>
                    <div className='w-[50%] flex flex-col gap-10'>
                        <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                            Our Mission
                        </h1>
                        <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                            Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                        </p>
                    </div>
                </div>
            </div>
            <div className='w-full py-10 px-32 bg-richblack-700 flex justify-around items-center'>
                <div className='flex flex-col items-center text-richblack-5'>
                    <h1 className='text-4xl font-bold'>5K</h1>
                    <p className='text-richblack-500'>Active Students</p>
                </div>
                <div className='flex flex-col items-center text-richblack-5'>
                    <h1 className='text-4xl font-bold'>10+</h1>
                    <p className='text-richblack-500'>Mentors</p>
                </div>
                <div className='flex flex-col items-center text-richblack-5'>
                    <h1 className='text-4xl font-bold'>200+</h1>
                    <p className='text-richblack-500'>Courses</p>
                </div>
                <div className='flex flex-col items-center text-richblack-5'>
                    <h1 className='text-4xl font-bold'>50+</h1>
                    <p className='text-richblack-500'>Awards</p>
                </div>
            </div>
            <div className='w-[80%] mx-auto mt-20 '>
                <LearningGrid/>
            </div>
            <div className='w-[35%] mx-auto '>
                <ContactText heading={"Get in Touch"} text={"We'd love to be here for you, Please fill out this form."}/>
                <ContactForm/>
            </div>
            <Footer/>
        </div>
    )
}

export default About