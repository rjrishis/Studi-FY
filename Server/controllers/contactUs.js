import { contactUsEmail } from "../mail/templates/contactFromRes.js";
import mailSender from "../utils/mailSender.js";

const contactUs = async (req,res)=>{
    const {email, firstname , lastname , phoneNumber , countryCode , message} = req.body
    try {
        const mailResponse = await mailSender(
                                   email,
                                   "Your data has been sent successfully",
                                   contactUsEmail(email,firstname,lastname,message,phoneNumber,countryCode))
        console.log("EmailResponse: " + mailResponse)
        return res.json({
            success: true,
            message: "Email send successfully",
          })                                  
    } catch (error) {
        console.log("Error", error)
        console.log("Error message :", error.message)
        return res.json({
          success: false,
          message: "Something went wrong...",
        })
    }
}



export {contactUs}