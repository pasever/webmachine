import React from 'react';

/**
 * @prop {String} id - used to set id of <select> tag
 * @prop {Array} options - one <option> tag rendered for each element
 */

const Select = ({ id, options, handleInput }) => 
  <select
    className='form-control'
    id={id}
    onChange={handleInput}
  >
    {options.map((opt, i) =>
      <option key={i}>{ opt }</option>
    )}
  </select>

export default Select;