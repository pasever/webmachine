import React from 'react';

const Input = ({ inputType, id, placeholder }) =>
  <input
    className='form-control'
    type={inputType}
    id={ id ? id : '' }
    placeholder={placeholder ? placeholder : ''}
  />

export default Input;