import React from 'react'
import CheckBoxGroup from './CheckBoxGroup.jsx'

// CSS styles for main DIV
const groupsStyle = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  minWidth: '800px',
  maxHeight: '80vh'
}

// CSS styles for individual CheckBoxGroup components
const groupStyle = {
  margin: '10px'
}

/**
 * A React component that renders a set of CheckBoxGroup components
 * column-wise.
 * 
 * @param {array} elements Objects of the structure expected by CheckBoxGroup.
 * @param {array} selectedItems Strings equivalent to item.value.
 * @param {function} onChange A callback function that accepts two arguments consisting
 * of a group label and an array of currently-selected item values.
 * 
 * @returns JSX
 */
const CheckBoxGroups = ({elements, selectedItems, onChange}) => {
  
  return (
    <div style={groupsStyle}>
      {
        elements.map(element => {
          const selected = []
          element.items.forEach(item => {
            if (selectedItems.includes(item.value)) {
              selected.push(item.value)
            }
          })
          return (
            <div style={groupStyle} key={element.groupLabel}>
              <CheckBoxGroup
                groupLabel={element.groupLabel}
                items={element.items}
                selectedItems={selected}
                onChange={onChange}
              />
            </div>
          )
        })
      }
    </div>
  )
}

export default CheckBoxGroups
