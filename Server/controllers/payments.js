import mongoose from "mongoose";
import instance from "../config/razorpay.js"
import Course from "../models/course.model.js"
import User from "../models/user.model.js"
import mailSender from "../utils/mailSender.js";
import crypto from "crypto"
import { paymentSuccessEmail } from "../mail/templates/paymentSuccessEmail.js";
// import { courseEnrollmentEmail } from "../mail/templates/courseEnrollmentEmail.js";
import CourseProgress from "../models/courseProgress.model.js";
import { courseEnrollmentEmail } from "../mail/templates/courseEnrollmentEmail.js";

const capturePayment = async (req, res) => {
    const { courses } = req.body
    const userId = req.user.userId
    if (courses.length === 0) {
        return res.json({ success: false, message: "Please Provide Course ID" })
    }
    let total_amount = 0

    for (const course_id of courses) {
        let course
        try {
            // Find the course by its ID
            course = await Course.findById(course_id)

            // If the course is not found, return an error
            if (!course) {
                return res
                    .status(200)
                    .json({ success: false, message: "Could not find the Course" })
            }

            // Check if the user is already enrolled in the course
            const uid = new mongoose.Types.ObjectId(userId)
            if (course.studentsEnrolled.includes(uid)) {
                return res
                    .status(200)
                    .json({ success: false, message: "Student is already Enrolled" })
            }

            // Add the price of the course to the total amount
            total_amount += course.price
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: error.message })
        }
    }
    const options = {
        amount: total_amount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    }

    try {
        // Initiate the payment using Razorpay
        const paymentResponse = await instance.orders.create(options)
        console.log(paymentResponse)
        res.json({
            success: true,
            data: paymentResponse,
        })
    } catch (error) {
        console.log(error)
        res
            .status(500)
            .json({ success: false, message: "Could not initiate order." })
    }
}

const verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses
    const userId = req.user.userId

    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !userId
    ) {
        return res.status(200).json({ success: false, message: "Payment Failed" })
    }
    let body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString()) //adds data to be hashed
        .digest("hex") //generates the final hashed output in hexadecimal format

    if (expectedSignature === razorpay_signature) {
        await enrollStudents(courses, userId, res)
        return res.status(200).json({ success: true, message: "Payment Verified" })
    }

    return res.status(200).json({ success: false, message: "Payment Failed" })
}


const sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body
  
    const userId = req.user.userId
  
    if (!orderId || !paymentId || !amount || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all the details" })
    }
  
    try {
      const enrolledStudent = await User.findById(userId)
  
      await mailSender(
        enrolledStudent.email,
        `Payment Received`,
        paymentSuccessEmail(
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
          amount / 100,
          orderId,
          paymentId
        )
      )
    } catch (error) {
      console.log("error in sending mail", error)
      return res
        .status(400)
        .json({ success: false, message: "Could not send email" })
    }
  }

const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please Provide Course ID and User ID" })
    }
  
    for (const courseId of courses) {
      try {
        // Find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { $push: { studentsEnrolled: userId } },
          { new: true }
        )
  
        if (!enrolledCourse) {
          return res
            .status(500)
            .json({ success: false, error: "Course not found" })
        }
        console.log("Updated course: ", enrolledCourse)
  
        const courseProgress = await CourseProgress.create({
          courseID: courseId,
          userId: userId,
          completedVideos: [],
        })
        // Find the student and add the course to their list of enrolled courses
        const enrolledStudent = await User.findByIdAndUpdate(
          userId,
          {
            $push: {
              courses: courseId,
              courseProgress: courseProgress._id,
            },
          },
          { new: true }
        )
  
        console.log("Enrolled student: ", enrolledStudent)
        // Send an email notification to the enrolled student
        const emailResponse = await mailSender(
          enrolledStudent.email,
          `Successfully Enrolled into ${enrolledCourse.courseName}`,
          courseEnrollmentEmail(
            enrolledCourse.courseName,
            `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
          )
        )
  
        console.log("Email sent successfully: ", emailResponse.response)
      } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error: error.message })
      }
    }
  }






// const capturePayment = async (req,res)=>{
//     const {courseId} = req.body;
//     const userId = req.user.id;

//     if(!courseId){
//         return res.status(400).json({success:false, message:"CourseId is required , please provide a valid course"})
//     }
//     const course = await  Course.findById(courseId)
//     if(!course){
//         return res.status(404).json({success:false, message:"Course not found"})
//     }
//     const uid = new mongoose.Types.ObjectId(userId)
//     if(course.studentsEnrolled.includes(uid)){
//         return res.status(400).json({success:false, message:"You have already enrolled in this course"})
//     }

//     const amount = course.amount
//     const currency = "INR"

//     const options = {
//         amount : amount * 100,
//         currency,
//         receipt: `${Date.now()}_${Math.floor(Math.random() * 10000)}`,
//         notes:{
//             courseId : courseId,
//             userId
//         }
//     }

//     try {
//         const paymentResponse = await instance.orders.create(options)
//         console.log(paymentResponse)
//         return res.status(200).json({
//             success:true,
//             courseName : course.courseName,
//             courseDescription : course.courseDescription,
//             thumbnail : course.thumbnail,
//             orderId : paymentResponse.id,
//             amount : paymentResponse.amount,
//             currency : paymentResponse.currency,
//             message : "Payment request sent successfully"

//         })
//     } catch (error) {
//         console.log(error.message)
//         return res.status(500).json({success:false, message:"Something went wrong while processing order"})
//     }
// }

// const verifySignature = async(req , res)=>{
//  const webhookSecret = "12345678"
//  const signature = req.headers["x-razorpay-signature"]
//  const shasum = crypto.createHmac("sha256",webhookSecret)
//  shasum.update(JSON.stringify(req.body))
//  const digest = shasum.digest("hex")

//  if(signature === digest){
//     console.log("Payment is authorized")
//     const {courseId , userId} = req.body.payload.payment.entity.notes
//     try {
//         const enrolledCourse = await Course.findByIdAndUpdate(
//             {_id:courseId},
//             {$push:{studentsEnrolled:userId}},
//             {new:true}
//         )
//         if(!enrolledCourse){
//             return res.status(500).json({success:false, message:"Course not found"})
//         }
//         console.log(enrolledCourse)

//         const enrolledStudent = await User.findByIdAndUpdate(
//             {_id:userId},
//             {$push:{courses:courseId}},
//             {new:true}
//         )
//         if(!enrolledStudent){
//             return res.status(500).json({success:false, message:"User not found"})
//         }
//         console.log(studentsEnrolled)

//         const emailResponse = await mailSender(
//             enrolledStudent.email,
//             "Congratulations from Studify",
//             "Congratulations, you are onboard into the new Studify Course"
//         )
//         return res.status(200).json({
//             success:true,
//             message:"Signature verified and Course added successfully"
//         })
//     } catch (error) {
//         return res.status(500).json({success:false, message:error.message})
//     }
//  }
//  else{
//     return res.status(400).json({success:false, message:"Invalid request"})
//  }
// }

// const sendPaymentSuccessEmail = async (req, res) => {
//     const { orderId, paymentId, amount } = req.body

//     const userId = req.user.id

//     if (!orderId || !paymentId || !amount || !userId) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Please provide all the details" })
//     }

//     try {
//       const enrolledStudent = await User.findById(userId)

//       await mailSender(
//         enrolledStudent.email,
//         `Payment Received`,
//         paymentSuccessEmail(
//           `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
//           amount / 100,
//           orderId,
//           paymentId
//         )
//       )
//     } catch (error) {
//       console.log("error in sending mail", error)
//       return res
//         .status(400)
//         .json({ success: false, message: "Could not send email" })
//     }
//   }

export { capturePayment, verifyPayment, sendPaymentSuccessEmail, enrollStudents }