import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Gauge = ({ value }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 100;
    const height = 100;
    const radius = Math.min(width, height) / 2;
    const gaugeWidth = 10;
    const gaugeHeight = 80;
    const centerX = width / 2;
    const centerY = height / 2;

    // Remove any existing elements
    svg.selectAll("*").remove();

    // Create the gauge background
    svg
      .append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY)
      .attr("r", radius - gaugeWidth / 2)
      .style("fill", "white");

    // Create the gauge arc
    const arc = d3
      .arc()
      .outerRadius(radius - gaugeWidth / 2)
      .innerRadius(radius - gaugeWidth / 2 - 20)
      .startAngle(0)
      .endAngle(Math.PI * 2 * (value / 100));

    svg.append("path").attr("d", arc).style("fill", "steelblue");

    // Create the gauge text
    svg
      .append("text")
      .text(`${value}%`)
      .attr("x", centerX)
      .attr("y", centerY + 20)
      .attr("text-anchor", "middle")
      .style("font-size", "32px")
      .style("font-weight", "bold");
  }, [value]);

  return <svg ref={svgRef} width={200} height={200} />;
};

export default Gauge;
