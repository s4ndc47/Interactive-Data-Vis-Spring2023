/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7;
const height = 600;
margin = 65

/* LOAD DATA */
const data = [  {activity: "running", count: 730},  {activity: "chasing", count: 279},  {activity: "climbing", count: 658},  {activity: "eating", count: 760},  {activity: "foraging", count: 1435}];

/* SCALES */
// yscale - ordinal, activity
const yScale = d3.scaleBand()
  .domain(data.map(d => d.activity))
  .range([margin, height - margin]) // visual variable
  .padding(0.2);

// xscale - linear, count
const xScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.count)])
  .range([margin, width - margin]);

// colorscale - ordinal, activity
const colorScale = d3.scaleOrdinal()
  .domain(data.map(d => d.activity))
  .range(d3.schemeCategory10);

/* HTML ELEMENTS */
const svg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// bars
const bars = svg.selectAll("rect.bar")
  .data(data)
  .join("rect")
  .attr("class", "bar")
  .attr("height", yScale.bandwidth())
  .attr("width", d => xScale(d.count) - margin)
  .attr("y", d => yScale(d.activity))
  .attr("x", margin)
  .style("fill", d => colorScale(d.activity));

// labels
const labels = svg.selectAll("text")
  .data(data)
  .join("text")
  .attr("class", "label")
  .attr("x", d => xScale(d.count) - 60) // move label to the left of the bar
  .attr("y", d => yScale(d.activity) + yScale.bandwidth() / 2 + 5)
  .attr("fill", "white")
  .text(d => `(${d.count})`); // show both activity and count in the label text


// y-axis
const yAxis = d3.axisLeft(yScale);
svg.append("g")
  .attr("class", "y-axis")
  .style("transform", `translate(${margin}px, 0px)`)
  .call(yAxis);

// y-axis title
svg.append("text")
  .attr("class", "yAxisLabel")
  .attr("y", 10)
  .attr("x", 0 - height/2)
  .attr("transform", "rotate(-90)")
  .text("Activities Type")
  .attr("fill", "black")
  .attr("text-anchor", "middle")

// x-axis
const xAxis = d3.axisBottom(xScale);
svg.append("g")
  .attr("class", "x-axis")
  .style("transform", `translate(0px, ${height - margin}px)`)
  .call(xAxis)

// x-axis title
svg.append("text")
  .attr("class", "xAxisLabel")
  .attr("y", height - margin + 40)
  .attr("x", width/2)
  .text("Activities Count")
  .attr("fill", "black")
  .attr("text-anchor", "middle")
  