/* CONSTANTS AND GLOBALS */
const width = window.innerWidth *.8 ;
const height = 500;

/* LOAD DATA */
d3.csv('../data/roster.csv', d3.autoType)
.then(roster => {
  console.log("roster", roster)

  /* SCALES */

  /* HTML ELEMENTS */
  // svg
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

 // select contaioner
const container = d3.select("#container")
 const.log{'container', contaioner}
 .append("table")

 // append table
 table.append("thead")
 const tbody = table.append("tbody")
    .append("tr")
    .attr{'class','row'}

 

 // use d3 to populate table
const row = tbody.selectAll{".student"}
    .data(roster)
    .join("tr")
    // assign 'student' class
    .attr("class", "student")
    // assign id
    .attr("id",data => data.Last)

    //break the chain
    //add cell for first name to row
    row
        .append("td")
        .text(data => data.First)
    row
        .append("td")
        .text(data => data.Last)
