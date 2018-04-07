import React, { Component } from 'react';
import Create from './buttons/Create';
import Modal from './Modal';

const AdminLayer = ({ modalData, modalHandler }) => (
  <div>
    {/* Triggers modal in 'create' mode */}
    <Create 
      modalHandler={modalHandler}
    />
    {/* Contains form for creatin and editing workitems */}
    <Modal
      {...modalData}
    />
  </div>
)

export default AdminLayer;
