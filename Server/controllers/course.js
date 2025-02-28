import Course from "../models/course.model.js";
import Category from "../models/category.model.js";
import mongoose from "mongoose";
// import User from "../models/user.model.js"
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/uploadToCloudinary.js";
import Section from "../models/section.model.js";
import SubSection from "../models/SubSection.model.js";
import { convertSecondsToDuration } from "../utils/secToDuration.js";
import CourseProgress from "../models/courseProgress.model.js";
const createCourse = async (req, res) => {
  try {
    let { courseName, courseDescription, whatYouWillLearn, price, tag, category, status, instructions } = req.body;
    // console.log("thumbaillllllllll", req.file)
    const thumbnail = req.file.path;
    // const tag = JSON.parse(_tag)
    // const instructions = JSON.parse(_instructions)

    console.log("tag", tag)
    console.log("instructions", instructions)
    if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category) {
      return res.status(400).json({ success: false, message: "All fields are required" })
    }
    if (!status || status === undefined) {
      status = "Draft"
    }
    const userId = req.user.userId;
    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor"
    });
    console.log("Instructor Details: " + instructorDetails)
    if (!instructorDetails) {
      return res.status(400).json({ success: false, message: "Instructor not found" })
    }
    const tagDetails = await Category.findById(category)
    if (!tagDetails) {
      return res.status(400).json({ success: false, message: "Tag not found" })
    }
    const thumbnailImage = await uploadOnCloudinary(thumbnail)
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag: tagDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status
    })
    const updateUserCourseArray = await User.findByIdAndUpdate({ _id: instructorDetails._id },
      {
        $push: { courses: newCourse._id }
      },
      { new: true }

    )
    const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    )
    console.log("HEREEEEEEEE", categoryDetails2)
    return res.status(200).json({ success: true, message: "Course created successfully", course: newCourse })
  } catch (error) {
    console.log("Failed to create Course", error)
    return res.status(500).json({ success: false, message: error.message })
  }
}

const editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body
    const thumbnail = req.file?.path;
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }
    // console.log(req.file.path)
    // If Thumbnail Image is found, update it
    // if (req.file) {
    //   console.log("thumbnail update")
    //   const thumbnail = req.file.path
    //   const updatedThumbnail = await uploadOnCloudinary(thumbnail)
    //   course.thumbnail = updatedThumbnail.secure_url
    // }
    if (req.file) {
      const thumbnailImage = await uploadOnCloudinary(thumbnail)
      course.thumbnail = thumbnailImage.secure_url
    }
    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (Object.hasOwn(updates, key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
    // .populate({
    //   path: "instructor",
    //   populate: {
    //     path: "additionalDetails",
    //   },
    // })
    // .populate("category")
    // .populate("ratingAndReviews")
    // .populate({
    //   path: "courseContent",
    //   populate: {
    //     path: "subSection",
    //   },
    // })
    // .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}
const showAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find({}, { courseName: true, price: true, thumbnail: true, instructor: true, ratingAndReviews: true, studentsEnrolled: true }).populate("instructor").exec();
    return res.status(200).json({ success: true, courses: allCourses, message: "All courses fetched successfully" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: "Something went wrong while fetching courses", error: error.message })
  }
}

const getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const courseDetails = await Course.findById(courseId)
    .populate("courseContent")
    .populate("instructor")
      //  .populate(
      //     {path:"instructor",
      //     populate:{
      //         path:"additonalDetails"
      //     }
      //     },
      //     )
      //  .populate("category")
      //  .populate("ratingAndReviews")
      // .populate(
      //   {
      //     path: "courseContent",
      //     populate: {
      //       path: "subSection"
      //     }
      //   }
      // )
      .exec()

    if (!courseDetails) {
      return res.status(404).json({ success: false, message: "Course not found" })
    }
    return res.status(200).json({ success: true, courseDetails, message: "Course fetched successfully" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: "Something went wrong while fetching course details", error: error.message })
  }
}

const getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.userId

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}

const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

const getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.userId
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      // .populate("category")
      // .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    }) 

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}



export { 
  createCourse,
  showAllCourses, 
  getCourseDetails, 
  editCourse, 
  getInstructorCourses, 
  deleteCourse,
  getFullCourseDetails
} 