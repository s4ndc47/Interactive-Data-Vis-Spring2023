/* CONSTANTS AND GLOBALS */
const width = 1200,
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
d3.csv('../data/GenderIncomeGap-color.csv', d => {
  return {
    year: new Date(+d.Year, 0, 1),
    sex: d.Sex,
    income: +d.Income,
    color: d.Color
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
    .ticks(6) // limit the number of tick marks showing -- note: this is approximate
  yAxis = d3.axisLeft(yScale)
    .tickFormat(formatBillions)


  // + CREATE SVG ELEMENT
  svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

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

    yAxisGroup = svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${margin.right}, ${500})`)
    .call(yAxis)

  yAxisGroup.append("text")
    .attr("class", 'yLabel')
    .attr("transform", `translate(${-45}, ${height / 2})`)
    .attr("writing-mode", 'vertical-rl')
    .text("Income")

  // Set up the line generators for the male and female data series
  const lineMale = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.income))
    .defined(d => d.sex === "Male");

  const lineFemale = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.income))
    .defined(d => d.sex === "Female");

  // LINE GENERATOR FUNCTION
  const lineGen = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.income));

    draw(); // calls the draw function
  }
   // + CREATE SVG ELEMENT
  svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);


  // + DRAW LINE 
  svg.selectAll("lineMale")
    .data([data]) 
    .join("path")
    .attr("class", 'line-male')
    .attr("d", lineMale => lineGen(lineMale))
    .attr("fill", "none")
    .attr("stroke-width", 3)
    .attr("stroke", "#cccc33");


      // + DRAW LINE 
  svg.selectAll("lineFemale")
    .data([data]) 
    .join("path")
    .attr("class", 'line-male')
    .attr("d", lineFemale => lineGen(lineFemale))
    .attr("fill", "none")
    .attr("stroke-width", 3)
    .attr("stroke", "#cccc33");


    function draw() {
    
}
