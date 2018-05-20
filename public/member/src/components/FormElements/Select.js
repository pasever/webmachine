import React from 'react';

/**
 * @prop {String} id - used to set id of <select> tag
 * @prop {Array} options - one <option> tag rendered for each element
 */

const Select = ({ id, options, value, handleInput }) => 
  <select
    className='form-control'
    id={ id }
    value={ value }
    onChange={ handleInput }
  >
    {options.map((opt, i) =>
      <option key={opt.name}>{ opt.abbreviation }</option>
    )}
  </select>

export default Select;