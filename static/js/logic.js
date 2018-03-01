// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'

//grab the reference for the html elements
// var $selGrape= document.querySelector("#selectGrape");

// var fragment = document.createDocumentFragment();

// var filterGrape = $selGrape.value;



// // populate the grape names into grape dropdownlist
// var grape = grapes;
// unique_grape =  (Array.from(new Set(grape))).sort();
// unique_grape.forEach(function(item, index) {
//      var opt = document.createElement('option');
//      opt.innerHTML = item;
//      opt.value = item;
//      fragment.appendChild(opt);
//  });

// $selGrape.appendChild(fragment);


// Store our API endpoint inside queryUrl
var queryUrl = '/Data' ;

// Define a markerSize function that will give each city a different radius based on its population
function markerSize(count) {
  return count*5 ;
}

function init(){

  // Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
 
  createFeatures(data.features);

});

}


function createFeatures(wineData) {

   
    // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the region where the wine is produced
    function markers(feature,latlng){
        return new L.CircleMarker(latlng, {
        fillOpacity: 0.75,
        color: "white",
        fillColor: "red",
        // Setting our circle's radius equal to the output of our markerSize function
        // This will make our marker's size proportionate to its population
        radius: markerSize(feature.properties.count)
  })
  }
  function onEachFeature(feature,layer) {
    layer.bindPopup("<h3>" + feature.properties.name +
      "</h3>");
  }

// Create a GeoJSON layer containing the features array on the wine data object
  // Run the onEachFeature function once for each piece of data in the array
  var wines = L.geoJSON(wineData, {
    onEachFeature: onEachFeature,
    pointToLayer: markers
  });
 

  // Sending our wines layer to the createMap function
  createMap(wines);
}


function createMap(wines) {
 

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiYmhhcmF0aHktbmF0cyIsImEiOiJjamU3aXM2cGUwMmtwMnFtOTN5MDhjczZyIn0.9ut3uBM4gESQJwFIOzwj4Q." +
    "T6YbdDixkOBWH_k9GbS8JQ");

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiYmhhcmF0aHktbmF0cyIsImEiOiJjamU3aXM2cGUwMmtwMnFtOTN5MDhjczZyIn0.9ut3uBM4gESQJwFIOzwj4Q." +
    "T6YbdDixkOBWH_k9GbS8JQ");

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };


  // Create overlay object to hold our overlay layer 
  var overlayMaps = {
    "Wines": wines
    
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap,wines]
  });
  

// Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

init();




