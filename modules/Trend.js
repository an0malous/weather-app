import { generateLabel } from './utils.js'

export const Trend = (data) => {
   if(document.querySelector('.d3')){
      document.querySelector('.d3').remove();
   }
    const dataset = data.daily
    const dataset2 = data.daily
    generateLabel("h2", document.querySelector('#d3-container'), "d3-label", "container-label").textContent = "8 Day Trend"
    const svg = d3.select("#d3-data")
                  .append("svg")
                  .attr("class", "d3")
    svg.selectAll("circle")
    .data(dataset)
       .enter()
       .append("circle")
       .attr("cx", (d, i) => i * 40 + 40)
       .attr("cy", (d, i) => 100 - d.temp.max * 3)
       .attr("r", 5)
       .attr("fill", "yellow");

    svg.selectAll("text")
       .data(dataset)
       .enter()
       .append("text")
       .attr("fill", "yellow");

       svg.selectAll("class", "circle1")
    .data(dataset2)
       .enter()
       .append("circle")
       .attr("class", "circle1")
       .attr("cx", (d, i) => i * 40 + 40)
       .attr("cy", (d, i) => 100 - d.temp.min * 3)
       .attr("r", 5)
       .attr("fill", "green");

    svg.selectAll("text")
       .data(dataset2)
       .enter()
       .append("text")
       .attr("fill", "yellow")
}
