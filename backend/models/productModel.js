const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "product title is required"],
      trim: true,
      minLength: [3, "too short product title"],
      maxLength: [100, "too long product title"],
    },
    titleAr: {
      type: String,
      required: [true, "اسم المنتج مطلوب"],
      trim: true,
      minLength: [3, "اسم المنتج قصير جدا "],
      maxLength: [100, "اسم المنتج طويل جدا "],
    },

    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "product description is required"],
      minLength: [20, "too short product description"],
      maxLength: [2000, "too long product description"],
    },
    descriptionAr: {
      type: String,
      required: [true, "وصف المنتج مطلوب"],
      minLength: [20, "وصف المنتج قصير جدا"],
      maxLength: [2000, "وصف المنتج طويل جدا "],
    },
    quantity: {
      type: Number,
      required: [true, "product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "product price is required"],
      trim: true,
      max: [200000, "too long product price"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],
    imageCover: {
      public_id: String,
      url: String,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "product category is required"],
    },
    subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above or equal 1"],
      max: [5, "Rating must be below or equal 5"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  }
);
// mongoose query middleware
productSchema.pre(/^find/, function (next) {
  this.populate([
    {
      path: "category",
      select: "name",
    },
    {
      path: "brand",
      select: "name",
    },
  ]);
  next();
});

// const setImageURL = (doc) => {
//   if (doc.imageCover) {
//     const imageURL = `${process.env.BASE_URL}/products/${doc.imageCover}`;
//     doc.imageCover = imageURL;
//   }
//   if (doc.images) {
//     const imagesList = [];
//     doc.images.forEach((image) => {
//       const imageURL = `${process.env.BASE_URL}/products/${image}`;
//       imagesList.push(imageURL);
//     });

//     doc.images = imagesList;
//   }
// };

productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});
// productSchema.post("init", (doc) => {
//   setImageURL(doc);
// });
// productSchema.post("save", (doc) => {
//   setImageURL(doc);
// });

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
