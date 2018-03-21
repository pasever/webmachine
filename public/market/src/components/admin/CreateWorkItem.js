import React, { Component } from 'react';
import axios from 'axios';
import Button from './Button';
import Modal from './Modal';

const CreateWorkitem = ({ modalData }) => (
  <div>
    {/* Triggers modal */}
    <Button />
    {/* Contains form for adding workitems */}
    <Modal
      {...modalData}
    />
  </div>
)

export default CreateWorkitem;
