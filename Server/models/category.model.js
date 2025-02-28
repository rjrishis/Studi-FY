import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }]
})

const Category = mongoose.model("Category", categorySchema)

export default Category;