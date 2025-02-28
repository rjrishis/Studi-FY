import mongoose from "mongoose";
import Course from "../models/course.model.js";
import RatingAndReviews from "../models/ratingAndReviews.model.js";

const createRating = async (req, res) => {
   try {
     const userId = req.user.userId
     const { rating, review, courseId } = req.body
     if (!rating || !review || !courseId) {
         return res.status(400).json({ success: false, message: "All fields are required" })
     }
     const courseDetails = await Course.findOne(
         {
             _id: courseId,
             studentsEnrolled: { $in: [userId] }
 
         }
     )
     if (!courseDetails) {
         return res.status(404).json({ success: false, message: "Course not found or you are not enrolled in this course" })
     }
 
     const alreadyReviewed = await RatingAndReviews.findOne(
         {
             user: userId,
             course: courseId
         }
     )
     if (alreadyReviewed) {
         return res.status(400).json({ success: false, message: "You have already reviewed this course" })
     }
     const ratingReview = await RatingAndReviews.create({ rating, review, user: userId, course: courseId })
 
     const updateCourseRatingandReview = await Course.findByIdAndUpdate({ _id: courseId }, {
         $push: {
             ratingAndReviews: ratingReview._id
         }
     },
         {
             new: true
         })
         console.log(updateCourseRatingandReview)
     return res.status(200).json({ success: true, message: "Rating and review created successfully", ratingReview: ratingReview })
   } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: "Something went wrong while creating rating and review", error: error.message })
   }
}

const getAverageRating = async (req,res)=>{
    try {
        const {courseId} = req.body;
        if(!courseId){
            return res.status(400).json({success:false, message:"CourseId is required"})
        }
        const result = await RatingAndReviews.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}
                }
            }
        ])
        if(result.length>0){
            return res.status(200).json({success:true, message:"Average rating fetched successfully", averageRating:result[0].averageRating})
        }else{
            return res.status(404).json({success:false, message:"No ratings found for this course"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false , message:error.message})
    }
}

const getAllRating = async (req,res)=>{
    try {
        const allRatingAndReview = await RatingAndReviews.find()
                                         .populate({
                                            path:"user",
                                            select:"firstName lastName email image"
                                         })
                                         .populate({
                                            path:"course",
                                            select:"courseName"
                                         })
                                         .exec()
        return res.status(200).json({success:true,message:"All ratings and reviews fetched successfully",data:allRatingAndReview})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({success:false, message:"Something went wrong while fetching all ratings and reviews", error:error.message})
    }
}

export {createRating , getAverageRating , getAllRating}