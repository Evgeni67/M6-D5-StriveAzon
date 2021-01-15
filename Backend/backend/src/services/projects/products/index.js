const express = require("express");
const ProductModel = require("./schema");
const multer = require("multer");

const cloudinary = require("../../lib/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "m6d5",
  },
});
const cloudinaryMulter = multer({ storage: storage });

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
    const selectedProduct = await ProductModel.findById(
      req.params.productID
    ).populate("reviews");
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

router.post("/:productID/add-review/:reviewID", async (req, res) => {
  try {
    await ProductModel.addReviewToProduct(
      req.params.productID,
      req.params.reviewID
    );
    res.send("added");
  } catch (error) {
    console.log(error);
    res.send("Something broke :(");
  }
});

router.post(
  "/:productID/upload",
  cloudinaryMulter.single("productImage"),
  async (req, res) => {
    try {
      const modifiedProduct = await ProductModel.findByIdAndUpdate(
        req.params.productID,
        { imgUrl: req.file.path },
        { runValidators: true, new: true }
      );
      if (modifiedProduct) {
        res.send(modifiedProduct);
      } else {
        res.send("Product not found in database");
      }
    } catch (error) {
      console.log(error);
      res.send("Something broke :(");
    }
  }
);

module.exports = router;
