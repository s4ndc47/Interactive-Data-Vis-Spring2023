/* CONSTANTS AND GLOBALS */
// const width = ,
//   height = ,
//   margin = ,
//   radius = ;

/* LOAD DATA */
d3.csv("[.../data/squirrelActivities.csv]", d3.autoType)
  .then(data => {
    console.log(data)

    // create SVG
    const svg = d3.select("#container")
      .append('svg')
      .attr("width", width)
      .attr("height", height)

    //* SCALES */
    // x scale
    const xScale = d3.scaleBand()
      .domain(['running','chasing','climbing','eating','foraging']) // data values
      .range(0, width) // pixel values
      .padding(0.1)
    // 
    const mapped = [...data.map((d => d.count))]
    console.log('mapped',mapped)
    const extent = d3.extent(mapped)
    console.log(extent)

  // y scale
  const yScale = d3.scaleLiner()
    .domain([0, Math.max(...data.map(d => d.count))]) 
    .range(height, 0)

  /* HTML Elements */
  // append rectanglea
    svg.selectAll("rect.bar")
      .data(data)
      .join("rect")
      .attr("class","bar")
      //make them visible)
      .attr("x", d => xScale(d.activity))
      .attr("y", d => yScale(d.count))
      // width and height
      .attr("weidth", 100)
      .attr("height", d => height - yScale(d.count))

      /* Axes */
      const xAxis = d3.axisBottom(xScale)
      console.log(xAxis)
      const yAxis = d3.axisLeft(yScale)

      svg.append("g")
        .call(xAxis)

      svg.append("g")
        .call(yAxis)

 });