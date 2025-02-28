import React from 'react'

const TextTemplate = ({title , desc1 , desc2}) => {
    return (
        <div className='text-white'>
            <h1 className='text-3xl font-bold mb-4'>{title} </h1>
            <h1 className='text-lg'>{desc1}</h1>
            <h1 className='font-edu-sa font-bold italic text-blue-100 text-lg'>{desc2}</h1>
        </div>
    )
}

export default TextTemplate