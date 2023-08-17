const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand required"],
      unique: [true, "Brand must be unique"],
      minLength: [3, "too short Brand name"],
      maxLength: [30, "too long Brand name"],
    },
    nameAr: {
      type: String,
      required: [true, "الماركة مطلوبة"],
      unique: [true, "يجب أن تكون الماركة فريدة"],
      minLength: [3, "اسم الماركة قصير جدا"],
      maxLength: [30, "اسم الماركة طويل جدًا"],
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
// const setImageURL = (doc) => {
//   const imageURL = `${process.env.BASE_URL}/brands/${doc.image}`;
//   doc.image = imageURL;
// };
// brandSchema.post("init", (doc) => {
//   setImageURL(doc);
// });
// brandSchema.post("save", (doc) => {
//   setImageURL(doc);
// });
const BrandModel = mongoose.model("Brand", brandSchema);

module.exports = BrandModel;
