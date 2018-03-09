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









