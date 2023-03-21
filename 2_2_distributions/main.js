/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 40, bottom: 100, left: 60, right: 40 },
  radius = 5;

/* LOAD DATA */
d3.json("../data/IceSales.json", d3.autoType).then(data => {
  console.log(data)

  /* SCALES */
  // xscale  - linear,count
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data.map(d => d.IceCreamSales))])
    .range([margin.left, width - margin.right])

    // yscale - linear,count
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.TemperatureScore)])
    .range([height - margin.bottom, margin.top])

  const colorScale = d3.scaleOrdinal()
    .domain(["Mango", "Strawberry"])
    .range(["orange", "pink"])

  /* HTML ELEMENTS */
  // svg
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // axis scales
  const xAxis = d3.axisBottom(xScale)
  svg.append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(xAxis);
  
  const yAxis = d3.axisLeft(yScale)
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis);

// x-axis title
  svg.append("text")
    .attr("class", "xAxisLabel")
    .attr("y", 440 )
    .attr("x", width/1.5)
    .text("Ice Cream Sales")
    .attr("fill", "black")
    .attr("text-anchor", "end")

// y-axis title
  svg.append("text")
    .attr("class", "yAxisLabel")
    .attr("y", 12)
    .attr("x", 0 - height/2.5)
    .attr("transform", "rotate(-90)")
    .text("Tempurate (°F)")
    .attr("fill", "black")
    .attr("text-anchor", "middle")


// circles
  const dot = svg
    .selectAll("circle")
    .data(data, d => d.BioID) // second argument is the unique key for that row
    .join("circle")
    .attr("cx", d => xScale(d.IceCreamSales))
    .attr("cy", d => yScale(d.Temperature))
    .attr("r", radius)
    .attr("fill", d => colorScale(d.Flavor))

});
