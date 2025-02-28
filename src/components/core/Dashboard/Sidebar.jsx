import React, { useEffect, useState } from 'react'
import { sidebarLinks } from "../../../data/dashboard-links.js"
import SidebarLink from './SidebarLink.jsx'
import { useSelector } from 'react-redux'
import { VscSignOut } from 'react-icons/vsc'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../../common/Loader.jsx'
import ConfirmationModal from "../../common/ConfirmationModal.jsx"
import {logout} from "../../../services/operations/authAPI.js"
const Sidebar = () => {
    const [confirmationModal, setConfirmationModal] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, loading: profileLoading } = useSelector((state) => state.profile)
    console.log(user)
    const { loading: authLoading } = useSelector(state => state.auth)
    if (profileLoading || authLoading) {
        return (
            <div>
                <Loader />
            </div>
        )
    }
    // useEffect(() => {
    //     navigate("/dashboard/my-profile")
    // }, [])
    
    return (
        <>
            <div className='w-[15rem] h-[87rem] bg-richblack-800 text-richblack-300 text-lg px-6 py-8'>
                <div className='border-b border-richblack-700 pb-8'>
                    {sidebarLinks.map((link, i) => {
                        if (link.type && user?.accountType !== link.type) return null
                        return (
                            <SidebarLink key={link.id} link={link.path} iconName={link.icon} name={link.name} />
                        )
                    })}
                </div>
                <div className='mt-10'>
                    <SidebarLink
                        name="Settings" link="/dashboard/settings"
                        iconName="VscSettingsGear"
                    />
                    <button
                        onClick={() =>
                            setConfirmationModal({
                                text1: "Are you sure?",
                                text2: "You will be logged out of your account.",
                                btn1Text: "Logout",
                                btn2Text: "Cancel",
                                btn1Handler: () => dispatch(logout(navigate)),
                                btn2Handler: () => setConfirmationModal(null),
                            })
                        }
                        className="text-lg font-medium text-richblack-300"
                    >
                        <div className="flex items-center gap-x-2">
                            <VscSignOut className="text-lg mr-1" />
                            <span>Logout</span>
                        </div>
                    </button>
                </div>
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
    )
}

export default Sidebar