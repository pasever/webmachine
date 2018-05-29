import React from 'react';

/**
 * @prop {String} inputType
 * @prop {String} id
 * @prop {String} placeholder
 * @prop {String} value
 * @prop {Function} handleInput - updates state of parent component onChange
 */

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