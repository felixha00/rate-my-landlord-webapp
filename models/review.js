var mongoose = require("mongoose")
var reviewSchema = mongoose.Schema(
  {
    text: String,
    rating: Number,
  }
)
module.exports = mongoose.model("Review", reviewSchema)