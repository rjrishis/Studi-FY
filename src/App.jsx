import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Error from "./pages/Error"
import ForgotPassword from './pages/ForgotPassword'
import Loader from './components/common/Loader'
import UpdatePassword from './pages/UpdatePassword'
import VerfiyEmail from './pages/VerfiyEmail'
import About from './pages/About'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import MyProfile from './components/core/Dashboard/MyProfile'
import Settings from './components/core/Dashboard/settings/Settings'
import Index from './components/core/Dashboard/settings'
import AddCourse from './components/core/Dashboard/AddCourse'
import MyCourses from './components/core/Dashboard/MyCourses'
import EditCourse from './components/core/Dashboard/EditCourse/EditCourse'
import Catalog from './pages/Catalog'
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses'
import CourseDetails from './pages/CourseDetails'
import Cart from './components/core/Cart/Cart'
import ViewCourse from './pages/ViewCourse'
import VideoDetails from './components/core/ViewCourse/VideoDetails'
const App = () => {
  return (
    <div className='bg-richblack-900 w-screen min-h-screen font-inter'>
      {location.pathname !== '/error' && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/error' element={<Error />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/loader' element={<Loader />} />
        <Route path='/update-password/:id' element={<UpdatePassword />} />
        <Route path='/verify-email' element={<VerfiyEmail />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/Settings" element={<Index />} />
          <Route path="/dashboard/add-course" element={<AddCourse />} />
          <Route path="/dashboard/my-courses" element={<MyCourses />} />
          <Route path="/dashboard/cart" element={<Cart />} />
          <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
          <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />
        </Route>
        <Route path='/view-course' element={<ViewCourse/>}> 
          <Route path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails/>} />
        </Route>
        <Route path='*' element={<Error />} />
        <Route path='/catalog/:catalogName' element={<Catalog />} />

      </Routes>
    </div>
  )
}

export default App