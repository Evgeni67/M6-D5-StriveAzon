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

router.get("/", async (req, res) => {
  try {
    const allProducts = await ProductModel.find();
    res.send(allProducts);
  } catch (error) {
    console.log(error);
    res.send("Somethings Gone Wrong");
  }
});

router.get("/:productID", async (req, res) => {
  try {
    const selectedProduct = await ProductModel.findById(req.params.productID);
    res.send(selectedProduct);
  } catch (error) {
    console.log(error);
    res.send("Somethings Gone Wrong");
  }
});

router.get("/:productID", async (req, res) => {
  try {
    const modifiedProduct = await ProductModel.findByIdAndUpdate(
      req.params.productID,
      req.body,
      { runValidators: true, new: true }
    );
    res.send(modifiedProduct);
  } catch (error) {
    console.log(error);
    res.send("Somethings Gone Wrong");
  }
});

module.exports = router;
