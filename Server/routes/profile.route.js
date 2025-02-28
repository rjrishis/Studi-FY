import { Router } from "express"
const router = Router()
import { auth, isInstructor } from "../middlewares/auth.js"
import { upload } from "../middlewares/multer.js"
import {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses
  // getEnrolledCourses,
  // instructorDashboard,
} from "../controllers/profile.js"

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, upload.single("displayImage") , updateDisplayPicture)
// router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

export default router