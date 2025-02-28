import mongoose from "mongoose";

const ratingAndReviews = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true,
        trim:true,
    },
    course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},
})

const RatingAndReviews = mongoose.model("RatingAndReviews", ratingAndReviews)

export default RatingAndReviews;