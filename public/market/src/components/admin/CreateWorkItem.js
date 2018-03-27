import React, { Component } from 'react';
import Create from './buttons/Create';
import Modal from './Modal';

const CreateWorkitem = ({ modalData, modalHandler }) => (
  <div>
    {/* Triggers modal */}
    <Create 
      modalHandler={modalHandler}
    />
    {/* Contains form for adding workitems */}
    <Modal
      {...modalData}
    />
  </div>
)

export default CreateWorkitem;
