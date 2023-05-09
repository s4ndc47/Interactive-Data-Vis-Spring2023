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
d3.csv('../data/CLASS-OF-WORKER.csv', d => {
  return {
    year: new Date(+d.Year, 0, 1),
    Class: d.Class,
    income: +d.Income,
    color: d.Color
  }
}).then(data => {
  console.log('data :>> ', data);

  const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.year))
    .range([margin.right, width - margin.left])

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.income))
    .range([height - margin.bottom, margin.top])

  const xAxis = d3.axisBottom(xScale)
    .ticks(8) // limit the number of tick marks showing -- note: this is approximate


  yAxis = d3.axisLeft(yScale)
    .tickFormat(formatBillions)

  svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

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

  const dot = svg.append("circle")
    .attr("r", 8)
    .attr("fill", "black")
    .style("display", "none");

  const lineGen = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.income));

///// Private wage and salary workers
  const linePWSW = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.income))
    .defined(d => d.Class === "Private wage and salary workers");

  svg.append("path")
    .data([data]) 
    .attr("class", 'linePWSW')
    .attr("d", linePWSW)
    .attr("fill", "none")
    .attr("stroke-width", 8)
    .attr("stroke", "black")
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
        .style("top",`${event.pageY - 40}px`)
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

  const areaGen = d3.area()
    .x(d => xScale(d.year))
    .y0(yScale(0)) 
    .y1(d => yScale(d.income)); 
  
  const areaPWSW = d3.area()
    .x(d => xScale(d.year))
    .y0(yScale(0)) 
    .y1(d => yScale(d.income))
    .defined(d => d.Class === "Private wage and salary workers");
  
  svg.append("path")
    .data([data])
    .attr("class", "areaPWSW")
    .attr("d", areaPWSW)
    .attr("fill", "#fcebeb") 
    .attr("stroke", "none"); 
  
  ///// Government workers
  const lineGW = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.income))
    .defined(d => d.Class === "Government workers");

  svg.append("path")
    .data([data]) 
    .attr("class", 'lineGW')
    .attr("d", lineGW)
    .attr("fill", "none")
    .attr("stroke-width", 8)
    .attr("stroke", "black")
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
        .style("top",`${event.pageY - 40}px`)
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

  const areaGW = d3.area()
    .x(d => xScale(d.year))
    .y0(yScale(0)) 
    .y1(d => yScale(d.income))
    .defined(d => d.Class === "Government workers");
  
  svg.append("path")
    .data([data])
    .attr("class", "areaGW")
    .attr("d", areaGW)
    .attr("fill", "#cc9999") 
    .attr("stroke", "none"); 
  
  ///// Self-employed workers in own not incorporated business
  const lineSW = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.income))
    .defined(d => d.Class === "Self-employed workers in own not incorporated business");

  svg.append("path")
    .data([data]) 
    .attr("class", 'lineSW')
    .attr("d", lineSW)
    .attr("fill", "none")
    .attr("stroke-width", 8)
    .attr("stroke", "black")
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
        .style("top",`${event.pageY - 40}px`)
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

  const areaSW = d3.area()
    .x(d => xScale(d.year))
    .y0(yScale(0)) 
    .y1(d => yScale(d.income))
    .defined(d => d.Class === "Self-employed workers in own not incorporated business");
  
  svg.append("path")
    .data([data])
    .attr("class", "areaSF")
    .attr("d", areaSW)
    .attr("fill", "#cc6666") 
    .attr("stroke", "none"); 

    ///// Unpaid family workers
    const lineFW = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.income))
    .defined(d => d.Class === "Unpaid family workers");

  svg.append("path")
    .data([data]) 
    .attr("class", 'lineFW')
    .attr("d", lineFW)
    .attr("fill", "none")
    .attr("stroke-width", 8)
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
        .style("top",`${event.pageY - 40}px`)
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
