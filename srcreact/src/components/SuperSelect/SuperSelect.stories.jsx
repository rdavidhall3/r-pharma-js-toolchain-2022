import React from 'react'
import SuperSelect from './SuperSelect'
import { testItems } from './data/test-data'

export default {
  title: 'SuperSelect',
  component: SuperSelect
}

const Template = args => <SuperSelect {...args} />

export const NormalCase = Template.bind({})
NormalCase.args = {
  elements: testItems,
  onChange: selected => {
    console.log(selected)
  }
}
