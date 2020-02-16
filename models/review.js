var mongoose = require("mongoose")
var reviewSchema = new mongoose.Schema(
  {
    text: String,
    rating: Number,
  }
)
module.exports = mongoose.model("Review", reviewSchema)