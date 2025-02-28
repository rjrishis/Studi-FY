import nodemailer from "nodemailer"

const mailSender = async (email,title,body)=>{
    try {
        let transport = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })
        let info = await transport.sendMail({
            from: "StudiFy || PathShala -By Rishi",
            to:email,
            subject: title,
            html: body
        })
        console.log(info)
        return info;
    } catch (error) {
        console.log(error.message,"something went worng while sending mail")
    }
}

export default mailSender