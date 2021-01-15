const { Schema, model } = require("mongoose");

const ReviewsSchema = new Schema(
  {
    "name": {type:String,required:true}, 
    "comment": {type:String,required:true}, 
        "rate": {type:String,required:true}
  },
  { timestamps: true }
);

module.exports = model("Reviews", ReviewsSchema);
