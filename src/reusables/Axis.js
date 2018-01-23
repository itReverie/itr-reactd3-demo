import React from 'react';
import { Point } from '@vx/point';
import { Grid } from '@vx/grid';
import { Group } from '@vx/group';
import { AxisLeft, AxisBottom, AxisRight , AxisTop} from '@vx/axis';
import { Line } from '@vx/shape';
import { scaleBand, scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';



const Axis =  ({ width, height, margin , data}) => {
  if (width < 10) return null;

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
  // const xScale = scaleTime({
  //   range: [0, xMax], //Space in X (Width)= base in the max of length left after right and left margin
  //   domain: extent(data, x),
  //});
  const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: data.map(x),
      padding: 0.4,
      nice: true,
    });





  const yScale = scaleLinear({
    range: [yMax, 0], //Space in Y (Height)= base in the max of length left after right and left margin
    domain: [0, max(data, y)],
    nice: true,
  });

  // scale tick formats
  const yFormat = yScale.tickFormat ? yScale.tickFormat() : "100";//identity
  const xFormat = xScale.tickFormat ? xScale.tickFormat() : "100";//identity


  return (
    <svg width={width} height={height}>

      <AxisLeft
        top={margin.top}
        left={margin.left}
        scale={yScale}
        hideZero
        numTicks={numTicksForHeight(height)}
        label="value"
        labelProps={{
          fill: '#000000',
          textAnchor: 'middle',
          fontSize: 9,
          fontFamily: 'Arial',
        }}
        stroke="#1b1a1e"
        tickStroke="#000000"
        tickLabelProps={(value, index) => ({
          fill: '#000000',
          textAnchor: 'end',
          fontSize: 10,
          fontFamily: 'Arial',
          dx: '-0.25em',
          dy: '0.25em',
        })}
      />
      <AxisBottom
        top={height - margin.bottom}
        left={margin.left}
        scale={xScale}
        stroke="#33cc33"
        tickStroke="#33cc33"
        hideAxisLine={false}
        numTicks={numTicksForWidth(width)}
        label="time"
      >
        {props => {
          const tickLabelSize = 10;
          const tickRotate = 45;
          const tickColor = '#000000';
          const axisCenter =
            (props.axisToPoint.x - props.axisFromPoint.x) / 2;
          return (
            <g >
              {props.ticks.map((tick, i) => {
                const tickX = tick.to.x;
                const tickY =
                  tick.to.y + tickLabelSize + props.tickLength;
                return (
                  <Group
                    key={`vx-tick-${tick.value}-${i}`}
                    className={'vx-axis-tick'}
                  >
                  <Line
                    from={tick.from}
                    to={tick.to}
                    stroke={tickColor}
                  />

                    {/*<Line
                     from={new Point({ x: margin.left, y: height-margin.bottom })}
                     left={new Point({ x: xMax, y: yMax })}
                     />
                     */}
                    <text
                      transform={`translate(${tickX}, ${tickY}) rotate(${tickRotate})`}
                      fontSize={tickLabelSize}
                      textAnchor="middle"
                      fill={tickColor}
                    >
                      {tick.formattedValue}
                    </text>
                  </Group>
                );
              })}
              <text
                textAnchor="middle"
                transform={`translate(${axisCenter}, 50)`}
                fontSize="8"
              >
                {props.label}
              </text>
            </g>
          );
        }}
      </AxisBottom>

      <AxisRight
        top={margin.top}
        left={width-margin.right}
        scale={yScale}
        hideZero
        numTicks={numTicksForHeight(height)}
        stroke="#33cc33"
        tickStroke="#33cc33"
        hideTicks={true}
        tickLabelProps={(value, index) => ({
          fill: '#000000',
          textAnchor: 'end',
          fontSize: 0,
          fontFamily: 'Arial',
          dx: '-0.25em',
          dy: '0.25em',
        })}
      />

      <AxisTop
        top={margin.top}
        left={margin.left}
        scale={xScale}
        hideZero
        numTicks={numTicksForHeight(height)}
        stroke="#33cc33"
        tickStroke="#33cc33"
        hideTicks={true}
        tickLabelProps={(value, index) => ({
          fill: '#000000',
          textAnchor: 'end',
          fontSize: 0,
          fontFamily: 'Arial',
          dx: '-0.25em',
          dy: '0.25em',
        })}
      />

    </svg>
  );
};

export default Axis;
