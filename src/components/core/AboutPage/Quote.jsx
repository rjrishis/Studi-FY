import React from 'react'
import Highlighter from '../HomePage/Highlighter'
const Quote = () => {
    return (

        <div className='text-3xl font-bold text-richblack-5 text-center'>
            We are passionate about revolutionizing the way we learn.
            Our innovative platform <Highlighter text={"combines technology"} />, <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">expertise</span>,
            and community to create an <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">unparalleled educational experience.</span>
        </div>

    )
}

export default Quote