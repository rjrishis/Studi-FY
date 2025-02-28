import React from 'react'
import CustomButton from './CustomButton'
import { LuArrowRight } from "react-icons/lu";
import { TypeAnimation } from 'react-type-animation';
function CodeBlocks({position , heading  , subheading , cbutton1 , cbutton2 , codeColor, codeBlock}) {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
        <div className='w-[50%] flex flex-col gap-8'>
            {heading}
            <div className='text-richblack-300 font-bold'>
                {subheading}
            </div>
            <div className='flex gap-7 mt-7'>
                <CustomButton  linkto={cbutton1.linkto} active={cbutton1.active}><div className='flex items-center gap-2'>{cbutton1.children}<span className=''><LuArrowRight/></span></div></CustomButton>
                <CustomButton linkto={cbutton2.linkto} active={cbutton2.active}>{cbutton2.children}</CustomButton>
            </div>

        </div>
        <div className='flex w-[50%]'>
            <div className='w-[10%] bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold font-inter font-bold text-center'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
            </div>
            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor}`}>
                <TypeAnimation
                sequence={[codeBlock , 3000 , ""]}
                repeat={Infinity}
                cursor={true}
                omitDeletionAnimation={true}
                />
            </div>
        </div>
        
    </div>
  )
}

export default CodeBlocks