import React from 'react'

const CreateWorkitem = ({ user, repo, issueNumber }) => (
  <div>
    {/* Button  */}
    <button
      type="button"
      className="btn btn-secondary"
      style={{display: 'block', margin: '0 auto'}}
      data-toggle="modal"
      data-target="#createWorkitem"
    >
      Create Work Item
    </button>

    {/* Modal */}
    <div className="modal fade" id="createWorkitem" tabIndex="-1" role="dialog" aria-labelledby="createWorkitemLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createWorkitemLabel">
                Work Item# {issueNumber}
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* <p>This will be issue number {issueNumber}</p>
              <p>User: {user}, Repo: {repo}</p> */}
              <form>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="workitemTitle">Title</label>
                    <input type="text"className="form-control" id="workitemTitle" />
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="workitemPrice">Price</label>
                    <input type="text" className="form-control" id="workitemPrice" />
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="workitemDuration">Duration</label>
                    <input type="number" className="form-control" id="workitemDuration"
                      placeholder="days"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="workitemDescription">Description</label>
                  <textarea 
                    className="form-control"
                    id="workitemDescription"
                    style={{overflow: 'auto', resize: 'none'}}
                    placeholder="optional"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">Create</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
  </div>
)

export default CreateWorkitem;