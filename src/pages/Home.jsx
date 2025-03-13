// Icons Import
import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"

// Image and Video Import
import Banner from "../assets/Images/banner.mp4"
<<<<<<< HEAD
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import { RiUserFill } from "react-icons/ri";
import { FaGraduationCap } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { TbMathSymbols } from "react-icons/tb";
import TimelineImage from "../assets/Images/TimelineImage.png"
import Highlighter from '../components/core/HomePage/Highlighter';
import know_your_progress from "../assets/Images/Know_your_progress.png"
import compare_with_others from "../assets/Images/Compare_with_others.png"
import plan_your_lessons from "../assets/Images/Plan_your_lessons.png"
import instructor from "../assets/Images/Instructor.png"
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
=======
// Component Imports
import Footer from "../components/common/Footer"
// import ReviewSlider from "../components/common/ReviewSlider"
// import CustomButton from "../components/core/HomePage/Button"
import CustomButton from "../components/core/HomePage/CustomButton"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import ExploreMore from "../components/core/HomePage/ExploreMore"
import Highlighter from "../components/core/HomePage/Highlighter"
import InstructorSection from "../components/core/HomePage/InstructorSection"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import TimelineSection from "../components/core/HomePage/TimelineSection"
>>>>>>> bb84db7 (updated ui)

function Home() {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        {/* Become a Instructor Button */}
        <Link to={"/signup"}>
          <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        {/* Heading */}
        <div className="text-center text-4xl font-semibold">
          Empower Your Future with
          <Highlighter text={"Coding Skills"} />
        </div>

        {/* Sub Heading */}
        <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-row gap-7">
          <CustomButton active={true} linkto={"/signup"}>
            Learn More
          </CustomButton>
          <CustomButton active={false} linkto={"/login"}>
            Book a Demo
          </CustomButton>
        </div>

        {/* Video */}
        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1  */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <Highlighter text={"coding potential"} /> with our online
                courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                Start
                <Highlighter text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-white"}
            codeblock={`import React from "react";\n import CustomButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        {/* Explore Section */}
        <ExploreMore />
      </div>

      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[320px]">
          {/* Explore Full Catagory Section */}
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
            <div className="lg:h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white lg:mt-8">
              <CustomButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CustomButton>
              <CustomButton active={false} linkto={"/login"}>
                Learn More
              </CustomButton>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
          {/* Job that is in Demand - Section 1 */}
          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ">
              Get the skills you need for a{" "}
              <Highlighter text={"job that is in demand."} />
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CustomButton active={true} linkto={"/signup"}>
                <div className="">Learn More</div>
              </CustomButton>
            </div>
          </div>

          {/* Timeline Section - Section 2 */}
          <TimelineSection />

          {/* Learning Language Section - Section 3 */}
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Become a instructor section */}
        <InstructorSection />

        {/* Reviws from Other Learner */}
        {/* <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider /> */}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home