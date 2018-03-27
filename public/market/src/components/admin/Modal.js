import React, { Component } from 'react';
import WorkitemForm from './WorktitemForm';
import EditWorkitemForm from './EditWorkitemForm';


const Modal = (props) => (
  <div className="modal fade" id="createWorkitem" tabIndex="-1" role="dialog" aria-labelledby="createWorkitemLabel"     aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="createWorkitemLabel">
            {/* condition here too; display # of new wi or wi being edited. manage btn has wi # */}
            Work Item #{ props.issueNumber }
          </h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          {console.log(props)}
        </div>
        <div className="modal-body">
          {/* conditionally render forms here */}
          {props.triggeredBy === 'create' ? (
            <WorkitemForm
              {...props} 
            />
          ) : (
            <EditWorkitemForm />
          )}
          {/* Form needs props to POST */}
          
        </div>
      </div>
    </div>
  </div>
);

export default Modal;