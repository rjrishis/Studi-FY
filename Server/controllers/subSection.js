import Section from "../models/section.model.js";
import SubSection from "../models/SubSection.model.js";
import { uploadOnCloudinary } from "../utils/uploadToCloudinary.js";


const createSubSection = async (req, res) => {
    try {
        const {title , timeDuration , description , sectionId } = req.body
        const video = req.file.path
        if(!title  ||!description ||!video){
            return res.status(400).json({success:false, message:"All fields are required"})
        }
        const videoUrl = await uploadOnCloudinary(video)
        const newSubSection = await SubSection.create({title, timeDuration , description , videoUrl:videoUrl.secure_url})
        const updateSection = await Section.findByIdAndUpdate(sectionId , {$push:{subSection:newSubSection._id}},{new:true}).populate("subSection")
        console.log(updateSection)
        return res.status(200).json({success:true, message:"Subsection created successfully", subsection:updateSection})
    } catch (error) {
        console.log("Error while creating SubSection")
        return res.status(500).json({success:false, message:"Something went wrong while creating Subsection", error:error.message})
    }
}

const updateSubSection = async (req, res) => {
    try {
      const { sectionId, subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.file && req.file.path !== undefined) {
        const video = req.file.path
        const uploadDetails = await uploadOnCloudinary(video)
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      // find updated section and return it
      const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      )
  
      console.log("updated section", updatedSection)
  
      return res.json({
        success: true,
        message: "Section updated successfully",
        data: updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }

const deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  
      // find updated section and return it
      const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      )
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
        data: updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }

export { createSubSection, updateSubSection, deleteSubSection }