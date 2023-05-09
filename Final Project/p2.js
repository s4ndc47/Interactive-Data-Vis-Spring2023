/* CONSTANTS AND GLOBALS */
const width = 700,
  height = 600,
  margin = { top: (window.innerHeight - height) / 2, bottom: 50, left: 20, right: (window.innerWidth - width) / 2 },
  radius = 15;

/*
this extrapolated function allows us to replace the "G" with "B" min the case of billions.
we cannot do this in the .tickFormat() because we need to pass a function as an argument,
and replace needs to act on the text (result of the function).
*/
const formatBillions = (num) => d3.format(".2s")(num).replace(/G/, 'B')
const formatDate = d3.timeFormat("%Y")



/* LOAD DATA */
// + SET YOUR DATA PATH
d3.csv('../data/GenderIncomeGap-color.csv', d => {
  return {
    year: new Date(+d.Year, 0, 1),
    sex: d.Sex,
    income: +d.Income,
    color: d.Color
  }
}).then(data => {
  console.log('data :>> ', data);


  // + SCALES
  const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.year))
    .range([margin.right, width - margin.left])

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.income))
    .range([height - margin.bottom, margin.top])

  // + AXES
  const xAxis = d3.axisBottom(xScale)
    .ticks(8) // limit the number of tick marks showing -- note: this is approximate
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

  yAxisGroup.append("text")
    .attr("class", 'yLabel')
    .attr("transform", `translate(${-45}, ${height / 2})`)
    .attr("writing-mode", 'vertical-rl')
    .text("Income")

  const tooltip = d3.select(".tooltip");

  const types = {
    click: "Click",
    hover: "Hover",
    mouseover: "Mouseover" // add mouseover type
  };

  // LINE GENERATOR FUNCTION
  const lineGen = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.income));


  // Set up the line generators for the male and female data series
  const lineMale = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.income))
    .defined(d => d.sex === "Male");

  // + DRAW LINE 
  svg.append("path")
    .data([data]) 
    .attr("class", 'line-male')
    .attr("d", lineMale)
    .attr("fill", "none")
    .attr("stroke-width", 3)
    .attr("stroke", "#cc6666")
    .on("mouseover", (event, d) => {
      console.log(d)
      const [x, y] = d3.pointer(event);
      console.log(event)
      const income = yScale.invert(y)
      const year = xScale.invert(x)
      tooltip
        .html(`${Math.round(income)}`)
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

  const lineFemale = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.income))
    .defined(d => d.sex === "Female");
  
  const dot = svg.append("circle")
    .attr("r", 8)
    .attr("fill", "black")
    .style("display", "none");

 // + DRAW LINE 
  svg.append("path")
    .data([data]) 
    .attr("class", 'line-Female')
    .attr("d", lineFemale)
    .attr("fill", "none")
    .attr("stroke-width", 3)
    .attr("stroke", "#cccc33")
    .on("mouseover", (event, d) => {
      console.log(d)
      const [x, y] = d3.pointer(event);
      console.log(event)
      const income = yScale.invert(y)
      const year = xScale.invert(x)
      tooltip
        .html(`${Math.round(income)}`)
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
 

})
