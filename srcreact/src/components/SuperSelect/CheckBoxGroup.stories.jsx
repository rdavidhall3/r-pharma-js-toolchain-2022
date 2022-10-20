import React from 'react'
import CheckBoxGroup from './CheckBoxGroup'

export default {
  title: 'CheckBoxGroup',
  component: CheckBoxGroup
}

const Template = args => <CheckBoxGroup {...args} />

export const NoInitialSelections = Template.bind({})
NoInitialSelections.args = {

}
