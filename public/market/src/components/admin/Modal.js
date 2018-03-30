import React, { Component } from 'react';
import WorkitemForm from './WorktitemForm';
import EditWorkitemForm from './EditWorkitemForm';


const Modal = (props) => {
  // By default, we assume that the issue # displayed in the Modal
  // is the # of the new issue to be created. However, if an issue
  // object is being passed as a prop, we know it's because the modal 
  // has been triggered in edit mode, and so we'll display the # of
  // the issue being edited.
  let issueNumber = props.issueNumber;
  if(props.issue) {
    issueNumber = props.issue.number;
  }
  return (
    <div className="modal fade" id="createWorkitem" tabIndex="-1" role="dialog" aria-labelledby="createWorkitemLabel"     aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="createWorkitemLabel">
              Work Item #{issueNumber}
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            {/* {console.log(props)} */}
          </div>
          <div className="modal-body">
            {/* conditionally render forms here */}
            {props.triggeredBy === 'create' ? (
              <WorkitemForm
                {...props} 
              />
            ) : (
              <EditWorkitemForm
                issue={props.issue}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Modal;