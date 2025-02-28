import mongoose from "mongoose";
import mailSender from "../utils/mailSender.js";
import { otpTemplate } from "../mail/templates/otpVerificationTemplate.js";
const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:5*60
    }
})

const sendVerificationEmail = async(email,otp)=>{
    try {
        const mailResponse = await mailSender(email, "Verification Email from StudiFy", otpTemplate(otp))
        console.log("Mail sent successfully",mailResponse)
    } catch (error) {
        console.log("Error while sending verification email",error)
        throw error
    }
}

otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp)
    next()
})

const Otp = mongoose.model('otp', otpSchema)

export default Otp;