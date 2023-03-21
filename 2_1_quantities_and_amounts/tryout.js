/* CONSTANTS AND GLOBALS */
const width = window.innerWidth *.7;
const height = 600;

/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType)
  .then(data => {
    console.log("data", data)

var data = [{
  type: 'bar',
  x: [20, 14, 23],
  y: ['running', 'chasing', 'climbing','eating','foraging'],
  orientation: 'h'
    }];
    
    Plotly.newPlot("data", data);

  /* SCALES */
  // yscale - linear, count
  const yScale = d3.scaleBand()
    .domain(data.map(d=> d.activity))
    .range([0, height]) // visual variable
    .paddingInner(.2)

  // xscale - categorical, activity
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d=> d.count)])
    .range([0, width])

  /* HTML ELEMENTS */
  // svg
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // bars
  const bars = svg.selectAll("rect")
    .data(data)
    .join("rect")
    .attr("height", yScale.bandwidth())
    .attr("width", d=> xScale(d.count))
    .attr("y", d=>yScale(d.activity))
    .attr("x", 0);

  // labels
  bars.append("text")
    .attr("class", "label")
    .attr("x", d => xScale(d.count) + 5)
    .attr("y", d => yScale(d.activity) + yScale.bandwidth() / 2 + 5)
    .text(d => d.count);

})
