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
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: true}))
mongoose.connect("mongodb+srv://zakerl:labeeb_1234@cluster0-bb19c.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true }).then(() =>{
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
app.get("/landlords/new", function(req, res){
  res.sendFile(path.join(__dirname+"/views/landlords/add_review.html"))
})
app.post("/landlords", function(req, res){
  var name = req.body.landlord
  geocoder.geocode(req.body.address, function (err, data) {
    if (err || !data.length) {
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
    var newLandlord = {name: name, location: location, lat: lat, lng: lng};
    // Create a new Landlord and save to DB
    Landlord.create(newLandlord, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to Landlords page
            Review.create(req.body.reviewss, function(err, newReview){
              if(err){
                console.log(err)
              }
              else{
                Landlord.findById(newlyCreated._id, function(err, foundLandlord){
                  console.log(newReview)
                  newReview.save()
                  foundLandlord.reviews.push(newReview)
                  foundLandlord.save()
                })
              }
            })
            console.log(newlyCreated);
            res.redirect("/landlords");
        }
    });
  });
})
app.get("/landlords/results", function(req, res){
  if(req.query.search){
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    Landlord.find({name: regex}).populate("reviews").exec(function(err, foundlords){
      if(err){
          console.log(err)
      }
      else{
          res.render("landlords/foundlords.ejs", {lords:foundlords})
      }
  }) 
  }
})
app.get("/landlords/:id", function(req, res){
  Landlord.findById(req.params.id).populate("reviews").exec(function(err, foundLandlord){
    if(err){
      console.log(err)
    }
    else{
      res.render("./landlords/landlorddd.ejs", {landlord:foundLandlord})
    }
  })
})
app.get("/landlords/:id/reviews/new", function(req, res){
  Landlord.findById(req.params.id, function(err,foundLandlord){
    if(err){
      console.log(err)
    }
    else{
      res.render("./reviews/new.ejs", {landlord:foundLandlord })
    }
  })
})
app.post("/landlords/:id/reviews",function(req, res){
  Landlord.findById(req.params.id,function(err, foundLandlord){
    if(err){
      console.log(err)
    }
    else{
      Review.create(req.body.reviewss, function(err, newReview){
        if(err){
          console.log(err)
        }
        else{
            console.log(newReview)
            newReview.save()
            foundLandlord.reviews.push(newReview)
            foundLandlord.save()
            res.redirect("/landlords/"+ foundLandlord._id )
        }
      })
    }
  })
})
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
app.listen(3000, (req, res)=>{
  console.log("hello world")
})
