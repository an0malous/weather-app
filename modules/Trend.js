export const Trend = (data) => {
    const dataset = data.daily
    const dataset2 = data.daily
    const svg = d3.select("#details-container")
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
