function Plots(id) {
// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("static/samples.json").then((data)=>{
    console.log(data);
    var individual = data.samples[0]

    var ids = individual.otu_ids;
    console.log(ids)

    var values = individual.sample_values;

    //take top 10 largest sample values and reverse for bar chart
    var sample_values = individual.sample_values.slice(0,10).reverse();
    console.log(sample_values)

    //top 10 labels and reverse for bar chart
    var labels = individual.otu_labels.slice(0,10).reverse();
    console.log(labels)
    
    //take top 10 otu_ids reverse to match sample values and bar chart
    var top_10_otu = (ids.slice(0,10)).reverse();
    var top_otu_id = top_10_otu.map(d => "OTU " + d);
    console.log(top_otu_id)

    //create a trace for the bar chart
    var trace1 = {
        x: sample_values,
        y: top_otu_id,
        text: labels,
        marker: {
        color: top_10_otu},
        type:"bar",
        orientation: "h"
    };
    // create data variable
    var data1 = [trace1];

    // create layout variable to set plots layout
    var layout1 = {
        title: "Top 10 OTU",
        yaxis:{
            tickmode:"linear",
        },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 30
        }
    };

    // create the bar plot
Plotly.newPlot("bar", data1, layout1);

//THE BUBBLE CHART
var trace2 = {
    x: ids,
    y: values,
    mode: "markers",
    marker: {
        size: values,
        color: ids
    },
    text:  labels
};

// set the layout for the bubble plot
var layout2 = {
    xaxis:{title: "OTU ID Bubble Plot"},
    height: 600,
    width: 1000
};

// creating data variable 
var data2 = [trace2];

// create the bubble plot
Plotly.newPlot("bubble", data2, layout2); 

})
}

function getDemographics(id) {
    // read the json file to get data
        d3.json("static/samples.json").then((data)=> {
    // get the metadata info for the demographic panel
            var metadata = data.metadata;
            console.log(metadata)
    
          // filter meta data info by id
           var results = metadata.filter(meta => meta.id.toString() === id)[0];
          // select demographic panel to put data
           var demographics = d3.select("#sample-metadata");
            
         // empty the demographic info panel each time before getting new id info
           demographics.html("");
    
         // grab the necessary demographic data data for the id and append the info to the panel
            Object.entries(results).forEach((key) => {   
                demographics.append("h4").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    // create the function for the change event
    function optionChanged(id) {
        Plots(id);
        getDemographics(id);
    }
    
    // create the function for the initial data rendering
    function init() {
        // select dropdown menu 
        var dropdown = d3.select("#selDataset");
    
        // read the data 
        d3.json("static/samples.json").then((data)=> {
            console.log(data)
    
            // get the id data to the dropdwown menu
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            // call the functions to display the data and the plots to the page
            Plots(data.names[0]);
            getDemographics(data.names[0]);
        });
    }
    
    init();