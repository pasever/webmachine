import React, { Component } from 'react';

export default class EditWorkitemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'workitem-title',
      price: 1,
      duration: 5,
      stage: 'open',
      assignee: '...',
      description: 'workitem-description'
    };

    // component method bindings
    this.handleChange = this.handleChange.bind(this);
    this.liveValidation = this.liveValidation.bind(this);
    this.handleSubmit = this.handleChange.bind(this);
  }

  liveValidation() {
    //IF STAGE == ASSIGNED, ASSIGNEE CANNOT BE EMPTY
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('submitted');
  }
  
  render() {
    let { title, price, stage, assignee, duration, description } = this.state;
    console.log(this.state);
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input onChange={this.handleChange} type="text" value={title} className="form-control" id="title"/>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="price">Price</label>
            <input onChange={this.handleChange} type="number" value={price} className="form-control" id="price"/>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="duration">Duration</label>
            <input onChange={this.handleChange} type="number" value={duration} className="form-control" id="duration"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="price">Stage</label>
            <select id="stage" className="form-control" onChange={this.handleChange} defaultValue={stage}>
              <option value="open">open</option>
              <option value="assigned">assigned</option>
              <option value="closed">closed</option>
            </select>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="duration">Assignee</label>
            <input onChange={this.handleChange} type="text" value={assignee} className="form-control" id="assignee"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            onChange={this.handleChange}
            className="form-control"
            id="description"
            style={{overflow: 'auto', resize: 'none'}}
            value={description}
            rows="3"
          ></textarea>
        </div>
         {/* Using modal footer as form footer because it works */}
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </form>
    )
  }
}
