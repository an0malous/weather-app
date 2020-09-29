import { generateLabel, pickDay } from "./utils.js";
const container = d3.select("#map").node();

export const displayWeatherTrends = ({ daily }) => {
  if (document.querySelector(".d3")) {
    document.querySelector(".d3").remove();
  }

  const dataset = daily;
  generateLabel(
    "h2",
    document.querySelector("#d3-container"),
    "d3-label",
    "container-label"
  ).innerText = "8 Day Trend";
  const w = container.getBoundingClientRect().width;
  const h = container.getBoundingClientRect().height;
  const padding = 20;
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, (d, i) => i)])
    .range([padding, w - padding]);

  const yScale = d3
    .scaleLinear()
    .domain([
      d3.min(dataset, (d) => d.temp.min - 5),
      d3.max(dataset, (d) => d.temp.max + 5),
    ])
    .range([h - padding, padding]);

  const svg = d3
    .select("#d3-data")
    .append("svg")
    .attr("class", "d3")
    .attr("width", w)
    .attr("height", h);

  svg
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => xScale(i))
    .attr("cy", (d) => yScale(d.temp.max))
    .attr("r", 3)
    .attr("fill", "yellow");

  svg
    .selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .attr("fill", "white")
    .text((d) => Math.round(d.temp.max) + "°")
    .attr("x", (d, i) => xScale(i - 0.1))
    .attr("y", (d) => yScale(d.temp.max + 0.8));

  svg
    .selectAll("circle-min")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => xScale(i))
    .attr("cy", (d) => yScale(d.temp.min))
    .attr("r", 3)
    .attr("fill", "blue");

  svg
    .selectAll("text-min")
    .data(dataset)
    .enter()
    .append("text")
    .attr("fill", "white")
    .text((d) => Math.round(d.temp.min) + "°")
    .attr("x", (d, i) => xScale(i - 0.1))
    .attr("y", (d) => yScale(d.temp.min - 2.2));

  svg
    .selectAll("line")
    .data(dataset)
    .enter()
    .append("line")
    .attr("x1", (d, i) => xScale(i))
    .attr("y1", 0)
    .attr("x2", (d, i) => xScale(i))
    .attr("y2", h)
    .attr("stroke-width", 0.2)
    .attr("stroke", "white");

  svg
    .selectAll("text-day")
    .data(dataset)
    .enter()
    .append("text")
    .attr("fill", "white")
    .text((d, i) => {
      const day = new Date(d.dt * 1000).getDay();
      const dayOfTheWeek = pickDay(day);
      return dayOfTheWeek.slice(0, 3)
    })
    .attr("x", (d, i) => xScale(i - 0.25))
    .attr("y", 13);


};
