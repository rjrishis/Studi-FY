import mongoose from "mongoose";

const subSection = new mongoose.Schema({
    title:{
        type:String
    },
    timeDuration:{
        type:String
    },
    description:{
        type:String
    },
    videoUrl:{
        type:String
    }
})

const SubSection = mongoose.model("SubSection", subSection)

export default SubSection;