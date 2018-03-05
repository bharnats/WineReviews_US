// // select the dom elements and set it to variables(using querySelector) 
// var $tbody = document.querySelector("tbody");
// var $searchBtn = document.getElementById("search");
// var $stateInput = document.querySelector("#state");


// // $searchBtn.addEventListener("click", handleSearchButtonClick);


// function renderTable() {

//     // var url = "/data";
//     Plotly.d3.json('/tabledata', function (error, response) {
//         var input = $stateInput.value.trim().toLowerCase()
//         var wineReviews = response.filter(function(review) {
//             var reviewState = review.province.toLowerCase();
        
//             // If true, add the review to the wineReviews, otherwise don't add it to wineReviews
//             return reviewState === input;
//           });

//         // var wineReviews = response;
//         console.log(wineReviews)
//         $tbody.innerHTML = "";
//         for (var i = 0; i < wineReviews.length; i++) {
//             // Get get the current review object and its fields
//             var review = wineReviews[i];
//             var fields = Object.keys(review);
//             // Create a new row in the tbody, set the index to be i + startingIndex
//             var $row = $tbody.insertRow(i);
//             for (var j = 0; j < fields.length; j++) {
//                 // For every field in the review object, create a new cell at set its inner text to be the current value at the current review's field
//                 var field = fields[j];
//                 var $cell = $row.insertCell(j);
//                 $cell.innerText = review[field];
//             }
//         }
//     })
// }

// function handleSearchButtonClick($stateInput) {
//     // Format the user's search by removing leading and trailing whitespace, lowercase the string
//     var filterState = $stateInput.value.trim().toLowerCase();
  
//     // Set wineReviews to an array of all reviewes whose "state" matches the filter
//     renderTable();
// }

//////////////////////////////////////////////////////////////////////////////////////
/////////// /////////////// ////New Table//// //////////////////// ///////////////////
////////////////////////////////////////////////////////////////////////////////////// 
function init() {
    getData();
};

init();

function getData() {
    // Use a request to grab the entire data set
    Plotly.d3.json("/tabledata", function(error, data) {
        if (error) return console.warn(error);
        // need to set timeout conditional on data loading
        buildTable(data);
    });
};

// function buildGraphdivs(data) {
//     // d3.select("#mapid").remove();
//     d3.select("#rawData").remove();
//     // d3.select("#mapContainer").html('<div id="mapid" class="map" style="width: 100%; height: 800px; border: 3px solid #AAA;"></div>');
//     d3.select("#insertTable").html('<table id="rawData" class="display" style="width: 90%; height: 800px; padding: 4px solid #AAA;"></table>');
//     // buildMap(data);
//     buildTable(data);

// };

function buildTable(data) {
    var tableArray =[];
    for (i = 0; i < data.length; i++) { 
        tableArray.push([data[i]["country"], data[i]["description"], data[i]["points"], data[i]["price"], data[i]["province"], data[i]["region_1"], data[i]["title"], data[i]["variety"], data[i]["winery"]]);
    }
    $(document).ready(function() {
        $('#rawData').DataTable( {
            data: tableArray,
            columns: [
                { title: "Country" },
                { title: "Description" },
                { title: "Points" },
                { title: "Price" },
                { title: "State" },
                { title: "Region" },
                { title: "Title" },
                { title: "Variety" },
                { title: "Winery" },            
            ]
        } );
    } );
};









