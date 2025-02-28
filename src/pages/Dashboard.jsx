import React from 'react'
import Sidebar from '../components/core/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'
const Dashboard = () => {
    return (
        <div className='w-screen min-h-[calc(100vh-3.5rem)] flex'>
            <Sidebar />
            <div className='min-h-[calc(100vh-3.5rem)] flex-1 overflow-auto text-richblack-5'>
                <div className="mx-auto w-11/12 max-w-[1000px] py-10 px-16">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard