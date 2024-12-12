const cloudinary = require("cloudinary").v2
require("dotenv").config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET, // Click 'View Credentials' below to copy your API secret
})

const uploadImageOnCloudinary = async (imagePath) => {
  if (!imagePath) {
    return null
  }
  try {
    const uploadedImage = await cloudinary.uploader.upload(imagePath, {
      resource_type: "auto",
    })
    return uploadedImage.secure_url
  } catch (error) {
    return res.json({error})
  }
}

module.exports = uploadImageOnCloudinary
