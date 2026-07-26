const cloudinary = require("cloudinary").v2;
const ApiError = require("./apiError");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const isConfigured = () =>
  Boolean(
    process.env.CLOUD_NAME &&
      process.env.CLOUD_API_KEY &&
      process.env.CLOUD_API_SECRET
  );

// Throws rather than returning the error object: callers read `.public_id` and
// `.secure_url` off the result, so returning an error here would silently
// persist a document with an undefined image.
const cloudinaryUploadImage = async (fileToUpload) => {
  if (!isConfigured()) {
    throw new ApiError(
      "Image upload is not configured: set CLOUD_NAME, CLOUD_API_KEY and CLOUD_API_SECRET",
      500
    );
  }
  const data = await cloudinary.uploader.upload(fileToUpload, {
    resource_type: "auto",
  });
  return data;
};

const cloudinaryRemoveImage = async (imagePublicId) => {
  if (!isConfigured()) {
    throw new ApiError(
      "Image upload is not configured: set CLOUD_NAME, CLOUD_API_KEY and CLOUD_API_SECRET",
      500
    );
  }
  const result = await cloudinary.uploader.destroy(imagePublicId);
  return result;
};

module.exports = {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
};
