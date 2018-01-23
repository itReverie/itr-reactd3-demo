import React from 'react';
import { Grid } from '@vx/grid';
import { Group } from '@vx/group';
import { curveBasis } from '@vx/curve';
import { GradientPinkBlue } from '@vx/gradient';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { AreaClosed, LinePath, Line } from '@vx/shape';
import { scaleBand,scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';
import Axis from '../reusables/Axis';


const AreaClosedGraph =  ({ width, height, margin , data }) => {
  if (width < 10) return null;

/*
  constructor(props) {
      super(props);
      this.handleTooltip = this.handleTooltip.bind(this);
    }
    handleTooltip({ event, data, xStock, xScale, yScale }) {
      const { showTooltip } = this.props;
      const { x } = localPoint(event);
      const x0 = xScale.invert(x);
      const index = bisectDate(data, x0, 1);
      const d0 = data[index - 1];
      const d1 = data[index];
      let d = d0;
      if (d1 && d1.date) {
        d = x0 - xStock(d0.date) > xStock(d1.date) - x0 ? d1 : d0;
      }
      showTooltip({
        tooltipData: d,
        tooltipLeft: x,
        tooltipTop: yScale(d.close),
      });
    }
*/

  // accessors
  const x = d => d.name;
  const y = d => d.uv;

  // responsive utils for axis ticks
  function numTicksForHeight(height) {
    if (height <= 300) return 3;
    if (300 < height && height <= 600) return 5;
    return 10;
  }

  function numTicksForWidth(width) {
    if (width <= 300) return 2;
    if (300 < width && width <= 400) return 5;
    return 10;
  }


  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // scales. it seems that it's the available space to draw
  const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: data.map(x),
      padding: 0.4,
      nice:false,
    });
  const yScale = scaleLinear({
    range: [yMax, 0], //Space in Y (Height)= base in the max of length left after right and left margin
    domain: [0, max(data, y)],
    nice: true,
  });

console.log(xScale);
console.log(yScale);
  // scale tick formats
  const yFormat = yScale.tickFormat ? yScale.tickFormat() : "100";//identity
  const xFormat = xScale.tickFormat ? xScale.tickFormat() : "100";//identity


  return (
    <svg width={width} height={height}>

      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="#ffffff"
        rx={14}
      />

      <Grid
        top={margin.top}
        left={margin.left}
        xScale={xScale}
        yScale={yScale}
        stroke="rgba(142, 32, 95, 0.9)"
        width={xMax}
        height={yMax}
        numTicksRows={numTicksForHeight(height)}
        numTicksColumns={numTicksForWidth(width)}
      />
      <Group top={margin.top} left={margin.left}>
        <LinePath
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          stroke={"url('#linear')"}
          strokeWidth={2}
          curve={curveBasis}
        />
      </Group>


  <Axis width={800} height={500} margin={{left:70, top:20, right:70, bottom:75}} data={data} />
    </svg>
  );
};

export default AreaClosedGraph;
