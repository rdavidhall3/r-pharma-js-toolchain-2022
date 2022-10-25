import React from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip } from 'recharts'

const LabChart = ({ data, normLow, normHigh, chartHeight, chartWidth }) => {

  const xRange = data.reduce((cumulative, nextItem) => {
    const tempMin = nextItem.x < cumulative.min? nextItem.x : cumulative.min
    const tempMax = nextItem.x > cumulative.max? nextItem.x : cumulative.max
    return { min: tempMin, max: tempMax }
  }, { min: Number.MAX_VALUE, max: Number.MIN_VALUE })

  const normLineStyle = {
    stroke: 'red',
    strokeDasharray: '4, 4'
  }

  return (
    <ScatterChart width={chartWidth} height={chartHeight}>
      <XAxis type='number' dataKey='x' />
      <YAxis type='number' dataKey='y' />
      {normLow &&
        <Scatter
          data={[{ x: xRange.min, y: normLow }, {x: xRange.max, y: normLow}]}
          line={normLineStyle}
          fill='red'
          shape={<span />}
        />
      }
      {normHigh &&
        <Scatter
          data={[{ x: xRange.min, y: normHigh }, {x: xRange.max, y: normHigh}]}
          line={normLineStyle}
          fill='red'
          shape={<span />}
        />
      }
      <Scatter data={data} fill='blue' line shape='circle' />
      <Tooltip />
    </ScatterChart>
  )
}

export default LabChart
