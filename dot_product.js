document.addEventListener("DOMContentLoaded", function () {
    var svg = d3.select("body").append("svg")
      .attr("width", 500)
      .attr("height", 500)
      .attr("viewBox", "0 0 500 500")
      .attr("xmlns", "http://www.w3.org/2000/svg");

    const defs = svg.append("defs");

    const marker = defs.append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 5)
      .attr("refY", 5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto-start-reverse");

    marker.append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10 z")
      .attr("fill", "black"); // You can set the color of the arrowhead here

    // 3. Draw a Straight Line with an Arrowhead
    svg.append("line")
      .attr("x1", 10)
      .attr("y1", 10)
      .attr("x2", 90)
      .attr("y2", 90)
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)");


    
});