const mongoose = require("mongoose");
const { cloudinaryUploadImage } = require("../utils/cloudinary");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"],
      unique: [true, "Category must be unique"],
      minLength: [3, "too short category name"],
      maxLength: [30, "too long category name"],
    },
    nameAr: {
      type: String,
      required: [true, "الفئة مطلوبة"],
      unique: [true, "يجب أن تكون الفئة فريدة"],
      minLength: [3, "اسم فئة قصير جدا"],
      maxLength: [30, "اسم فئة طويل جدًا"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      public_id: String,
      url: String,
    },
    // image: String,
  },
  { timestamps: true }
);

const setImageURL = async (doc) => {
  const imageURL = `${process.env.BASE_URL}/categories/${doc.image}`;
  const result = await cloudinaryUploadImage(imageURL);
  console.log(result);
  doc.image = result;
};
// const setImageURL = async (doc) => {
//   const imageURL = `${process.env.BASE_URL}/categories/${doc.image}`;

//   console.log(myCloud);
//   doc.image.public_id = myCloud.public_id;
//   doc.image.url = myCloud.secure_url;
// };
// categorySchema.post("init", (doc) => {
//   setImageURL(doc);
// });
// categorySchema.post("save", (doc) => {
//   setImageURL(doc);
// });
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
