import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// const uploadOnCloudinary = async (file , folder , height , quality) => {
//     const options = {folder}
//     if(height){
//         options.height = height
//     }
//     if(quality){
//         options.quality = quality
//     }
//     options.resource_type = "auto"

//     return await cloudinary.uploader.upload(file.tempFilePath , options)

// }

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath){
            console.log("No file provided.")
            return null
        }
        const response = await cloudinary.uploader.upload(localFilePath  , {resource_type:"auto"})
        console.log("Data has been successfully uploaded on cloudinary and your required url is :", response.url)
        fs.unlinkSync(localFilePath)
        console.log("response data is:" , response)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}

export {uploadOnCloudinary}



// const uploadOnCloudinary = async (localFilePath) => {
//     try {

//         if (!localFilePath) return null
//         console.log(localFilePath)
//         const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" })
//         console.log("Data has been successfully uploaded on cloudinary and your required url is :", response.url)
//         fs.unlinkSync(localFilePath)
//         return response
//     } catch (error) {
//         fs.unlinkSync(localFilePath)
//         return null
//     }
// }

// const deleteFromCloudinary = async (publicId) => {
//     try {
//         if (!publicId) {
//             console.log("No public ID provided for deletion.");
//             return null;
//         }

//         console.log("Attempting to delete publicId:", publicId);
//         const destroyResponse = await cloudinary.uploader.destroy(publicId, { resource_type: "image" });

//         // Check if destroyResponse is null or if it doesn't contain the expected structure
//         if (!destroyResponse) {
//             console.log("No response from Cloudinary for deletion.");
//             return null;
//         }

//         console.log("Destroy Response:", destroyResponse);
//         return destroyResponse;
//     } catch (error) {
//         console.error("Error during deletion from Cloudinary:", error);
//         return null;
//     }
// };


// export { uploadOnCloudinary ,deleteFromCloudinary}