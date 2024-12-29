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
      .attr("x1", 25)
      .attr("y1", 100)
      .attr("x2", 50)
      .attr("y2", 50)
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)");

    svg.append("line")
      .attr("x1", 25)
      .attr("y1", 100)
      .attr("x2", 125)
      .attr("y2", 75)
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)");

    function calculateAngle(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1) + Math.PI / 2;
    }
    const angle1 = calculateAngle(25, 100, 50, 50);
    const angle2 = calculateAngle(25, 100, 125, 75);

    console.log(angle1, angle2);

    var arcGenerator= d3.arc();

    const angleArc = arcGenerator({
        innerRadius: 0,
        outerRadius: 10,
        startAngle: angle1,
        endAngle: angle2
    });

    svg.append("path")
      .attr("d", angleArc)
      .attr("fill", "red")
      .attr("transform", "translate(25, 100)");

    
});