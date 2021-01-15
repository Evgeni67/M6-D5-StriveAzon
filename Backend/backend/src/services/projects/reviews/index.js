const express = require("express");
const ReviewsModel = require("./schema");
const reviewsRouter = express.Router();

reviewsRouter.post("/", async (req, res) => {
  try {
    const newReview = new ReviewsModel(req.body);
    const { _id } = await newReview.save();
    res.status(201).send(_id);
  } catch (error) {
    console.log(error);
    res.send("Somethings gone wrong");
  }
});

module.exports = reviewsRouter;
