import React, { Component } from 'react';
import WorkitemForm from './WorktitemForm';


const Modal = (props) => (
  <div className="modal fade" id="createWorkitem" tabIndex="-1" role="dialog" aria-labelledby="createWorkitemLabel"     aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="createWorkitemLabel">
            Work Item #{ props.issueNumber }
          </h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {/* Form needs props to POST */}
          <WorkitemForm
            {...props}
          />
        </div>
      </div>
    </div>
  </div>
);

export default Modal;