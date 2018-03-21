import React from 'react';
import WorkitemForm from './WorktitemForm';

const Modal = ({ user, repo, issueNumber, handleChange, submitForm }) => (
  <div className="modal fade" id="createWorkitem" tabIndex="-1" role="dialog" aria-labelledby="createWorkitemLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="createWorkitemLabel">
            Work Item# { issueNumber }
          </h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <WorkitemForm 
            handleChange={handleChange}
          />
        </div>
        <div className="modal-footer">
          <button type="button" onClick={submitForm} className="btn btn-primary">Create</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
);

export default Modal;