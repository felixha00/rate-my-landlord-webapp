// Call Geocode
    //geocode();

    // Get location form
    var locationForm = document.getElementById('location-form');

    // Listen for submiot
    locationForm.addEventListener('submit', geocode);

    function geocode(e){
      // Prevent actual submit
      e.preventDefault();

      var location = document.getElementById('location-input').value;

      axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
        params:{
          address:location,
          key:'AIzaSyCqLAmRG0zNVBs_IBTdcIxJvlyXt4B6cM0'
        }
      })
      .then(function(response){
        // Log full response
        console.log(response);

        // Formatted Address
        var formattedAddress = response.data.results[0].formatted_address;
        
        var formattedAddressOutput = `
          <ul class="list-group">
            <li class="list-group-item">${formattedAddress}</li>
          </ul>
        `;

        // Address Components
        var addressComponents = response.data.results[0].address_components;
        var addressComponentsOutput = '<ul class="list-group">';
        for(var i = 0;i < addressComponents.length;i++){
          addressComponentsOutput += `
            <li class="list-group-item"><strong>${addressComponents[i].types[0]}</strong>: ${addressComponents[i].long_name}</li>
          `;
        }
        addressComponentsOutput += '</ul>';

        // Geometry

        
        //var data = JSON.parse(response.data.results[0]);

        placeMarker(response.data.results[0]);  
      })
      .catch(function(error){
        console.log(error);
      });
    }



function placeMarker(data){

    var lat = data.geometry.location.lat;
    var lng = data.geometry.location.lng;

    var myLatLng = { lat: lat, lng: lng }
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 17,
        center: myLatLng
      });


      var contentString = `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <style>
      .checked {
        color: orange;
      }
      </style>
      <div class = m-4>
      <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
      <h3 class="mt-3">Thomas Hong<h3>
      <h6 class="mb-3 border-bottom pb-2">${data.formatted_address}</h6>
      <button type="moreInfo" class="btn btn-primary" type="button">More Info</button>
      
      <div>
      
      
      
      
      `;

    var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: "Hello World!"
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  
}

