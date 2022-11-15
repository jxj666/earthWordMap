/*
 * @LastEditTime: 2022-11-14 13:33:16
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
d3.json("./wrold.json", function (error, world) {
  if (error) throw error;
  let groups = svg.append('g');
  groups.selectAll("path")
    .data(world.features)
    .enter()
    .append("path")
    .attr("class", 'country')
    .style('fill', (country) => {
      if (mockData[country.id]) {
        // info(path.centroid(country), country, groups)
      }
      return mockData[country.id] || '#ddd'
    })
    .style('stroke', (country) => {
     return 'black'
    })
    .style('stroke-width',val=>{
      return 1
    } )
    .attr("d", (...x) => {
      return path(...x)
    })

  d3.json("./china2.json", function (error, world) {
    let groups = svg.append('g');
    groups.style('fill','none')
    if (error) throw error;
    groups.selectAll("path")
      .data(world.features)
      .enter()
      .append("path")
      .attr("class", 'province')
      .attr("stroke",'black')
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .attr('fill-rule', 'evenodd')
      .style('fill','#eee')
      .style('stroke-width',val=>{
        return 1
      } )
      
      .attr("d", (...x) => {
        return path(...x)
      })
  });
  
  d3.json("./china.json", function (error, world) {
    let groups = svg.append('g');
    groups.style('fill','none')
    if (error) throw error;
    groups.selectAll("path")
      .data(world.features)
      .enter()
      .append("path")
      .attr("class", 'province')
      .attr("stroke",'black')
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .style('stroke-width',val=>{
        return val.properties. adcode==='100000_JD'?1 :0.1
      } )
      
      .attr("d", (...x) => {
        return path(...x)
      })
  });
});

//添加标签
function info (xy, country, groups) {
  let xyData = xy
  let gTag = groups.append("g").attr('class', 'tag')
  gTag.append("circle")
    .attr('cx', xyData[0])
    .attr('cy', xyData[1])
    .attr('r', 3)
    .attr('fill', '#333')
  gTag.append("circle")
    .attr('cx', xyData[0])
    .attr('cy', xyData[1])
    .attr('r', 6)
    .attr('fill', 'none')
    .attr('stroke', '#333')
  gTag.append("circle")
    .attr('cx', xyData[0])
    .attr('cy', xyData[1])
    .attr('r', 9)
    .attr('fill', 'none')
    .attr('stroke', '#333')
  gTag.append("path")
    .attr('d', `M${xyData[0]} ${xyData[1]} L${xyData[0]} ${xyData[1] - 100} Z`)
    .attr('stroke', '#333')
  gTag.append('rect')
    .attr('x', xyData[0] - country?.properties?.name?.length * 5)
    .attr('y', xyData[1] - 100 - 30)
    .attr('width', country?.properties?.name?.length * 10)
    .attr('height', 30)
    .attr('fill', '#00000066')
    .attr('rx', 5)
    .attr('ry', 5)
  gTag.append("text")
    .attr('x', xyData[0])
    .attr('y', xyData[1] - 100 - 10)
    .attr('text-anchor', 'middle')
    .attr("fill", '#fff')
    .style("font-size", '14px')
    .text(country?.properties?.name)
}