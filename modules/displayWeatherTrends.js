import { generateLabel } from './utils.js'
const container = d3.select('#location-container').node();

export const displayWeatherTrends = ({daily}) => {
   if(document.querySelector('.d3')){
      document.querySelector('.d3').remove();
   }

    const dataset = daily
    const dataset2 = daily
    generateLabel("h2", document.querySelector('#d3-container'), "d3-label", "container-label").innerText = "8 Day Trend"
    const w = container.getBoundingClientRect().width;
    const h = container.getBoundingClientRect().height;
const padding = 45;
    const xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, (d, i) => i)])
    .range([padding, w - padding]);

const yScale = d3.scaleLinear()
    .domain([d3.min(dataset, (d)=>d.temp.min - 5), d3.max(dataset, (d) => d.temp.max + 5)])
    .range([h - padding, padding]);

    const svg = d3.select("#d3-data")
                  .append("svg")
                  .attr("class", "d3")
                  .attr("width", w)
                  .attr("height", h)
     
    svg.selectAll("circle")
    .data(dataset)
       .enter()
       .append("circle")
       .attr("cx", (d, i)=> xScale(i) )
       .attr("cy", (d)=>yScale(d.temp.max))
       .attr("r", 3)
       .attr("fill", "yellow");

    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
      .attr("fill", "white")
       .text((d) => (Math.floor(d.temp.max) + "°"))
       .attr("x", (d, i)=>  xScale(i - 0.1))
      .attr("y", (d)=>yScale(d.temp.max + 0.8))

      svg.selectAll("circle-min")
      .data(dataset)
         .enter()
         .append("circle")
         .attr("cx", (d, i)=> xScale(i) )
         .attr("cy", (d)=>yScale(d.temp.min))
         .attr("r", 3)
         .attr("fill", "blue");
         
         svg.selectAll("text-min")
        .data(dataset)
        .enter()
        .append("text")
      .attr("fill", "white")
       .text((d) => (Math.floor(d.temp.min)+ "°"))
       .attr("x", (d, i)=>  xScale(i - 0.1))
      .attr("y", (d)=>yScale(d.temp.min - 2.2));

      svg.selectAll("line")
      .append("line")
      .data(dataset)
      .enter()
      .append("line")
                         .attr("x1", (d, i)=>xScale( i - 0.5))
                         .attr("y1", 0)
                        .attr("x2", (d, i)=>xScale(i - 0.5))
                        .attr("y2", h)
                        .attr("stroke-width", 0.2)
                         .attr("stroke", "white")


                         svg.selectAll("text-day")
                         .data(dataset)
                         .enter()
                         .append("text")
                       .attr("fill", "white")
                        .text((d, i)=>{
                           const day = new Date(d.dt * 1000).getDay();
                           return pickDay(day)
                           
                        })
                        .attr("x", (d, i)=>  xScale(i - 0.25))
                       .attr("y", 13);


                       function pickDay(day){
                        const daysOfTheWeek = {
                           0: 'Sun',
                           1: 'Mon',
                           2: 'Tue',
                           3: 'Wed',
                           4: 'Thur',
                           5: 'Fri',
                           6: 'Sat'
                        }
                        return daysOfTheWeek[day];
                     }

      }

