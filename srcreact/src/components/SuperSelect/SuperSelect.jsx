import React, { useState } from 'react'
import Modal from 'react-modal'
import CheckBoxGroups from './CheckBoxGroups.jsx'

// CSS styles for modal dialog.
const style = {
  content: {
    width: 'fit-content',
    height: 'fit-content'
  }
}

/**
 * A React component that provides a button opening a modal dialog allowing
 * users to select items from groups of checkboxes.
 * 
 * @param {array} Objects of the structure expected by CheckBoxGroup.
 * @param {onChange} A callback function accepting a single argument containing
 * selected item.value values that is triggered when the modal dialog is closed.
 * 
 * @returns JSX
 */
const SuperSelect = ({ elements, onChange }) => {

  // State determining whether the modal is visible or not
  const [isVisible, setIsVisible] = useState(false)

  // State holding an object who attributes map to check box
  // group labels and whose values are arrays of selected item.value values
  const [selectedItems, setSelectedItems] = useState({})

  /**
   * Event handler for when open button is clicked.
   */
  const handleOpenButtonClick = () => {
    setIsVisible(true)
  }

  /**
   * Event handler for when close button is clicked.
   */
  const handleCloseButtonClick = () => {
    setIsVisible(false)
    const selected = extractSelectedList(selectedItems)
    onChange(selected)
  }

  /**
   * Helper function to extract selected item.value values
   * from the selectedItems state as an array.
   * 
   * @param {object} selectedItems The selectedItems state object.
   * @returns An array containing selected item.value values.
   */
  const extractSelectedList = selectedItems => {
    return Object.keys(selectedItems).reduce((cumulative, groupLabel) => {
      return cumulative.concat(selectedItems[groupLabel])
    }, [])
  }

  /**
   * Callback function to pass to the CheckBoxGroups nested component that is
   * triggered each time the user de/selects and checkbox.
   * @param {string} groupLabel A checkbox group label.
   * @param {*} itemValues The item.value values associated with selected
   * checkboxes.
   */
  const onSelectionsChange = (groupLabel, itemValues) => {
    const newSelectedItems = Object.assign({}, selectedItems)
    newSelectedItems[groupLabel] = itemValues
    setSelectedItems(newSelectedItems)
  }

  // Render
  return (
    <div>
      <button type='button' onClick={handleOpenButtonClick}>Select Items</button>
      <Modal isOpen={isVisible} style={style} ariaHideApp={false}>
        <CheckBoxGroups elements={elements} selectedItems={extractSelectedList(selectedItems)} onChange={onSelectionsChange} />
        <button type='button' onClick={handleCloseButtonClick}>Close</button>
      </Modal>
    </div>
  )
}

export default SuperSelect
