import React from 'react'
import MultiLabChart from './MultiLabChart'
import { testData1 } from './data/test-data-1'
import { testData5 } from './data/test-data-5'
import { testData20 } from './data/test-data-20'
import { testData } from './data/test-data'

export default {
  title: 'MultiLabChart',
  component: MultiLabChart
}

const Template = args => <MultiLabChart {...args} />

export const OneChart = Template.bind({})
OneChart.args = {
  data: testData1
}

export const FiveCharts = Template.bind({})
FiveCharts.args = {
  data: testData5
}

export const TwentyCharts = Template.bind({})
TwentyCharts.args = {
  data: testData20
}

export const AllCharts = Template.bind({})
AllCharts.args = {
  data: testData
}
