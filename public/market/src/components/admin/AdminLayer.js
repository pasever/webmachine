////////////////////////////////////////////////////////
////   Administrative layer providing workitem    /////
///            management features               /////
/////////////////////////////////////////////////////

import React, { Component } from 'react';
import Create from './buttons/Create';
import Modal from './Modal';

const AdminLayer = ({ modalData, modalHandler }) => (
  <div>
    {/* Triggers modal in 'create' mode */}
    <Create 
      modalHandler={modalHandler}
    />
    {/* Contains forms for creating and editing workitems */}
    <Modal
      {...modalData}
    />
  </div>
)

export default AdminLayer;
