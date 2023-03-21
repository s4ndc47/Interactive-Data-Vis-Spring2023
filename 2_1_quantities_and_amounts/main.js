

/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .9;
const height = 600;

/* LOAD DATA */
const data = [  {activity: "running", count: 730},  {activity: "chasing", count: 279},  {activity: "climbing", count: 658},  {activity: "eating", count: 760},  {activity: "foraging", count: 1435}];

/* SCALES */
// yscale - ordinal, activity
const yScale = d3.scaleBand()
  .domain(data.map(d => d.activity))
  .range([height, 0]) // visual variable
  .paddingInner(.2);

// xscale - linear, count
const xScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.count)])
  .range([0, width]);

// colorscale - ordinal, activity
const colorScale = d3.scaleOrdinal()
  .domain(data.map(d => d.activity))
  .range(d3.schemeCategory10);

/* HTML ELEMENTS */



// svg
const svg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// bars
const bars = svg.selectAll("rect")
  .data(data)
  .join("rect")
  .attr("height", yScale.bandwidth())
  .attr("width", d => xScale(d.count))
  .attr("y", d => yScale(d.activity))
  .attr("x", 0)
  .style("fill", d => colorScale(d.activity));

// labels
const labels = svg.selectAll("text")
  .data(data)
  .join("text")
  .attr("class", "label")
  .attr("x", d => xScale(d.count) - 120) // move label to the left of the bar
  .attr("y", d => yScale(d.activity) + yScale.bandwidth() / 2 + 5)
  .attr("fill", "white")
  .text(d => `${d.activity} (${d.count})`); // show both activity and count in the label text


// y-axis
const yAxis = d3.axisLeft(yScale);
svg.append("g")
  .attr("class", "y-axis")
  .call(yAxis);

  