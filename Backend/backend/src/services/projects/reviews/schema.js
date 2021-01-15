const { Schema, model } = require("mongoose");

const ReviewsSchema = new Schema(
  {
    comment: { type: String, required: true },
    rate: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = model("Reviews", ReviewsSchema);
