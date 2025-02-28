import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv"
dotenv.config({path:"./.env"})



const auth = async (req,res,next)=>{
    try {
        const token = req.cookies.token || req.body.token ||  req.headers["authorization"].replace("Bearer ", "")
        console.log(token)
        if(!token){
            return res.status(401).json({success:false,message:"Token is missing"})
        }
        try {
            const decodeToken =  jwt.verify(token,process.env.JWT_SECRET)
            console.log(decodeToken)
            req.user = decodeToken
        } catch (error) {
         return res.status(403).json({success:false,message:"Token is invalid"})   
        } 
        next()
        
    } catch (error) {
        return res.status(401).json({success:false,message:"something went wrong while validating token"})
    }
}

const isStudent = (req,res,next)=>{
    try {
        if(req.user.accountType !== "Student"){
            return res.status(401).json({success:false,message:"This is a Protected Route For Student Only"})
        }
        next()
    } catch (error) {
        return res.status(500).json({success:false,message:"User account type cannot be verified , Please try again "})
    }
}

const isAdmin = (req,res,next)=>{
    try {
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({success:false,message:"This is a Protected Route For Admin Only"})
        }
        next()
    } catch (error) {
        return res.status(500).json({success:false,message:"User account type cannot be verified , Please try again "})
    }
}

const isInstructor = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });
		console.log(userDetails);

		console.log(userDetails.accountType);

		if (userDetails.accountType !== "Instructor") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Instructor",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};

export {auth , isAdmin , isStudent ,isInstructor}