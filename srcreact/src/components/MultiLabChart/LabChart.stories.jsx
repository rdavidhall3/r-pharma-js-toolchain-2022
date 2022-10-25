import React from 'react'
import LabChart from './LabChart'

export default {
  title: 'LabChart',
  component: LabChart
}

const Template = args => <LabChart {...args} />

export const NormalCase = Template.bind({})
NormalCase.args = {
  data: [{ x: 5, y: 23 }, { x: 7, y: 22}, { x: 15, y: 25}, { x: 21, y: 30}, { x: 30, y: 37 }, { x: 42, y: 35}],
  normLow: 17,
  normHigh: 32,
  chartHeight: 100,
  chartWidth: 300
}
