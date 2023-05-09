const width = 700,
  height = 600,
  margin = { top: (window.innerHeight - height) / 2, bottom: 50, left: 20, right: (window.innerWidth - width) / 2 },
  radius = 15;


const formatBillions = (num) => d3.format(".2s")(num).replace(/G/, 'B')
const formatDate = d3.timeFormat("%Y")

let svg;
let xScale;
let yScale;
let yAxis;
let xAxisGroup;
let yAxisGroup;


let state = {
  data: [],
  selection: "All", 
};

/* LOAD DATA */
// + SET YOUR DATA PATH
d3.csv('../data/INDUSTRY-color.csv', d => {
  // use custom initializer to reformat the data the way we want it
  // ref: https://github.com/d3/d3-fetch#dsv
  return {
    year: new Date(+d.Year, 0, 1),
    country: d.Entity,
    population: +d.Population,
    color: d.Type
  }
})
  .then(data => {
    console.log("loaded data:", data);
    state.data = data;
    init();
  });

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  // + SCALES
  xScale = d3.scaleTime()
    .domain(d3.extent(state.data, d => d.year))
    .range([margin.right, width - margin.left])

  yScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.population))
    .range([height - margin.bottom, margin.top])

  // + AXES
  const xAxis = d3.axisBottom(xScale)
    .ticks(8) // limit the number of tick marks showing -- note: this is approximate
  yAxis = d3.axisLeft(yScale)
    .tickFormat(formatBillions)

  // + UI ELEMENT SETUP
  const selectElement = d3.select("#dropdown")

  // add in dropdown options from the unique values in the data
  selectElement.selectAll("option")
    .data([
      // manually add the first value
      "Select a group",
      // add in all the unique values from the dataset
      ...new Set(state.data.map(d => d.country))])
    .join("option")
    .attr("attr", d => d)
    .text(d => d)

  // + SET SELECT ELEMENT'S DEFAULT VALUE (optional)
  selectElement.on("change", event => {
    state.selection = event.target.value
    console.log('state has been updated to: ', state)
    draw(); // re-draw the graph based on this new selection
  });

  // + CREATE SVG ELEMENT
  svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // + CALL AXES
  xAxisGroup = svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(${0}, ${height - margin.bottom})`)
    .style("fill", "white")
    .call(xAxis)

  xAxisGroup.append("text")
    .attr("class", 'xLabel')
    .attr("transform", `translate(${width / 2}, ${35})`)
    .text("Year")

  yAxisGroup = svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${margin.right}, ${0})`)
    .call(yAxis)

  yAxisGroup.append("text")
    .attr("class", 'yLabel')
    .attr("transform", `translate(${-45}, ${height / 2})`)
    .attr("writing-mode", 'vertical-rl')
    .text("Population")

  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this everytime there is an update to the data/state
function draw() {
  // + FILTER DATA BASED ON STATE
  const filteredData = state.data
    .filter(d => d.country === state.selection)

  console.log('filtered data: ' , filteredData)

  const TotalPopulationData = state.data
    .filter(d => d.country === 'Total Population')

  console.log('TotalPopulation:' , TotalPopulationData)

  const tooltip = d3.select(".tooltip");

  const types = {
    click: "Click",
    hover: "Hover",
    mouseover: "Mouseover" // add mouseover type
  };
  

  // + UPDATE SCALE(S), if needed
  yScale.domain([0, d3.max(filteredData, d => d.population)])
  // + UPDATE AXIS/AXES, if needed
  yAxisGroup
    .transition()
    .duration(1000)
    .call(yAxis.scale(yScale))// need to udpate the scale

  // specify line generator function
  const lineGen = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.population))

  const dot = svg.append("circle")
    .attr("r", 8)
    .attr("fill", "black")
    .style("display", "none");

  // + DRAW LINE 
  svg.selectAll(".line")
    .data([filteredData])
    .join("path")
    .attr("class", 'line')
    .attr("fill", "none")
    .attr("stroke-width", 3)
    .attr("stroke", filteredData[0].color)
    .on("mouseover", (event, d) => {
      console.log(d)
      const [x, y] = d3.pointer(event);
      console.log(event)
      const population = yScale.invert(y)
      const year = xScale.invert(x)
      tooltip
        .html(`${Math.round(population)}`)
        .style("display", "block")
        .style("left",`${event.pageX + 10}px`)
        .style("top",`${event.pageY - 20}px`)
      dot
        .attr("cx", x)
        .attr("cy", y)
        .style("display", "block");
    })
    .on("mouseout", () => {
      tooltip.style("display", "none");
      dot.style("display", "none");
    })
    .transition()
    .duration(1000)
    .attr("d", d => lineGen(d))


  // + DRAW AREA
  svg.selectAll(".area")
    .data([filteredData])
    .join("path")
    .attr("class", 'area')
    .attr("fill", filteredData[0].color) // set the fill color of the area
    .attr("fill-opacity", 0.5) // set the opacity of the area fill
    .attr("stroke", "none") // remove the stroke from the area
    .transition()
    .duration(1000)
    .attr("d", d3.area()
      .x(d => xScale(d.year)) // set the x-axis position
      .y0(yScale.range()[0]) // set the starting y-axis position
      .y1(d => yScale(d.population)) // set the ending y-axis position based on the value
    )

 


}

