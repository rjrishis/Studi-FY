// Import the required modules
import { Router } from "express"
const router = Router()
import { upload } from "../middlewares/multer.js"

// Import the Controllers

// Course Controllers Import
// import {
//   createCourse,
//   showAllCourses,
//   getCourseDetails,
//   // getFullCourseDetails,
//   editCourse
//   // getInstructorCourses,
//   // deleteCourse,
// } from "../controllers/Course.js"

import { createCourse, deleteCourse ,showAllCourses, getCourseDetails, editCourse } from "../controllers/course.js"

// import { categoryPageDetails } from "../controllers/category.js"

// Categories Controllers Import
import {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} from "../controllers/category.js"

// Sections Controllers Import
import {
  createSection,
  updateSection,
  deleteSection,
} from "../controllers/section.js"

// Sub-Sections Controllers Import
import {
  createSubSection,
  updateSubSection,
  deleteSubSection
} from "../controllers/subSection.js"

// Rating Controllers Import
import {
  createRating,
  getAverageRating,
  getAllRating,
} from "../controllers/RatingAndReview.js"

import { getInstructorCourses } from "../controllers/course.js"

// import {
//   updateCourseProgress
// } from "../controllers/courseProgress.js";

import { getFullCourseDetails } from "../controllers/course.js"

// Importing Middlewares
import { auth, isInstructor, isStudent, isAdmin } from "../middlewares/auth.js"
import { updateCourseProgress } from "../controllers/courseProgress.js"


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, upload.single("thumbnailImage"), isInstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", upload.single("video"), auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", upload.single("video"), auth, isInstructor, createSubSection)
// Get all Registered Courses
// router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// Edit Course routes
router.post("/editCourse", auth, upload.single("thumbnailImage"), isInstructor, editCourse)
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// Delete a Course
router.delete("/deleteCourse", deleteCourse)

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isInstructor, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

export default router