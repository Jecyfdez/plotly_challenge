// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("static/samples.json").then((data)=>{
    console.log(data);
    var individual = data.samples[0]

    var ids = individual.otu_ids;
    console.log(ids)

    //take top 10 largest sample values
    var sample_values = individual.sample_values.slice(0,10).reverse();
    console.log(sample_values)

    var labels = individual.otu_labels.slice(0,10);
    console.log(labels)
    
    //take top 10 otu_ids reverse to match sample values
    var top_10_otu = (ids.slice(0,10)).reverse();
    console.log(top_10_otu)
})