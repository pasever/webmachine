import React from 'react';

const Alert = ({ type, msg }) => (
  <div className={`alert alert-${type}`} role="alert">
    {msg}
  </div>
)

export default Alert;
