const express = require("express");
const ProductModel = require("./schema");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newProduct = new ProductModel(req.body);
    const { _id } = await newProduct.save();
    res.status(201).send(_id);
  } catch (error) {
    console.log(error);
    res.send("Somethings gone wrong");
  }
});

module.exports = router;
