import Profile from "../models/profile.model.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/uploadToCloudinary.js";
import { convertSecondsToDuration } from "../utils/secToDuration.js";
import CourseProgress from "../models/courseProgress.model.js";
import Course from "../models/course.model.js";

const updateProfile = async (req, res) => {
  try {
    const {firstName="" , lastName="", dateOfBirth = "", about = "", contactNumber, gender } = req.body
    const id = req.user.userId;
    if (!contactNumber || !gender) {
      return res.status(400).json({ success: false, message: "All fields are required" })
    }
    const userDetails = await User.findById({ _id: id })
    console.log("User Details are : ", userDetails)
    const user = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
    })
    await user.save()
    const profileId = userDetails.additionalDetails
    const profileDetails = await Profile.findById(profileId)
    profileDetails.dateOfBirth = dateOfBirth
    profileDetails.about = about
    profileDetails.contactNumber = contactNumber
    profileDetails.gender = gender

    profileDetails.save()

    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec()

    return res.status(200).json({ success: true, message: "Profile updated successfully", updatedUserDetails })
  } catch (error) {
    console.log("Error updating profile")
    return res.status(500).json({ success: false, message: "Something went wrong while updating profile", error: error.message })
  }
}

const deleteAccount = async (req, res) => {
  try {
    const id = req.user.userId
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }
    const deleteAdditionalDetails = await Profile.findOneAndDelete({ _id: user.additionalDetails })
    console.log("Additonal details to be deleted are:", deleteAdditionalDetails)
    const deleteUser = await User.findByIdAndDelete(id)
    return res.status(200).json({ success: true, message: "Account deleted successfully" })
  } catch (error) {
    console.log("User can't be deleted")
    return res.status(500).json({ success: false, message: "Something went wrong while deleting account", error: error.message })
  }
}

const getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.userId
    const userDetails = await User.findById(id).populate("additionalDetails")
    if (!userDetails) {
      return res.status(404).json({ success: false, message: "User not found" })
    }
    return res.status(200).json({ success: true, userDetails, message: "User fetched successfully" })

  } catch (error) {
    console.log("Error while fetching user details")
    return res.status(500).json({ success: false, message: "Something went wrong while fetching user details", error: error.message })
  }
}

const updateDisplayPicture = async (req, res) => {
  try {
    console.log("Hello from updateDisplayPicture", req.file)
    const localFilePath = req.file.path
    const userId = req.user.userId
    console.log("Hello rishi sharma", userId)
    const image = await uploadOnCloudinary(
      localFilePath,
      // process.env.FOLDER_NAME,
      // 1000,
      // 1000
    )
    console.log("image data is :", image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    console.log(updateProfile)
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.userId
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec()
    userDetails = userDetails.toObject()
    var SubsectionLength = 0
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0
      SubsectionLength = 0
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        )
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      })
      courseProgressCount = courseProgressCount?.completedVideos.length
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const instructorDashboard = async (req,res)=>{
  try {
    const courseDetails = await Course.find({instructor:req.user.userId});
    const courseData = courseDetails.map(course => {
      const totalStudentsEnrolled = course.studentsEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }
      return courseDataWithStats;
    })
    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }

}


export { updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture, getEnrolledCourses, instructorDashboard }