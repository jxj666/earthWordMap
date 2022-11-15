/*
 * @LastEditTime: 2022-11-15 19:50:20
 * @LastEditors: jinxiaojian
 */
let mockData = {
  "CHN": 'black',
  // "USA": 'orange',
  // "IND": 'yellow',
}

var svg = d3.select("svg"),
  width = +svg.attr("width")
var projection = d3.geoMercator()
  .scale((width - 3) / (2 * Math.PI))
  .translate([width / 2, width / 2]);
var path = d3.geoPath()
  .projection(projection);
d3.json("./wrold4.json", function (error, world) {
  if (error) throw error;
  let groups = svg.append('g');
  groups.attr('stroke-linecap', 'round').attr('stroke-linejoin', 'round').style('fill','none')
  groups.selectAll("path")
    .data(world.features)
    .enter()
    .append("path")
    .attr("class", 'country')
    .attr('fill-rule', 'evenodd')
    .style('fill', (country) => {
      return '#ddd'
    })
    .style('stroke', (country) => {
     return 'red'
    })
    .style('stroke-width',val=>{
      return 0.5
    } )
    .attr("d", (...x) => {
      return path(...x)
    })

  

});

