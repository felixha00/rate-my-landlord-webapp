var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 56.1304, lng: -106.3468},
    zoom: 8
  });

  var Sentiment = require('sentiment');
var sentiment = new Sentiment();

var docx = sentiment.analyze("I like apples");
console.log(docx);

// Applying to An Array
var mydocx = ["I love apples","I don't eat pepper","the movie was very nice","this book is the best"]

mydocx.forEach(function(s){
	console.log(sentiment.analyze(s));
})
}





