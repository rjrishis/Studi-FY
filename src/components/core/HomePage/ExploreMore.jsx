import React, { useState } from 'react'
import { HomePageExplore } from "../../../data/homepage-explore.js"
import Highlighter from './Highlighter'
import { FaUserGroup } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";


const tabsName = ["Free", "New to coding", "Most popular", "Skill paths", "Carrer paths"]

const ExploreMore = () => {
    const [currentTab, setCurrentTab] = useState(tabsName[0])
    const [courses, setCourses] = useState(HomePageExplore[0].courses)
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter(course => course.tag === value)
        setCourses(result[0].courses)
        setCurrentCard(result[0].courses[0].heading)
    }
    return (
        <div className='w-full mb-40 flex flex-col items-center relative '>
            <div className='text-center text-3xl font-semibold text-white'>Unlock the <Highlighter text={"power of code"} /></div>
            <p className='text-center text-md  mt-3 text-richblack-300'>learn to build anything you can imagine</p>
            <div className='rounded-full flex gap-2 bg-richblack-800 mt-6 px-2 py-1 border-richblack-100'>
                {tabsName.map((e, i) => (
                    <div onClick={() => setMyCards(e)} className={`${currentTab === e ?
                        "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"
                        } rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-2 py-2`} key={i}>{e}</div>
                ))}
            </div>
            <div className='flex gap-8 absolute top-52'>
                {console.log(courses)}
                {courses.map((e,i) => (
                    <div key={i} className={`${i===0 ? "bg-white":"bg-richblack-800"} w-60  flex flex-col gap-5 p-3 bg-richblack-800`}>
                        <h1 className={`${i===0 ? "text-black" : "text-white"} font-semibold `}>{e.heading}</h1>
                        <p className='text-richblack-300 text-sm mb-6'>{e.description}</p>
                        <div className=''>
                            <div className='absolute bottom-0 flex gap-8 mb-4'>
                                <div className='flex gap-2 items-center text-richblack-300 '>
                                    <FaUserGroup />
                                    <h1 className='text-sm'>{e.level}</h1>
                                </div>
                                <div className='flex gap-2 items-center text-richblack-300 '>
                                    <FaUserTie />
                                    <h1 className='text-sm'>{e.lessionNumber} Lessons</h1>
                                </div>
                            </div>



                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default ExploreMore