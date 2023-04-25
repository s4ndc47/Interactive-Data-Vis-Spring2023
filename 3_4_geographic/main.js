/**
 * CONSTANTS AND GLOBALS
 * */
 const width = window.innerWidth * 0.9,
 height = window.innerHeight * 0.7,
 margin = { top: 20, bottom: 50, left: 60, right: 40 };

/**
* APPLICATION STATE
* */
let svg;
let state = {  
 geojson: null,
 extremes: null,
 hover: {
   latitude: null,
   longitude: null,
   state: null,
 },
};

/**
* LOAD DATA
* Using a Promise.all([]), we can load more than one dataset at a time
* */
Promise.all([
 d3.json("../data/usState.json")
]).then(([geojson]) => {
 state.geojson = geojson;
 console.log("state: ", state);
 init();
});

/**
* INITIALIZING FUNCTION
* this will be run *one time* when the data finishes loading in
* */
function init() {
 svg = d3.select("#container")
   .append("svg")
   .attr("width", width)
   .attr("height", height);
 
 // create projection
 const projection = d3.geoAlbersUsa().fitSize([width, height], state.geojson);

 // create path
 const path = d3.geoPath().projection(projection);

 // draw the map
 svg.selectAll(".state")
   .data(state.geojson.features)
   .join("path")
   .attr("class","state")
   .attr("d", d => path(d))
   .attr("fill","transparent")
   .on("mouseover", (event, d) => {
     console.log('event', event)
     state.hover.state = d.properties.NAME
   })
   .on("mousemove", (event) => {
    console.log('event', event)
    // const mx = d3.pointer(event)[0]
    // const my = d3.pointer(event)[1]
    const [mx, my] = d3.pointer(event)
    // USE PROJECTION INVERT METHOD TO GET  LATITIDIDE
    const [projX, projY] = projection.invert([mx, my])
    state.hover.longitude = projX
    state.hover.latitude = projY
    draw() 
   })
 draw(); // calls the draw function
}

/**
* DRAW FUNCTION
* we call this every time there is an update to the data/state
* */
function draw() {
 const hoverBox = d3.select("#hover-content")
 console.log('hover data', state.hover)
 const hoverData = Object.entries(state.hover)
 console.log('hoverData', hoverData)
hoverBox.selectAll("div.row")
    .data([state.hover])
    .join("div")
    .attr("class","row")
    .html(d => {
        const [word, value] = d;
        return `<h3>${word}</h3>,${value}`;
      })      
}
