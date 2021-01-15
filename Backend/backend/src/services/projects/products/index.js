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
    const allProducts = await ProductModel.find().populate("reviews");
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

router.put("/:productID", async (req, res) => {
  try {
    const modifiedProduct = await ProductModel.findByIdAndUpdate(
      req.params.productID,
      req.body,
      { runValidators: true, new: true }
    );
    if (modifiedProduct) {
      res.send(modifiedProduct);
    } else {
      res.send("Product not found in database");
    }
  } catch (error) {
    console.log(error);
    res.send("Somethings Gone Wrong");
  }
});

router.delete("/:productID", async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(
      req.params.productID
    );
    if (deletedProduct) {
      res.send("Product deleted from database");
    } else {
      res.send("Product not found in database");
    }
  } catch (error) {
    console.log(error);
    res.send("Somethings Gone Wrong");
  }
});

module.exports = router;
