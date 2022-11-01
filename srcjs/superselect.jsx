import { reactShinyInput } from 'reactR';
import SuperSelect from '../srcreact/src/components/SuperSelect/SuperSelect.jsx';

/**
 * Glue code to connect our React components to the R input.  Note that
 * this code runs in the browser and communicates with Shiny like any other
 * input.
 *
 * @param configuration An object containing parameters to pass from
 * R to the React components.
 * @param value Initial value.  Will be null in this case.
 * @param setValue Callback to propagate input changes back to R.
 */
const input = ({ configuration, value, setValue }) => {
  return(
    <div>
      <SuperSelect
        elements={configuration.elements}
        onChange={selected => setValue(selected)}
      />
    </div>
  )
}

reactShinyInput('.superselect', 'jsdemo.superselect', input);
