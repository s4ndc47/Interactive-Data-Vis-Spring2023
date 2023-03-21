/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */
Promise.all([
  d3.json("../data/usState.json"),
  d3.csv("../data/usHeatExtremesFilter.csv", d3.autoType),
]).then(([geojson, capitals]) => {
  

  const svg1 = d3.select("#container1")
  .append("svg")
  .attr("width", 20)
  .attr("height", 100);
  
  const gradient1 = svg1.append("defs")
  .append("linearGradient")
  .attr("id", "myGradient1")
  .attr("x1", "0%")
  .attr("y1", "0%")
  .attr("x2", "0%")
  .attr("y2", "100%");
  
  gradient1.append("stop")
  .attr("offset", "0%")
  .attr("stop-color", "#faf0a4");
  
  gradient1.append("stop")
  .attr("offset", "25%")
  .attr("stop-color", "#f1ae35");
  
  gradient1.append("stop")
  .attr("offset", "50%")
  .attr("stop-color", "#e96744");
  
  gradient1.append("stop")
  .attr("offset", "75%")
  .attr("stop-color", "#a41909");
  
  gradient1.append("stop")
  .attr("offset", "100%")
  .attr("stop-color", "#770000");
  
  svg1.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 20)
  .attr("height", 100)
  .attr("fill", "url(#myGradient1)")
  .attr("stroke", "none");
  
  const svg2 = d3.select("#container2")
  .append("svg")
  .attr("width", 20)
  .attr("height", 100);
  
  const gradient2 = svg2.append("defs")
  .append("linearGradient")
  .attr("id", "myGradient2")
  .attr("x1", "0%")
  .attr("y1", "0%")
  .attr("x2", "0%")
  .attr("y2", "100%");
  
  gradient2.append("stop")
  .attr("offset", "0%")
  .attr("stop-color", "#caf0f8");
  
  gradient2.append("stop")
  .attr("offset", "25%")
  .attr("stop-color", "#90e0ef");
  
  gradient2.append("stop")
  .attr("offset", "50%")
  .attr("stop-color", "#00b4d8");
  
  gradient2.append("stop")
  .attr("offset", "75%")
  .attr("stop-color", "#0077b6");
  
  gradient2.append("stop")
  .attr("offset", "100%")
  .attr("stop-color", "#03045e");
  
  svg2.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 20)
  .attr("height", 100)
  .attr("fill", "url(#myGradient2)")
  .attr("stroke", "none");
  




  // create an svg element in our main `d3-container` element
  svg3 = d3
    .select("#container3")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // SPECIFY PROJECTION
  // a projection maps from lat/long -> x/y values
  // so it works a lot like a scale!
  const projection = d3.geoAlbersUsa()
    .fitSize([
      width-margin.left-margin.right,
      height-margin.top-margin.bottom
    ], geojson);

  // DEFINE PATH FUNCTION
  const path = d3.geoPath(projection)

  // draw base layer path - one path for each state
  const states = svg3.selectAll("path.states")
    .data(geojson.features)
    .join("path")
    .attr("class", 'states')
    .attr("stroke", "white")
    .attr("fill", "lightgrey")
    .attr("d", path)

  // draw point for coolest 1
  const C1 =  { latitude: 30.0719, longitude: -91.0278 };
  svg3.selectAll("circle.point")
    .data([C1])
    .join("circle")
    .attr("r", 8)
    .attr("fill", "#03045e")
    .attr("transform", d=> {
      // use our projection to go from lat/long => x/y
      // ref: https://github.com/d3/d3-geo#_projection
      const [x, y] = projection([d.longitude, d.latitude])
      return `translate(${x}, ${y})`
    })

  // draw point for coolest 2
  const C2 =  { latitude: 34.2428, longitude: -80.6564 };
  svg3.selectAll("circle.point")
    .data([C2])
    .join("circle")
    .attr("r", 8)
    .attr("fill", "#03045e")
    .attr("transform", d=> {
      // use our projection to go from lat/long => x/y
      // ref: https://github.com/d3/d3-geo#_projection
      const [x, y] = projection([d.longitude, d.latitude])
      return `translate(${x}, ${y})`
    })

  // draw point for coolest 3
    const C3 =  { latitude: 29.7192, longitude: -98.1189 };
    svg3.selectAll("circle.point")
      .data([C3])
      .join("circle")
      .attr("r", 8)
      .attr("fill", "#0077b6")
      .attr("transform", d=> {
        // use our projection to go from lat/long => x/y
        // ref: https://github.com/d3/d3-geo#_projection
        const [x, y] = projection([d.longitude, d.latitude])
        return `translate(${x}, ${y})`
      })
 // draw point for coolest 4
 const C4 =  { latitude: 34.1864, longitude: -90.5572 };
 svg3.selectAll("circle.point")
   .data([C4])
   .join("circle")
   .attr("r", 8)
   .attr("fill", "#0077b6")
   .attr("transform", d=> {
     // use our projection to go from lat/long => x/y
     // ref: https://github.com/d3/d3-geo#_projection
     const [x, y] = projection([d.longitude, d.latitude])
     return `translate(${x}, ${y})`
   })
 // draw point for coolest 5
 const C5 =  { latitude: 29.8233, longitude: -91.5442 };
 svg3.selectAll("circle.point")
   .data([C5])
   .join("circle")
   .attr("r", 8)
   .attr("fill", "#00b4d8")
   .attr("transform", d=> {
     // use our projection to go from lat/long => x/y
     // ref: https://github.com/d3/d3-geo#_projection
     const [x, y] = projection([d.longitude, d.latitude])
     return `translate(${x}, ${y})`
   })

   // draw point for coolest 6
 const C6 =  { latitude: 37.5742, longitude: -81.5356 };
 svg3.selectAll("circle.point")
   .data([C6])
   .join("circle")
   .attr("r", 8)
   .attr("fill", "#00b4d8")
   .attr("transform", d=> {
     // use our projection to go from lat/long => x/y
     // ref: https://github.com/d3/d3-geo#_projection
     const [x, y] = projection([d.longitude, d.latitude])
     return `translate(${x}, ${y})`
   })
 
  // draw point for coolest 7
  const C7 =  { latitude: 39.8667, longitude: -85.1833 };
  svg3.selectAll("circle.point")
    .data([C7])
    .join("circle")
    .attr("r", 8)
    .attr("fill", "#90e0ef")
    .attr("transform", d=> {
      // use our projection to go from lat/long => x/y
      // ref: https://github.com/d3/d3-geo#_projection
      const [x, y] = projection([d.longitude, d.latitude])
      return `translate(${x}, ${y})`
    })
  // draw point for coolest 8
  const C8 =  { latitude: 31.4167, longitude: -103.5 };
  svg3.selectAll("circle.point")
    .data([C8])
    .join("circle")
    .attr("r", 8)
    .attr("fill", "#90e0ef")
    .attr("transform", d=> {
      // use our projection to go from lat/long => x/y
      // ref: https://github.com/d3/d3-geo#_projection
      const [x, y] = projection([d.longitude, d.latitude])
      return `translate(${x}, ${y})`
    })
  // draw point for coolest 9
  const C9 =  { latitude: 35.585, longitude: -99.3953 };
  svg3.selectAll("circle.point")
    .data([C9])
    .join("circle")
    .attr("r", 8)
    .attr("fill", "caf0f8")
    .attr("transform", d=> {
      // use our projection to go from lat/long => x/y
      // ref: https://github.com/d3/d3-geo#_projection
      const [x, y] = projection([d.longitude, d.latitude])
      return `translate(${x}, ${y})`
    })
  // draw point for coolest 10
  const C10 =  { latitude: 39.8386, longitude: -81.9167 };
  svg3.selectAll("circle.point")
    .data([C10])
    .join("circle")
    .attr("r", 8)
    .attr("fill", "caf0f8")
    .attr("transform", d=> {
      // use our projection to go from lat/long => x/y
      // ref: https://github.com/d3/d3-geo#_projection
      const [x, y] = projection([d.longitude, d.latitude])
      return `translate(${x}, ${y})`
    })
  // draw point for hotest 1 53.97562023
  const H1 =  { latitude: 26.6928, longitude: -80.6711 };
  svg3.selectAll("circle.point")
    .data([H1])
    .join("circle")
    .attr("r", 8)
    .attr("fill", "#770000")
    .attr("transform", d=> {
      // use our projection to go from lat/long => x/y
      // ref: https://github.com/d3/d3-geo#_projection
      const [x, y] = projection([d.longitude, d.latitude])
      return `translate(${x}, ${y})`
    })
  // draw point for hotest 2 45.79028133
  const H2 =  { latitude: 29.7258, longitude: -85.0206 };
  svg3.selectAll("circle.point")
    .data([H2])
    .join("circle")
    .attr("r", 8)
    .attr("fill", "#770000")
    .attr("transform", d=> {
      // use our projection to go from lat/long => x/y
      // ref: https://github.com/d3/d3-geo#_projection
      const [x, y] = projection([d.longitude, d.latitude])
      return `translate(${x}, ${y})`
    })
  // draw point for hotest 3 43.87305669
  const H3 =  { latitude: 34.7675, longitude: -106.7611 };
  svg3.selectAll("circle.point")
    .data([H3])
    .join("circle")
    .attr("r", 8)
    .attr("fill", "#a41909")
    .attr("transform", d=> {
      // use our projection to go from lat/long => x/y
      // ref: https://github.com/d3/d3-geo#_projection
      const [x, y] = projection([d.longitude, d.latitude])
      return `translate(${x}, ${y})`
    })
  // draw point for hotest 4 39.7428883
  const H4 =  { latitude: 33.9947, longitude: -78.0078 };
  svg3.selectAll("circle.point")
    .data([H4])
    .join("circle")
    .attr("r", 8)
    .attr("fill", "#a41909")
    .attr("transform", d=> {
      // use our projection to go from lat/long => x/y
      // ref: https://github.com/d3/d3-geo#_projection
      const [x, y] = projection([d.longitude, d.latitude])
      return `translate(${x}, ${y})`
    })

  // draw point for hotest 5 39.13299233
  const H5 =  { latitude: 42.5872, longitude: -111.7275 };
  svg3.selectAll("circle.point")
    .data([H5])
    .join("circle")
    .attr("r", 8)
    .attr("fill", "#e96744")
    .attr("transform", d=> {
      // use our projection to go from lat/long => x/y
      // ref: https://github.com/d3/d3-geo#_projection
      const [x, y] = projection([d.longitude, d.latitude])
      return `translate(${x}, ${y})`
    })
  // draw point for hotest 6 38.23657289
  const H6 =  { latitude: 40.5278, longitude: -112.2975 };
  svg3.selectAll("circle.point")
    .data([H6])
    .join("circle")
    .attr("r", 8)
    .attr("fill", "#e96744")
    .attr("transform", d=> {
      // use our projection to go from lat/long => x/y
      // ref: https://github.com/d3/d3-geo#_projection
      const [x, y] = projection([d.longitude, d.latitude])
      return `translate(${x}, ${y})`
    })
  // draw point for hotest 7 36.49616368
  const H7 =  { latitude: 32.64, longitude: -117.0858 };
  svg3.selectAll("circle.point")
    .data([H7])
    .join("circle")
    .attr("r", 8)
    .attr("fill", "#f1ae35")
    .attr("transform", d=> {
      // use our projection to go from lat/long => x/y
      // ref: https://github.com/d3/d3-geo#_projection
      const [x, y] = projection([d.longitude, d.latitude])
      return `translate(${x}, ${y})`
    })
  // draw point for hotest 8 32.77578743
  const H8 =  { latitude: 37.7686, longitude: -111.5978 };
  svg3.selectAll("circle.point")
    .data([H8])
    .join("circle")
    .attr("r", 8)
    .attr("fill", "#f1ae35")
    .attr("transform", d=> {
      // use our projection to go from lat/long => x/y
      // ref: https://github.com/d3/d3-geo#_projection
      const [x, y] = projection([d.longitude, d.latitude])
      return `translate(${x}, ${y})`
    })
  // draw point for hotest 9 32.13554987
  const H9 =  { latitude: 36.7981, longitude: -118.2036 };
  svg3.selectAll("circle.point")
    .data([H9])
    .join("circle")
    .attr("r", 8)
    .attr("fill", "#faf0a4")
    .attr("transform", d=> {
      // use our projection to go from lat/long => x/y
      // ref: https://github.com/d3/d3-geo#_projection
      const [x, y] = projection([d.longitude, d.latitude])
      return `translate(${x}, ${y})`
    })
  // draw point for hotest 10 31.90792839
  const H10 =  { latitude: 29.9167, longitude: -90.1303 };
  svg3.selectAll("circle.point")
    .data([H10])
    .join("circle")
    .attr("r", 8)
    .attr("fill", "#faf0a4")
    .attr("transform", d=> {
      // use our projection to go from lat/long => x/y
      // ref: https://github.com/d3/d3-geo#_projection
      const [x, y] = projection([d.longitude, d.latitude])
      return `translate(${x}, ${y})`
    })

  
});