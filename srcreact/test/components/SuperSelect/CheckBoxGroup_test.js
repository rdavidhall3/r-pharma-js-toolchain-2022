import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import CheckBoxGroup from '../../../src/components/SuperSelect/CheckBoxGroup'

// Group label for checkboxgroup
const groupLabel = "FooBar"

// Items in checkboxgroup
const items = [
  {
    label: 'Foo',
    value: 'foo'
  },
  {
    label: 'Bar',
    value: 'bar'
  }
]

// Dummy event handler
const handleOnChange = () => "Do nothing"

// Render a checkboxgroup
const setUpTests = selectedItems => {
  render(
    <CheckBoxGroup 
      groupLabel={groupLabel}
      items={items}
      selectedItems={selectedItems}
      onChange={handleOnChange}
    />
  )
}

// Run the tests
describe("<CheckBoxGroup />", () => {

  // Test 1
  test("Should render correctly with no items selected", () => {
    setUpTests([])

    // Verify group label rendered correctly
    expect(screen.getByLabelText(groupLabel)).toBeInTheDocument()
    expect(screen.getByLabelText(groupLabel)).not.toBeChecked()

    // Verify each item rendered correclty
    items.forEach(item => {
      const checkbox = screen.getByLabelText(item.label)
      expect(checkbox).toBeInTheDocument()
      expect(checkbox).not.toBeChecked()
    })
  })

  // Test 2
  test("Should render correctly with one item selected", () => {
    const selectedItems = ['foo']
    setUpTests(selectedItems)

    // Verify group label rendered correctly
    expect(screen.getByLabelText(groupLabel)).toBeInTheDocument()
    expect(screen.getByLabelText(groupLabel)).not.toBeChecked()

    // Verify each item rendered correclty
    items.forEach(item => {
      const checkbox = screen.getByLabelText(item.label)
      expect(checkbox).toBeInTheDocument()
      if (selectedItems.includes(item.value)) {
        expect(checkbox).toBeChecked()
      } else {
        expect(checkbox).not.toBeChecked()
      }
    })
  })

  // Test 3
  test("Should render correctly with all items selected", () => {
    const selectedItems = ['foo', 'bar']
    setUpTests(selectedItems)

    // Verify group label rendered correctly
    expect(screen.getByLabelText(groupLabel)).toBeInTheDocument()
    expect(screen.getByLabelText(groupLabel)).toBeChecked()

    // Verify each item rendered correclty
    items.forEach(item => {
      const checkbox = screen.getByLabelText(item.label)
      expect(checkbox).toBeInTheDocument()
      if (selectedItems.includes(item.value)) {
        expect(checkbox).toBeChecked()
      } else {
        expect(checkbox).not.toBeChecked()
      }
    })
  })

  // Test 4
  test("Select-all checkbox works", () => {
    const selectedItems = []
    setUpTests(selectedItems)

    // Verify all item checkboxes unchecked
    items.forEach(item => {
      expect(screen.getByLabelText(item.label)).not.toBeChecked()
    })

    // Click select-all
    const selectAll = screen.getByLabelText(groupLabel)
    fireEvent.click(selectAll)

    // Verify all item checkboxes checked
    items.forEach(item => {
      expect(screen.getByLabelText(item.label)).toBeChecked()
    })

    // Click select-all again
    fireEvent.click(selectAll)

    // Verify all item checkboxes unchecked
    items.forEach(item => {
      expect(screen.getByLabelText(item.label)).not.toBeChecked()
    })
  })

  // Test 5
  test("Select-all auto-checked when all items checked", () => {
    setUpTests([])

    // Verify select-all initiall unchecked
    const selectAll = screen.getByLabelText(groupLabel)
    expect(selectAll).not.toBeChecked()

    // Select all items
    items.forEach(item => {
      fireEvent.click(screen.getByLabelText(item.label))
    })

    // Verify select-all checked
    expect(selectAll).toBeChecked()

    // Unclick an item
    fireEvent.click(screen.getByLabelText(items[0].label))

    // Verify select-all unchecked
    expect(selectAll).not.toBeChecked()
  })
})
