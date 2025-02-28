import dotenv from "dotenv"
dotenv.config({path:"./.env"})
import express from "express"
const app = express()

import userRoutes from "./routes/user.route.js"
import profileRoutes from "./routes/profile.route.js"
import paymentRoutes from "./routes/payment.route.js"
import courseRoutes from "./routes/course.route.js"
import contactRoutes from "./routes/contact.route.js"

import database from "./config/database.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { cloudinaryConnect } from "./config/cloudindary.js"
import fileUpload from "express-fileupload"
import dbConnect from "./config/database.js"
// import { contactUs } from "./controllers/contactUs.js"

const PORT = process.env.PORT || 4000

await dbConnect();

app.use(express.json());
app.use(cookieParser())
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
))
// app.use(fileUpload({
//     useTempFiles:true,
//     tempFileDir:"/temp"
// }))

cloudinaryConnect();

app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/profile",profileRoutes)
app.use("/api/v1/course",courseRoutes)
app.use("/api/v1/payment",paymentRoutes)
app.use("/api/v1/reach",contactRoutes)

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running..."
    })
})

app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})