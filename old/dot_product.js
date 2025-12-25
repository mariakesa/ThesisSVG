document.addEventListener("DOMContentLoaded", function () {
    // Helper function to scale any line (x1, y1, x2, y2) to a given target length
    function scaleCoordinates(x1, y1, x2, y2, targetLength) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const currentLength = Math.sqrt(dx * dx + dy * dy);
        if (currentLength === 0) {
            // Avoid division by zero if the points are identical
            return { x2, y2 };
        }
        const scale = targetLength / currentLength;
        return {
            x2: x1 + dx * scale,
            y2: y1 + dy * scale
        };
    }

    // Create the main SVG
    const svg = d3.select("body").append("svg")
        .attr("width", 500)
        .attr("height", 500)
        .attr("viewBox", "0 0 500 500")
        .attr("xmlns", "http://www.w3.org/2000/svg");

    // Define arrow marker
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
        .attr("fill", "black"); // Arrow color

    // Black lines with arrowheads
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

    // Calculate angles for arc
    function calculateAngle(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1) + Math.PI / 2;
    }
    const angle1 = calculateAngle(25, 100, 50, 50);
    const angle2 = calculateAngle(25, 100, 125, 75);

    var arcGenerator = d3.arc();
    const angleArc = arcGenerator({
        innerRadius: 0,
        outerRadius: 20,
        startAngle: angle1,
        endAngle: angle2
    });

    svg.append("path")
        .attr("d", angleArc)
        .attr("fill", "pink")
        .attr("transform", "translate(25, 100)");

    // === Gray lines (all scaled to length 20) ===
    // Original endpoints, now scaled:

    // 1) (25, 100) -> (25, 50)
    const line1 = scaleCoordinates(25, 100, 25, 50, 25);
    svg.append("line")
        .attr("x1", 25)
        .attr("y1", 100)
        .attr("x2", line1.x2)
        .attr("y2", line1.y2)
        .attr("stroke", "gray");

    // 2) (25, 100) -> (0, 125)
    const line2 = scaleCoordinates(25, 100, 0, 125, 25);
    svg.append("line")
        .attr("x1", 25)
        .attr("y1", 100)
        .attr("x2", line2.x2)
        .attr("y2", line2.y2)
        .attr("stroke", "gray");

    // 3) (25, 100) -> (0, 90)
    const line3 = scaleCoordinates(25, 100, 0, 90, 25);
    svg.append("line")
        .attr("x1", 25)
        .attr("y1", 100)
        .attr("x2", line3.x2)
        .attr("y2", line3.y2)
        .attr("stroke", "gray");

    // 4) (25, 100) -> (50, 125)
    const line4 = scaleCoordinates(25, 100, 50, 125, 25);
    svg.append("line")
        .attr("x1", 25)
        .attr("y1", 100)
        .attr("x2", line4.x2)
        .attr("y2", line4.y2)
        .attr("stroke", "gray");

    // 5) (25, 100) -> (50, 100)
    const line5 = scaleCoordinates(25, 100, 50, 100, 25);
    svg.append("line")
        .attr("x1", 25)
        .attr("y1", 100)
        .attr("x2", line5.x2)
        .attr("y2", line5.y2)
        .attr("stroke", "gray");

    // Some text labels
    svg.append("text")
        .attr("font-size", 10)
        .attr("x", 120)
        .attr("y", 80)
        .attr("dx", 20)
        .attr("dy", -10)
        .text("Neuron ts");

    svg.append("text")
        .attr("font-size", 10)
        .attr("x", 40)
        .attr("y", 50)
        .attr("dx", 20)
        .attr("dy", -10)
        .text("Transformer feature ts");
});
