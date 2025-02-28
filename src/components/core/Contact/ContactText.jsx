import React from 'react'

const ContactText = ({ heading, text ,active=true}) => {
    return (
        <div className=" text-richblack-300 rounded-xl p-7  flex gap-3 flex-col">
            <h1 className="text-4xl leading-10 font-semibold text-richblack-5 mx-auto">
                {heading}
            </h1>
            {active?<p className="mx-auto text-center text-richblack-300 mt-1">
                {text}
            </p>:
            <p className='text-richblack-300'>{text}</p>}
        </div>
    )
}

export default ContactText