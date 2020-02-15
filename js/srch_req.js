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
      <div class = m-4>
      <h3>Thomas Hong<h3>
      <h6 class="mb-3">${data.formatted_address}</h6>
      <p class="mb-4">We provide marketing services to startups and small businesses to looking for a partner for their digital media, design-dev, lead generation</p>

      <span class="h5 mb-4">Let's Check what we do actually :</span>
      <ul class="about-list2 my-4">
          <li class="mb-2"><i class="icofont icofont-check-circled"></i> Best Analytics Audits to your site in specific niche</li>

          <li class="mb-2">
              <i class="icofont icofont-check-circled"> </i> Modern Keyword Analysis to keep up to date
          </li>

          <li class="mb-2">
              <i class="icofont icofont-check-circled"> </i> More quality content, social networking and relative sharing
          </li>

          <li class="mb-2">
              <i class="icofont icofont-check-circled"> </i> Social networking and relative sharing More quality content, 
          </li>
      </ul>
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

