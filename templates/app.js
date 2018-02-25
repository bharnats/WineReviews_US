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




