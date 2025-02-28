import React from 'react'
import ChangeProfilePicture from './Settings'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'
const index = () => {
  return (
    <div>
        <ChangeProfilePicture/>
        <EditProfile/>
        <UpdatePassword/>
        <DeleteAccount/>
    </div>
  )
}

export default index