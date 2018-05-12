import React from 'react';

/**
 * @prop {String} id - used to set id of <select> tag
 * @prop {Array} options - one <option> tag rendered for each element
 */

const Select = ({ id, options, handleInput }) => 
  <select
    className='form-control'
    id={id}
  >
    {options.map((opt, i) =>
      <option key={i} onChange={handleInput}>{ opt }</option>
    )}
  </select>

export default Select;