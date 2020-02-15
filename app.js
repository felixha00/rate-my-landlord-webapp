require("dotenv").config();
const express = require("express");
      path = require("path")
      mongoose = require("mongoose")
      landlord = require("./models/landlords")
      review =  require("./models/review")

app = express();
mongoose.connect("mongodb+srv://"+process.env.MYMONGONAME+":"+process.env.my_mongo_password+"@cluster0-bb19c.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true, useCreateIndex: true }).then(() =>{
  console.log("Connected to DB")
}).catch(err=>{
    console.log("Error:", err.message)
});

app.get("/", function(req, res){
  res.sendFile(path.join(__dirname+"/map.html"))
})
app.get("/about",function(req,res){
  res.sendFile(path.join(__dirname+"/about.html"))
})
app.get("/landlord/new", function(req, res){
  res.render("./landlords/new")
})
app.listen(3000, (req, res)=>{
  console.log("hello world")
})
