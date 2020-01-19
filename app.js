const width = 550, height = 550;
const path = d3.geoPath();


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
const cities = svg.append("g")
const msg = svg.append("g")
const line = svg.append("g")

d3.json('france-simplified.json')
    .then(geojson => {
        france.selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", "white")
            .attr("stroke-width", 4)
            .attr("stroke", "black")
    })

// const regs = svg.append("g")
// d3.json('regions-simplified.json').then(function(geojson){
//     regs.selectAll("path")
//     .data(geojson.features)
//         .enter()
//         .append("path")
//         .attr("d", path)
//         .attr("fill", "white")
//         .attr("stroke-width",4 )
//         .attr("stroke", "black")
// })

const adv = [
    { text: 'first adv', color: 'white', bg: 'blue' },
    { text: 'second adv', color: 'blue', bg: 'white' },
    { text: 'third adv', color: 'white', bg: 'red' },
]



msg.selectAll("rect")
    .data(adv)
    .enter()
    .append("rect")
    .transition(t)
    .attr("x", (d, i) => '175px')
    .attr("y", (d, i) => 140 + 50 * (i + 1) + 'px')
    .attr("fill", d => d.bg)
    .attr("width", '180px')
    .attr("height", '45px')
    .text(d => d.text)

msg.selectAll("text")
    .data(adv)
    .enter()
    .append("text")
    .transition(t)
    .attr("x", (d, i) => '215px')
    .attr("y", (d, i) => 180 + 50 * (i + 1) + 'px')
    .attr("fill", d => d.color)
    .attr("stroke-width", 2)
    .text(d => d.text)
    .style('font-size', d => '24px')

d3.json('mainCities.json').then(function (geojson) {

    // cities.selectAll("circle")
    // .data(geojson.features)
    //     .enter()
    //     .append("circle")
    //     .attr("cx", d=> {  console.log("p",projection(d.geometry.coordinates[0][0])) ;  return  projection(d.geometry.coordinates[0][0])[0] })
    //     .attr("cy", d=> { return  projection(d.geometry.coordinates[0][0])[1]})
    //     .attr("r", 8)
    //     .attr("fill", "red")

    cities.selectAll("image")
        .data(geojson.features)
        .enter()
        .append("svg:image")
        .attr("x", d => { console.log("p", projection(d.geometry.coordinates[0][0])); return projection(d.geometry.coordinates[0][0])[0] })
        .attr("y", d => { return projection(d.geometry.coordinates[0][0])[1] })
        .attr("href", "grocery.svg")
        .attr("width", "30px")
        .attr("height", "30px")
        .attr("stroke", "blue")


        .on("mouseover", function (d) {
            div.transition()
                .duration(200)
                .style("opacity", 1);
            div.html("ville : " + d.properties.nom + "<br/>"
                + "Notre magasin : " + d.properties.shopName + "<br/>"
                + d.properties.address)
                .style("left", "550px")
                .style("top", (d3.event.pageY - 30) + "px")


            line
                .append("line")
                .attr("x1", (d3.event.pageX))
                .attr("y1", (d3.event.pageY - 8))
                .attr("x2", 550)
                .attr("y2", (d3.event.pageY - 8))
                .attr("stroke-width", 2)
                .attr("stroke", "blue");

        })
        .on("mouseout", function (d) {
            div.style("opacity", 0);
            div.html("")
                .style("left", "-500px")
                .style("top", "-500px");
            line.selectAll("line").remove()
        });

})


// tooltip 

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);






