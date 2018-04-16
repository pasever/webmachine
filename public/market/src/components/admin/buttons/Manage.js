import React from 'react';

const Manage = ({ wiNumber, modalHandler }) => (
  <button
    onClick={() => modalHandler('manage', wiNumber)} 
    number={wiNumber}
    type="button"
    className="edit-workitem"
    data-toggle="modal"
    data-target="#createWorkitem"
  >
    <i className="fas fa-edit"></i>
  </button>
);

export default Manage;