function init() {
  buildMap();
};

init();

function buildMap() {

    // Creating map object
  var myMap = L.map("map", {
    center: [38.32, -95.67],
    zoom: 4.1,
    minZoom: 3,
    maxZoom: 10,
  });
  // Mapbox API
  var mapbox = "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
      "access_token=pk.eyJ1IjoiYmhhcmF0aHktbmF0cyIsImEiOiJjamRoa2RrdHcwem12MndvMXpmM2Z5YnM1In0.4zch_H0WTdg4af5YTLvImg." +
      "T6YbdDixkOBWH_k9GbS8JQ";

  console.log(mapbox);

  // Adding tile layer to the map
  L.tileLayer(mapbox).addTo(myMap)

  // API Query URL
  var url = '/cluster_data';
  console.log(url);

  // Grabbing the data with d3..
  Plotly.d3.json(url, function(error, response) {
    if (error) return console.warn(error);

    // Creating a new marker cluster group
    var markers = L.markerClusterGroup();

    // Loop through our data...
    for (var i = 0; i < response.length; i++) {
      // set the data location property to a variable
      var location= response[i].coordinates;
  console.log(location);
      // If the data has a location property...
      if (location) {

        // Add a new marker to the cluster group and bind a pop-up
        markers.addLayer(L.marker([location[0], location[1]])
          .bindPopup(("<h3># grape variety: " +response[i].variety_count +
        "</h3><hr><h3> region: " + response[i].region + "</h3>") ));
      }

    }
  // Add our marker cluster layer to the map
    myMap.addLayer(markers);

  });

}


