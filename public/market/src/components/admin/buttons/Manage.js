import React from 'react';

const Manage = ({ wiNumber, modalHandler }) => (
  <button
    onClick={() => modalHandler('manage', wiNumber)} 
    number={wiNumber}
    type="button"
    className=""
    data-toggle="modal"
    data-target="#createWorkitem"
    style={{position: 'absolute', top: 0, right: 0, margin: 0, background: 'none', border: 'none',margin: '5px 5px 2px 0', outline: 'none'}}
  >
    <i className="fas fa-edit" style={{color: '#333'}}></i>
  </button>
);

export default Manage;