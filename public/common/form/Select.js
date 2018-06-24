import React from 'react';

/**
 * @prop {String} id - used to set id of <select> tag
 * @prop {Array} options - one <option> tag rendered for each element
 * @prop { Function } handleInput - handles the selection of options
 * @prop { String } size - how many elems to display at once.  Optional - dropdown if missing 
 */

export const Select = ({ id, options, itemClick, selectClick, size }) => 
  <select
    className='form-control'
    id={id}
    size={size}
    multiple="multiple"
    onChange={ selectClick }
  >
    {options.map((opt, i) =>
      <option key={i} onClick={itemClick} value={opt}>{ opt }</option>
    )}
  </select>

