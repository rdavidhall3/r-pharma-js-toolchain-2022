import React from 'react'
import CheckBoxGroups from './CheckBoxGroups'
import { testItems } from './data/test-data'

export default {
  title: 'CheckBoxGroups',
  component: CheckBoxGroups
}

const Template = args => <CheckBoxGroups {...args} />

export const NoInitialSelections = Template.bind({})
NoInitialSelections.args = {
  elements: testItems,
  selectedItems: [],
  onChange: (groupLabel, selected) => {
    console.log(groupLabel)
    console.log(selected)
  }
}

export const WithInitialSelections = Template.bind({})
WithInitialSelections.args = {
  elements: testItems,
  selectedItems: ['BASOSI', 'LDLSI', 'AMYLSI'],
  onChange: (groupLabel, selected) => {
    console.log(groupLabel)
    console.log(selected)
  }
}
