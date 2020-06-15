var newData = [{
    count: 7815893,
    emote: "Australia"
  }, {
    count: 91176172,
    emote: "North America"
  }, {
    count: 142804408,
    emote: "Europe"
  },
]
// Define size & radius of donut pie chart
var width = 650,
  height = 800,
  radius = Math.min(width, height) / 2.5;
// Define arc colours
var colour = d3.scale.category20();
// Define arc ranges
var arcText = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1, .3);
// Determine size of arcs
var arc = d3.arc()
  .innerRadius(radius - 130)
  .outerRadius(radius - 10);
// Create the donut pie chart layout
var pie = d3.layout.pie()
  .value(function(d) {
    return d.count;
  })
  .sort(null);
// Append SVG attributes and append g to the SVG
var mySvg = d3.select('svg g')
  .attr("width", width)
  .attr("height", height);
var svg = mySvg
  .append("g")
  .attr("transform", "translate(1000,260)");
var svgText = mySvg
  .append("g")
  .attr("transform", "translate(" + radius + "," + radius + ")");
// Define inner circle
svg.append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 0)
  .attr("fill", "white");
// Calculate SVG paths and fill in the colours
var g = svg.selectAll(".arc")
  .data(pie(newData))
  .enter().append("g")
  .attr("class", "arc");
// Append the path to each g
g.append("path")
  .attr("d", arc)
  .attr("fill", function(d, i) {
    return colour(i);
  });
var textG = svg.selectAll(".labels")
  .data(pie(newData))
  .enter().append("g")
  .attr("class", "labels");
// Append text labels to each arc
textG.append("text")
  .attr("transform", function(d) {
    return "translate(" + arc.centroid(d) + ")";
  })
  .attr("dy", ".35em")
  .style("text-anchor", "middle")
  .attr("fill", "#fff")
  .text(function(d, i) {
    return d.data.count > 0 ? d.data.emote : '';
  });
var legendG = mySvg.selectAll(".legend")
  .data(pie(newData))
  .enter().append("g")
  .attr("transform", function(d,i){
    return "translate(" + (1400 - 110) + "," + (i * 15 + 20) + ")";
  })
  .attr("class", "legend");   
legendG.append("rect")
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", function(d, i) {
    return colour(i);
  });
legendG.append("text")
  .text(function(d){
    return d.value.toLocaleString() + "  " + "Gallons of Product";
  })
  .style("font-size", 16 ) 
  .attr("y", 10)
  .attr("x", 11);











