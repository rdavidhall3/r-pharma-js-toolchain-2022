import React, { useState, useEffect } from 'react'
import { objectToArray } from 'array-object-transformer'
import LabChart from './LabChart.jsx'

// CSS styling for outer-most DIV
const outerDivStyle = {
  display: 'flex',
  flexWrap: 'wrap'
}

// CSS styling for inner plot DIVs
const innerDivStyle = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#eeeeee',
  margin: '5px'
}

// CSS styling for chart titles
const titleStyle = {
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '5px'
}

// Minimum plot height
const minHeight = 100

/**
 * Compute width and height for charts such that they mostly
 * fit on a single screen, take as much real estate as possible
 * on the screen, and are not too small.
 * @param {number} numCharts Number of charts to render.
 * @returns Object with width and height attributes.
 */
const computeChartDimensions = (numCharts, screenSize) => {
  const screenArea = screenSize.width * screenSize.height
  const aspectRatio = screenSize.width / screenSize.height
  const chartArea = screenArea / numCharts
  let chartHeight = Math.sqrt(chartArea / aspectRatio) * 0.75
  if (chartHeight < minHeight) {
    chartHeight = minHeight
  }
  const chartWidth = chartHeight * aspectRatio * 0.75
  return {
    width: chartWidth,
    height: chartHeight
  }
}

/**
 * Render a grid of charts for one or more lab tests.
 * @param {object} An object containing data to plot.  This object
 * will contain a number of arrays, each of which maps to a column
 * in the upstream R data frame.
 * @returns JSX.
 */
const MultiLabChart = ({ data }) => {

  /**
   * Look up current screen size.
   * @returns An object with width and height attributes.
   */
  const getScreenSize = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  // Save screen size as state to trigger re-rendering upon resize
  const [screenSize, setScreenSize] = useState(getScreenSize())

  // Effect to trigger resize
  useEffect(() => {

    // Used to throttle back re-renders so they only occur when user
    // has finished resizing
    let timeoutId = null

    /**
     * Event handler for resize events
     */
    const handleResize = () => {

      // Remove existing re-renders from queue
      clearTimeout(timeoutId)

      // Schedule a re-render
      timeoutId = setTimeout(() => {
        setScreenSize(getScreenSize())
      }, 500)
    }

    window.addEventListener('resize', handleResize)
  })

  // Transform data from an object of arrays to an array of objects
  const aData = objectToArray(data)

  // Split data by lab param
  const groups = aData.reduce((cumulative, item) => {
    if (!(item.PARAMCD in cumulative)) {
      cumulative[item.PARAMCD] = []
    }
    item.x = item.ADY
    item.y = item.AVAL
    cumulative[item.PARAMCD].push(item)
    return cumulative
  }, {})

  // Compute individual plot dimensions
  const numCharts = Object.keys(groups).length
  const chartDimensions = computeChartDimensions(numCharts, screenSize)

  // Render page
  return (
    <div style = {outerDivStyle}>
      {
        Object.keys(groups).map(paramcd => {
          const data = groups[paramcd]
          const param = data[0].PARAM
          const normLow = data[0].ANRLO
          const normHigh = data[0].ANRHI
          return (
            <div style={innerDivStyle} key={paramcd}>

              {/* Plot title */}
              <div style={titleStyle}>
                <div style={{width: chartDimensions.width}}>
                  {param}
                </div>
              </div>

              {/* Plot */}
              <LabChart
                data={data}
                normLow={normLow}
                normHigh={normHigh}
                chartWidth={chartDimensions.width}
                chartHeight={chartDimensions.height}
              />
            </div>
          )
        })
      }
    </div>
  )
}

export default MultiLabChart
