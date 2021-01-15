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
reviewsRouter.get("/", async (req, res) => {
  try {
    const allReviews = await ReviewsModel.find();
    res.status(201).send(allReviews);
  } catch (error) {
    console.log(error);
    res.send("Somethings gone wrong");
  }
});
reviewsRouter.get("/:_id", async (req, res) => {
  try {
    const id = req.params._id
    const selectedReview = await ReviewsModel.findById(id);
    if(selectedReview){
      res.status(201).send(selectedReview);
    }else{
      res.status(404).send("Not found");
    }
    
  } catch (error) {
    console.log(error);
    res.send("Somethings gone wrong");
  }
});
reviewsRouter.delete("/:_id", async (req, res) => {
  try {
    const id = req.params._id
    const allReviews = await ReviewsModel.findByIdAndDelete(id);
    res.status(201).send("Deleted");
  } catch (error) {
    console.log(error);
    res.send("Somethings gone wrong");
  }
});
reviewsRouter.put("/:_id", async (req, res) => {
  try {
    const id = req.params._id
    const updatedReview = await ReviewsModel.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
    res.status(201).send(updatedReview);
  } catch (error) {
    console.log(error);
    res.send("Somethings gone wrong");
  }
});
module.exports = reviewsRouter;
