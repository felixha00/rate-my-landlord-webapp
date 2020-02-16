require("dotenv").config();
const express = require("express");
      path = require("path")
      mongoose = require("mongoose")
      bodyParser = require("body-parser")
      Landlord = require("./models/landlords")
      Review =  require("./models/review")
      NodeGeocoder = require('node-geocoder')

var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
var geocoder = NodeGeocoder(options);      
app = express();
app.use(bodyParser.urlencoded({extended: true}))
mongoose.connect("mongodb+srv://"+process.env.MYMONGONAME+":"+process.env.my_mongo_password+"@cluster0-bb19c.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true, useCreateIndex: true }).then(() =>{
  console.log("Connected to DB")
}).catch(err=>{
    console.log("Error:", err.message)
});

app.get("/", function(req, res){
  res.redirect("/landlords")
})
app.get("/landlords", function(req, res){
  res.sendFile(path.join(__dirname+"/map.html"))
})
app.get("/about",function(req,res){
  res.sendFile(path.join(__dirname+"/about.html"))
})
app.get("/landlord/new", function(req, res){
  res.sendFile(path.join(__dirname+"/views/landlords/add_review.html"))
})
app.post("/landlords", function(req, res){
  var name = req.body.landlord
  var review = req.body.review
  var rating = req.body.rating
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
    var newLandlord = {name: name, address: location, lat: lat, lng: lng,rating: rating};
    // Create a new Landlord and save to DB
    Landlord.create(newLandlord, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to Landlords page
            Review.create(review, function(err, newReview){
              if(err){
                console.log(err)
              }
              else{
                console.log(newReview)
                newlyCreated.reviews.push(newReview)
                newlyCreated.save()
              }
            })
            console.log(newlyCreated);
            res.redirect("/landlords");
        }
    });
  });
})
app.listen(3000, (req, res)=>{
  console.log("hello world")
})
