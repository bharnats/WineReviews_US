// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
  center:  [37.09, -95.71],
  zoom: 5
});



// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map

L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiYmhhcmF0aHktbmF0cyIsImEiOiJjamUwd2lkdnoweW5tMnhxbDZnMXA5cWk4In0.JzoSJeVUEKTjlRyVZY30fQ." +
    "T6YbdDixkOBWH_k9GbS8JQ"
).addTo(myMap);

var mydata = JSON.parse(data);

 // Creating a new choropleth layer
  geojson = L.choropleth(mydata, {
    // Which property in the features to use
    valueProperty: "MHI",
    // Color scale
    scale: ["#ffffb2", "#b10026"],
    // Number of breaks in step range
    steps: 10,
    // q for quantile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },
    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.COUNTY + " " + feature.properties.State + "<br>Median Household Income:<br>" +
        "$" + feature.properties.MHI);
    }
  }).addTo(myMap);






