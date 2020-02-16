var mongoose = require("mongoose")

var landlordSchema = new mongoose.Schema({
  name: String,
  location: String,
  lat: Number,
  lng: Number,
  reviews:
  [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  rating: Number
})

module.exports = mongoose.model("Landlord", landlordSchema)