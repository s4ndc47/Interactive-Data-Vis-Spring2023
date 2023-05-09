/* CONSTANTS AND GLOBALS */
const width = 800,
  height = 700,
  margin = { top: (window.innerHeight - height) / 2, bottom: (window.innerHeight - height) / 2, left: (window.innerWidth - width) / 2, right: (window.innerWidth - width) / 2 },
  radius = 15;

/*
this extrapolated function allows us to replace the "G" with "B" min the case of billions.
we cannot do this in the .tickFormat() because we need to pass a function as an argument,
and replace needs to act on the text (result of the function).
*/
const formatBillions = (num) => d3.format(".2s")(num).replace(/G/, 'B')
const formatDate = d3.timeFormat("%Y")

// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;
let yAxis;
let xAxisGroup;
let yAxisGroup;

/* APPLICATION STATE */
let state = {
  data: [],
  selection: "All", // + YOUR FILTER SELECTION
};

/* LOAD DATA */
// + SET YOUR DATA PATH
d3.csv('../data/LanguageSpokenAtHome.csv', d => {
  // use custom initializer to reformat the data the way we want it
  // ref: https://github.com/d3/d3-fetch#dsv
  return {
    year: d.Year,
    group: d.group,
    population: +d.Population,
    color: d.Type
  }

  subgroups = data.columns.slice(1)
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
  xScale = d3.scaleBand()
    .domain(d3.extent(state.data, d => d.group))
    .range([0, width])
    .padding([0.2])


  yScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.population))
    .range([height - margin.bottom, margin.top])

  // + AXES
  const xAxis = d3.axisBottom(xScale)
    .ticks(6) // limit the number of tick marks showing -- note: this is approximate
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
      ...new Set(state.data.map(d => d.year))])
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
    .filter(d => d.group === state.selection)

  console.log('filtered data: ' , filteredData)

  // const TotalPopulationData = state.data
    // .filter(d => d.group === 'Total Population')

  // console.log('TotalPopulation:' , TotalPopulationData)


  // + UPDATE SCALE(S), if needed
  yScale.domain([0, d3.max(filteredData, d => d.population)])
  // + UPDATE AXIS/AXES, if needed
  yAxisGroup
    .transition()
    .duration(1000)
    .call(yAxis.scale(yScale))// need to udpate the scale

  // specify line generator function
  const lineGen = d3.line()
    .x(d => xScale(d.group))
    .y(d => yScale(d.population))

    
  // + DRAW LINE 
  svg.selectAll(".line")
    .data([filteredData])
    .join("path")
    .attr("class", 'line')
    .attr("fill", "none")
    .attr("stroke-width", 3)
    .attr("stroke", filteredData[0].color)
    .attr("d", d => lineGen(d))



 


}

