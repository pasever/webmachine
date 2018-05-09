import React from 'react';

// let isRequired = prop => prop ? 'required' : null

const Input = ({ inputType, id, placeholder, value, handleInput }) =>
  <input
    className='form-control'
    type={ inputType }
    id={ id ? id : '' }
    placeholder={ placeholder ? placeholder : '' }
    value={ value }
    onChange={handleInput}
  />

export default Input;