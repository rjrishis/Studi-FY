import Course from "../models/course.model.js";
import Section from "../models/section.model.js";
import SubSection from "../models/SubSection.model.js";


const createSection = async (req, res) => {
    try {
        const {sectionName , courseId} = req.body
        if(!sectionName ||!courseId){
            return res.status(400).json({success:false, message:"Name and courseId are required"})
        }
        const newSecton = await Section.create({sectionName})
        const updatedCourse = await Course.findByIdAndUpdate({_id:courseId},
            {$push:{courseContent:newSecton._id}},
            {new:true}
        ).populate({
			path: "courseContent",
			populate: {
				path: "subSection",
			},
		})
		.exec()
        return res.status(200).json({success:true, message:"Section created successfully", updatedCourse})
    } catch (error) {
        console.log("Error while creating section: " + error.message)
        return res.status(500).json({success:false, message:"Something went wrong while creating section",error:error.message})
    }
}

const updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId,courseId } = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);

		const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

		res.status(200).json({
			success: true,
			message: section,
			data:course,
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};



const deleteSection = async (req,res)=>{
    try {

		const { sectionId, courseId }  = req.body;
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
}

export { createSection, updateSection, deleteSection }