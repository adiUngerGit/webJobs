f();
// const data = [
//   { name: "John", score: 80 },
//   { name: "Simon", score: 76 },
//   { name: "Samantha", score: 90 },
//   { name: "Patrick", score: 82 },
//   { name: "Mary", score: 90 },
//   { name: "Christina", score: 75 },
//   { name: "Michael", score: 86 },
// ];
async function f() {
  const res = await fetch("/apiscreen");
  const ads = await res.json();

  list = ads.map((x) => {
    return { salary: x.salary };
  });
  start(list);
}
function start(data) {
  console.log(data);
  const width = 900;
  const height = 450;
  const margin = { top: 50, bottom: 50, left: 50, right: 50 };

  const svg = d3
    .select("#d3-container")
    .append("svg")
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);

  const x = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([0, 300])
    .range([height - margin.bottom, margin.top]);

  svg
    .append("g")
    .attr("fill", "royalblue")
    .selectAll("rect")
    .data(data.sort((a, b) => d3.descending(a.salry, b.salry)))
    .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", (d) => y(d.salry))
    .attr("title", (d) => d.salry)
    .attr("class", "rect")
    .attr("height", (d) => y(0) - y(d.salry))
    .attr("width", x.bandwidth());

  function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .attr("font-size", "20px");
  }

  function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat((i) => data[i].name))
      .attr("font-size", "20px");
  }

  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.node();
}
