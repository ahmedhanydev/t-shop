const mongoose = require("mongoose");
const productModel = require("./productModel");
// const productModel = require("./productModel");

const reviewSchema = mongoose.Schema(
  {
    title: String,
    ratings: {
      type: Number,
      min: [1, "min ratings is 1.0"],
      max: [5, "max ratings is 5.0"],
      required: [true, "ratings is required"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to user "],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to product "],
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name" });
  next();
});
reviewSchema.statics.calcAverageRatingsAndQuantity = async function (
  productId
) {
  const result = await this.aggregate([
    // stage 1
    { $match: { product: productId } },
    // stage 2
    {
      $group: {
        _id: "product",
        avgRatings: { $avg: "$ratings" },
        ratingsQuantity: { $sum: 1 },
      },
    },
  ]);

  if (result.length > 0) {
    await productModel.findByIdAndUpdate(productId, {
      ratingsAverage: result[0].avgRatings,
      ratingsQuantity: result[0].ratingsQuantity,
    });
  } else {
    await productModel.findByIdAndUpdate(productId, {
      ratingsAverage: 0,
      ratingsQuantity: 0,
    });
  }
};

reviewSchema.post("save", async function () {
  await this.constructor.calcAverageRatingsAndQuantity(this.product);
});
reviewSchema.post("remove", async function () {
  await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

const reviewModel = mongoose.model("Review", reviewSchema);

module.exports = reviewModel;
