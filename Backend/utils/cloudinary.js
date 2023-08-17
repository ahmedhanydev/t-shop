const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const cloudinaryUploadImage = async (fileToUpload) => {
  try {
    const data = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: "auto",
    });
    return data;
  } catch (e) {
    return e;
  }
};

const cloudinaryRemoveImage = async (imagePublicId) => {
  try {
    const result = await cloudinary.uploader.destroy(imagePublicId);
    return result;
  } catch (e) {
    return e;
  }
};

module.exports = {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
};
