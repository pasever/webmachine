import React, { Component } from 'react';
import WorkitemForm from './WorktitemForm';
import EditWorkitemForm from './EditWorkitemForm';

// If you're struggling to understand "what is happening here", 
// scroll to the bottom of this file for elucidating commentaries
// on the behavior of this component.

const Modal = (props) => {
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
            {/* conditionally render forms */}
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

/*
  *The Modal can display two possible issue numbers in its header*:
  The to-be issue# of an issue being created (assuming "Create Work Item 
  was clicked"), OR the issue# of an existing issue (assuming "Manage/Edit" 
  was clicked from within a Work Item card).

  Moreover, this Modal receives two props whose names can seem confusing
  at first glance: isssueNumber and issue. issueNumber[prop] is a Number.
  issue[prop] is an Object (whenever it is received). HOWEVER, upon initial mounting,
  issue[prop] will be an empty string, which JavaScript evaluates to a falsy value.
  Whenever an admin clicks on the button to edit a work item card (an issue, ultimately),
  a method, and with it a sequence of operations, will be triggered and an object with
  the data of the issue to be edited will be saved into the Highest Order Component's (HOC) state;
  this altering of state (at the highest level) will trigger a "cascading re-render",
  starting at the HOC and propagating to all of its children (this Modal being one of them).
  At this point (whenever this happens), Modal will receive the issue[prop] not as an empty
  string, but as an object, which JavaScript will evaluate as a truthy value.

  Lines 23-26 attempt to determine which issue# to display in the Modal's header;
  "is it a new work item, or is it an existing one being edited?"
*/