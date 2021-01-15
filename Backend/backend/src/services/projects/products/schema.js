const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: String,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reviews",
      },
    ],
  },
  { timestamps: true }
);

ProductSchema.static(
  "addReviewToProduct",
  async function (productID, reviewID) {
    await ProductModel.findByIdAndUpdate(
      productID,
      {
        $push: {
          reviews: reviewID,
        },
      },
      { runValidators: true, new: true }
    );
  }
);

const ProductModel = model("Products", ProductSchema);

module.exports = ProductModel;
