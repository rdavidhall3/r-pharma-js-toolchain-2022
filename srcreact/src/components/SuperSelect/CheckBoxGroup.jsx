import React, {useState} from 'react'

// CSS styles for main DIV
const groupStyle = {
  display: 'flex',
  flexDirection: 'column'
}

// CSS styles for group label
const labelStyle = {
  fontWeight: 'bold'
}

// CSS styles for individual items
const itemStyle = {
  display: 'flex',
  position: 'relative',
  left: '20px'
}

/**
 * A React component that renders a group of checkboxes with a de/select-all parent
 * checkbox.
 * 
 * @param {string} Label for the entire group that is rendered beside the de/select-all
 * checkbox.
 * @param {array} items Objects with label and value properties for which checkboxes
 * are rendered.
 * @param {array} selectedItems Value property of items that should be pre-selected.
 * @param {function} onChange A callback function that accepts two arguments consisting
 * of the group label and an array of currently-selected item values.
 * 
 * @returns JSX.
 */
const CheckBoxGroup = ({groupLabel, items, selectedItems, onChange}) => {

  /**
   * Determines if all items have been individually selected.
   * @param {array} selections Array of item.item values that have been selected.
   * @returns T/F
   */
   const allItemsSelected = selections => {
    let status = true
    items.forEach(item => {
      if (!selections.includes(item.value)) {
        status = false
      }
    })
    return status
  }

  // State of de/select-all checkbox
  const [allSelected, setAllSelected] = useState(allItemsSelected(selectedItems))

  // State consisting of an array of currently selected item values
  const [selected, setSelected] = useState(selectedItems)

  /**
   * Event handler for de/select-all checkbox.
   * @param {object} e JavaScript-generated event.
   */
  const handleChangeSelectAll = e => {
    setAllSelected(e.target.checked)
    const newSelected = e.target.checked? items.map(item => item.value) : []
    setSelected(newSelected)
    onChange(groupLabel, newSelected)
  }

  /**
   * Event handler for item checkboxes.
   * @param {object} e JavaScript-generated event.
   */
  const handleChangeSelectItem = e => {
    let newSelected = []
    if (e.target.checked) {
      newSelected = [...selected, e.target.dataset.itemvalue]
    }
    else {
      newSelected = [...selected.filter(itemVal => e.target.dataset.itemvalue !== itemVal)]
      setAllSelected(false)
    }
    setSelected(newSelected)
    setAllSelected(allItemsSelected(newSelected))
    onChange(groupLabel, newSelected)
  }

  // Render
  return (
    <div style={groupStyle}>

      {/* Group label and de/select-all checkbox */}
      <div style={labelStyle}>
        <label>
          <input
            type='checkbox'
            checked={allSelected}
            onChange={handleChangeSelectAll}
          />
          {groupLabel}
        </label>
      </div>

      {/* Individual items checkbox */}
      <div>
        {
          items.map(item => {
            return (
              <div style={itemStyle} key={item.value}>
                <label>
                  <input
                    type='checkbox'
                    checked={selected.includes(item.value)}
                    onChange={handleChangeSelectItem}
                    data-itemvalue={item.value}
                  />
                  {item.label}
                </label>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default CheckBoxGroup
