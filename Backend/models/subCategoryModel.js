const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "subCategory required"],
      unique: [true, "subCategory must be unique"],
      minLength: [2, "too short subcategory name"],
      maxLength: [32, "too long subcategory name"],
    },
    nameAr: {
      type: String,
      trim: true,
      required: [true, "اسم التصنيف الفرعي مطلوبة "],
      unique: [true, "يجب أن تكون التصنيف الفرعي فريدة "],
      minLength: [2, "اسم التصنيف الفرعي قصير جدا"],
      maxLength: [32, "اسم التصنيف الفرعي طويل جدًا"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must be belong to parent category"],
    },
  },
  { timestamps: true }
);

const subCategoryModel = mongoose.model("SubCategory", subCategorySchema);

module.exports = subCategoryModel;
