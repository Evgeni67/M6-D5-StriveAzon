const { Schema, model } = require("mongoose");

const CardsSchema = new Schema(
  {
    productsInCard: [
        {
          type: Schema.Types.ObjectId,
          ref: "Products",
        },
      ],
  },
  { timestamps: true }
);
CardsSchema.static(
     "addProductToCard",
     async function (productID) {
console.log("in")

       await CardsSchema.findByIdAndUpdate(
        "6001ae9abebccd62689d2880",
        {
          $push: {
             productsInCard: productID
           },
         },
        { runValidators: true, new: true }
       );
     }
   );
module.exports = model("Cards", CardsSchema);
