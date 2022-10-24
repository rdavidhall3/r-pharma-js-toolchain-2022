import React from 'react'
import CheckBoxGroup from './CheckBoxGroup'

export default {
  title: 'CheckBoxGroup',
  component: CheckBoxGroup
}

const Template = args => <CheckBoxGroup {...args} />

export const NoInitialSelections = Template.bind({})
NoInitialSelections.args = {
  groupLabel: 'FooBar',
  items: [
    {
      label: 'Foo',
      value: 'foo'
    },
    {
      label: 'Bar',
      value: 'bar'
    }
  ],
  selectedItems: [],
  onChange: (groupLabel, selected) => {
    console.log(groupLabel)
    console.log(selected)
  }
}

export const WithInitialSelections = Template.bind({})
WithInitialSelections.args = {
  groupLabel: 'FooBar',
  items: [
    {
      label: 'Foo',
      value: 'foo'
    },
    {
      label: 'Bar',
      value: 'bar'
    }
  ],
  selectedItems: ['foo'],
  onChange: (groupLabel, selected) => {
    console.log(groupLabel)
    console.log(selected)
  }
}

export const AllSelected = Template.bind({})
AllSelected.args = {
  groupLabel: 'FooBar',
  items: [
    {
      label: 'Foo',
      value: 'foo'
    },
    {
      label: 'Bar',
      value: 'bar'
    }
  ],
  selectedItems: ['foo', 'bar'],
  onChange: (groupLabel, selected) => {
    console.log(groupLabel)
    console.log(selected)
  }
}
