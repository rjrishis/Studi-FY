import React from 'react'
import { LuArrowRight } from "react-icons/lu";
import { Link } from 'react-router-dom';
import CustomButton from '../components/core/HomePage/CustomButton';
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import { RiUserFill } from "react-icons/ri";
import { FaGraduationCap } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { TbMathSymbols } from "react-icons/tb";
import TimelineImage from "../assets/Images/TimelineImage.png"
import Highlighter from '../components/core/HomePage/Highlighter';
import know_your_progress from "../assets/Images/know_your_progress.png"
import compare_with_others from "../assets/Images/compare_with_others.png"
import plan_your_lessons from "../assets/Images/plan_your_lessons.png"
import instructor from "../assets/Images/instructor.png"
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/HomePage/ExploreMore';
const Home = () => {
    return (
        <div>
            <div className='flex justify-center'>
                <div className='w-[70%] flex flex-col items-center pt-10'>
                    <Link to={"/signup"} className="mb-10">
                        <div className='flex gap-3 bg-richblue-800 text-richblack-200 rounded-full px-5 py-2 hover:border hover:bg-richblack-900 transition-all duration-200 hover:scale-105 '>
                            Become an Instructor  <span className='mt-1'><LuArrowRight /></span>
                        </div>
                    </Link>
                    <div className='flex flex-col items-center '>
                        <h1 className=' text-3xl text-white font-semibold'>Empower Your Future With <span className='bg-gradient-to-b from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb] text-transparent bg-clip-text font-bold font-bold'>Coding Skills</span></h1>
                        <div className='w-full h-full px-12 py-5'>
                            <p className='text-richblack-300  text-center'>with out online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands on projects, quizzes and personlaized feedback form instructors.</p>
                        </div>
                    </div>
                    <div className='flex gap-10 mt-3 shadow-blue-200'>
                        <CustomButton linkto="/learn-more" active={true}>Learn More</CustomButton>
                        <CustomButton linkto="/learn-more" active={false}>Book a Demo</CustomButton>
                    </div>
                    <div className='mt-14'>
                        <video
                            muted
                            loop
                            autoPlay
                            src={Banner}
                        ></video>
                    </div>
                    <div>
                        <CodeBlocks
                            heading={<div>
                                <h1 className='text-3xl font-semibold text-white'>Unlock your <span className='bg-gradient-to-b from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb] text-transparent bg-clip-text font-bold  font-semibold'>coding potential</span> with our online courses</h1>
                            </div>}
                            subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you. "}
                            cbutton1={{ active: true, children: "try it yourself", linkto: "/signup" }}
                            cbutton2={{ active: false, children: "learn more", linkto: "/login" }}
                            codeBlock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>\n<html lang="en">\n<head>\n<title>This is myPage</title>`}
                            codeColor={"text-[#FED608]"}
                        />
                    </div>
                    <div className=''>
                        <CodeBlocks
                            position={"flex-row-reverse"}
                            heading={<div>
                                <h1 className='text-3xl font-semibold text-white'>Start  <span className='bg-gradient-to-b from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb] text-transparent bg-clip-text font-bold font-semibold'>coding in seconds</span> </h1>
                            </div>}
                            subheading={"Go ahead, give it a try. Our hands-on learning enivironment means you'll be writing real code from your very first lesson. "}
                            cbutton1={{ active: true, children: "continue lesson", linkto: "/signup" }}
                            cbutton2={{ active: false, children: "learn more", linkto: "/login" }}
                            codeBlock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>\n<html lang="en">\n<head>\n<title>This is myPage</title>`}
                            codeColor={"text-[#FED608]"}
                        />
                    </div>
                    <ExploreMore/>



                </div>
            </div>
            <div className='bg-pure-greys-5 text-richblack-700 pb-20 mt-16'>
                <div className='homepage_bg h-[300px] flex gap-8 items-center justify-center'>
                    <CustomButton linkto={""} active={true}><div className='flex items-center gap-2'><h1>Explore Full Catalog</h1><LuArrowRight /></div></CustomButton>
                    <CustomButton linkto={""} active={false}>Learn More</CustomButton>
                </div>
                <div className='mx-auto w-[70%] max-w-maxContent flex  py-16'>
                    <div className='flex w-[50%]'>
                        <div className=''>
                            <h1 className='font-bold text-3xl'>Get the skills you need for a <span className='bg-gradient-to-b from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb] text-transparent bg-clip-text font-bold'>job that is in demand.</span></h1>
                        </div>
                    </div>
                    <div className='w-[50%] flex flex-col gap-10 pl-10'>
                        <h1>The modern studify is the dedicated towards it's own terms i.e Today, to be a competitive specialist requires more than professional skills. </h1>
                        <div className='w-32'><CustomButton linkto={""} active={true}>Learn More</CustomButton></div>

                    </div>
                </div>
                <div className='mx-auto w-[70%] max-w-maxContent mb-28 '>
                    <div className='flex w-full h-full gap-10'>
                        <div className='w-[35%]'>
                            <div className='flex gap-4 py-8'>
                                <div className='flex items-center text-2xl'><RiUserFill /></div>
                                <div>
                                    <h1 className='font-bold'>Leadership</h1>
                                    <h2 className='text-richblue-300'>Fully committed to the success company</h2>
                                </div>
                            </div>
                            <div className='flex gap-4 py-8'>
                                <div className='flex items-center text-2xl'><FaGraduationCap /></div>
                                <div>
                                    <h1 className='font-bold'>Responsibility</h1>
                                    <h2 className='text-richblue-300'>Students will always be our top priority</h2>
                                </div>
                            </div>
                            <div className='flex gap-4 py-8'>
                                <div className='flex items-center text-2xl'><IoDiamond /></div>
                                <div>
                                    <h1 className='font-bold'>Flexibility</h1>
                                    <h2 className='text-richblue-300'>The ability to switch to an important skill</h2>
                                </div>
                            </div>
                            <div className='flex gap-4 py-8'>
                                <div className='flex items-center text-2xl'><TbMathSymbols /></div>
                                <div>
                                    <h1 className='font-bold'>Solve the problem</h1>
                                    <h2 className='text-richblue-300'>Code your way to a solution</h2>
                                </div>
                            </div>
                        </div>
                        <div className='w-[65%] relative shadow-blue-200'>
                            <img className='object-cover h-fit shadow-white' src={TimelineImage} alt="TimelineImage" style={{ height: "450px" }} />
                            <div className='absolute w-[60%] h-24 bg-caribbeangreen-700 translate-x-24 -translate-y-14 flex text-white'>
                                <div className='w-1/2 h-full flex items-center'>
                                    <div className='w-full h-10 border-r border-caribbeangreen-300 flex items-center gap-6 px-2 pl-5'>
                                        <p className='text-3xl font-bold'>10</p>
                                        <p className='text-caribbeangreen-300 text-sm'>YEARS OF EXPERIENCE</p>
                                    </div>
                                </div>
                                <div className='w-1/2 h-full flex items-center'>
                                    <div className='w-full h-10  flex items-center gap-6 px-2 pl-5'>
                                        <p className='text-3xl font-bold'>250</p>
                                        <p className='text-caribbeangreen-300 text-sm'>TYPES OF COURSES</p>
                                    </div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mx-auto w-[70%] max-w-maxContent  flex flex-col gap-5'>
                    <div className='w-[70%] flex flex-col mx-auto  gap-5'>
                        <h1 className='text-4xl font-semibold'>Your swiss knife for <Highlighter text={"learning any language"} /></h1>
                        <p className='text-center font-medium text-richblue-600 text-base'>using spin making learning multiple languages esasy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
                    </div>
                    <div className='w-full flex items-center justify-center -mr-9'>
                        <><img src={know_your_progress} alt="" className='object-contain ml-8' style={{ width: "800p" }} /></>

                        <><img src={compare_with_others} alt="" className='object-contain -ml-36' style={{ width: "800x" }} /></>
                        <><img src={plan_your_lessons} alt="" className='object-contain -ml-44' style={{ width: "800x" }} /></>
                    </div>
                    <div className='flex justify-center'>
                        <CustomButton active={true} linkto={"/signup"}><div>Learn More</div></CustomButton>
                    </div>
                </div>

            </div>
            <div className='flex flex-col text-white w-[70%]  mx-auto pt-14'>
                <div className='w-full flex gap-40'>
                    <div className='w-1/2 '>
                        <img src={instructor} alt="" />
                    </div>
                    <div className='w-1/2 justify-center flex flex-col gap-3'>
                        <div className='text-3xl font-semibold text-white'>Become an <br /> <Highlighter text={"Instructor"} /></div>
                        <div className='bg-gradient-to-b from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb] text-transparent bg-clip-text font-bold mb-10 '>Instructors from around the world teach millions of students on Studify. We provide the tools and skills to teach what you love.</div>
                        <CustomButton linkto={"signup"} active={true}> <div className='flex items-center gap-2'><h1>Start Teaching Today</h1><LuArrowRight /></div> </CustomButton>
                    </div>
                </div>
                <div className='w-full text-3xl mt-36'>
                    <div className='w-fit mx-auto '><h1>Reviews from other learners</h1></div>
                    <div className='w-full bg-caribbeangreen-50 h-40'></div>
                </div>
            </div>
            <Footer/>

        </div>
    )
}

export default Home 