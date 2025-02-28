import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    // Define the email field with type String, required, and trimmed
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },

    // Define the password field with type String and required
    password: {
        type: String,
        required: true,
    },
    // Define the role field with type String and enum values of "Admin", "Student", or "Visitor"
    accountType: {
        type: String,
        enum: ["Admin", "Student", "Instructor"],
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    approved: {
        type: Boolean,
        default: true,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
    token: { type: String, default: null, unique: true, sparse: true },

    resetPasswordExpires: {
        type: Date,
    },
    image: {
        type: String,
        
    },
    courseProgress: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "courseProgress",
        },
    ],
},{timestamps:true})

const User = mongoose.model("user", userSchema);

export default User;