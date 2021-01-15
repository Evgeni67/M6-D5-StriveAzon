const express = require("express");
const CardModel = require("./schema");
const router = express.Router();

router.post("/add-to-card/:productID", async (req, res) => {
    try {
      await CardModel.addProductToCard(
        req.params.productID,
      );
      res.send("added");
    } catch (error) {
      console.log(error);
      res.send("Something broke :(");
    }
  });
module.exports = router;
