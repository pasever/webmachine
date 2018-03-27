import React from 'react';

const Manage = ({ wiNumber }) => (
  <button 
    number={wiNumber}
    type="button"
    className="btn btn-outline-primary btn-sm btn-block"
    data-toggle="modal"
    data-target="#createWorkitem"
  >
    Manage
  </button>
);

export default Manage;