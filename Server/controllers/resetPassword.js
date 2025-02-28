import User from "../models/user.model.js";
import mailSender from "../utils/mailSender.js";
import crypto from "crypto"
import bcrypt from "bcrypt"
import { passwordUpdate } from "../mail/templates/passwordUpdate.js";

const resetPasswordToken =async  (req,res)=>{
    try {
        const email = req.body.email
        // const {email}   = req.body
        if(!email){
            return res.status(403).json({success:false, message:"Please provide an email address"})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({success:false, message:"No user found with this email"})
        }
        const token = crypto.randomUUID()
        const updateUserDetails = await User.findOneAndUpdate({email},{token,resetPasswordExpires:Date.now() + 5*60*1000},{new:true})
        const url = `http://localhost:5173/update-password/${token}`
        await mailSender(email,"Password Reset Link", `Password Reset Link: ${url}`)
        return res.status(200).json({success:true, message:"Email sent successfully . Please check and update your password"})
    } catch (error) {
        return res.status(500).json({success:false,message:"Something went wrong while sending the email for resetting the password"})
    }
}

const resetPassword = async (req,res)=>{
    try {
		const { password, confirmPassword, token } = req.body;

		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}
		const userDetails = await User.findOne({ token: token });
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}
		if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}
		const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);
		res.json({
			success: true,
			message: `Password Reset Successful`,
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
}
export {resetPassword , resetPasswordToken}