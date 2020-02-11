const width = 550, height = 550;
const path = d3.geoPath();

// Le Havre, Paris, Strasbourg, Villeurbanne, Marseille, Cannes


const projection = d3.geoConicConformal()
    .center([2.454071, 46.279229])
    .scale(2600)
    .translate([width / 2, height / 2]);

path.projection(projection);


var t = d3.transition()
    .duration(750)
    .ease(d3.easeLinear);


const svg = d3.select('#map').append("svg")
    .attr("id", "svg")
    .attr("width", width)
    .attr("height", height);


const france = svg.append("g")
const regs = svg.append("g")
const cities = svg.append("g")


// d3.json('france.json')
//     .then(geojson => {
//         france.selectAll("path")
//             .data(geojson.features)
//             .enter()
//             .append("path")
//             .attr("d", path)
//             .attr("fill", "white")
//             .attr("stroke-width", 4)
//             .attr("stroke", "black")
//     })


d3.json('regions-05.json').then(function(geojson){
    regs.selectAll("path")
    .data(geojson.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "white")
        .attr("stroke-width",2 )
        .attr("stroke", "black")
})



d3.json('newMainCities.json').then(function (geojson) {


    cities.selectAll("image")
        .data(geojson.features)
        .enter()
        .append("svg:image")
        .transition(t)
        .attr("x", d => { 
            console.log("p", projection(d.geometry.coordinates[0][0]));
            console.log('"p"', d.properties.nom)

         return projection(d.geometry.coordinates[0][0])[0] })
        .attr("y", d => { return projection(d.geometry.coordinates[0][0])[1] })
        .attr("href", "grocery.svg")
        .attr("width", "30px")
        .attr("height", "30px")



})


// tooltip 





