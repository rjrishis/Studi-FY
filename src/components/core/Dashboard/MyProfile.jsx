import React from 'react'
import IconBtn from '../../common/IconBtn'
import { useSelector } from 'react-redux'
import { RiEditBoxLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
const MyProfile = () => {
  const { user } = useSelector(state => state.profile)
  const navigate = useNavigate()
  console.log(user)
  return (
    <div className='w-full h-full'>
      <h1 className='text-2xl text-richblack-5 font-medium'>My Profile</h1>
      <div className='mt-5 w-full h-32 bg-richblack-800 px-10 py-5 rounded-lg flex items-center justify-between'>
        <div className='flex items-center gap-4 '>
          <div className='w-20 h-20 rounded-full  overflow-hidden'>
            <img src={user.image} alt={`profile-${user?.firstName}`}
              className="object-cover aspect-square" />
          </div>
          <div className='flex flex-col gap-1'>
            <h1 className='text-lg text-richblack-5 font-semibold'>{user.firstName}{" "}{user.lastName}</h1>
            <p className='text-richblack-300 text-sm'>{user.email}</p>
          </div>
        </div>
        <div>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
      </div>
      <div className='mt-10 w-full h-40 bg-richblack-800 px-10 py-5 rounded-lg flex flex-col gap-5'>
        <div className='flex justify-between'>
          <h1 className='text-lg font-semibold text-richblack-5'>About</h1>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className=' w-[85%] h-20'>
          <p
            className={`${user?.additionalDetails?.about
              ? "text-richblack-5 leading-loose"
              : "text-richblack-400 "
              } text-sm font-medium`}
          >
            {user?.additionalDetails?.about ?? "Write Something About Yourself"}
          </p>
        </div>
      </div>
      <div className='mt-10 w-full h-64 bg-richblack-800 px-10 py-5 rounded-lg flex flex-col gap-5'>
        <div className='flex justify-between'>
          <h1 className='text-lg font-semibold text-richblack-5'>Personal Details</h1>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className='w-[70%] h-full  flex'>
          <div className='w-[60%] h-full flex flex-col gap-2'>
            <div className='flex flex-col gap-1'>
              <p className='text-richblack-300 text-sm'>First Name</p>
              <p className='text-richblack-5 text-sm'>{user?.firstName}</p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-richblack-300 text-sm'>Email</p>
              <p className='text-richblack-5 text-sm'>{user?.email}</p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-richblack-300 text-sm'>Gender</p>
              <p className='text-richblack-5 text-sm'>{user?.additionalDetails?.gender ? user.additionalDetails.gender : "Add Gender"}</p>
            </div>
          </div>
          <div className='flex-1 h-full flex flex-col  pl-20 gap-2'>
            <div className='flex flex-col gap-1'>
              <p className='text-richblack-300 text-sm'>Last Name</p>
              <p className='text-richblack-5 text-sm'>{user?.lastName}</p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-richblack-300 text-sm'>Last Name</p>
              <p className='text-richblack-5 text-sm'>{user?.additionalDetails?.contactNumber ? user.additionalDetails.contactNumber : "Add Contact Number"}</p>
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-richblack-300 text-sm'>D.O.B</p>
              <p className='text-richblack-5 text-sm'>{user?.additionalDetails?.dateOfBirth ? user.additionalDetails.dateOfBirth :"Add D.O.B"}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default MyProfile