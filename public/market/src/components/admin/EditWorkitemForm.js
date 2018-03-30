import React, { Component } from 'react';

export default class EditWorkitemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      price: '',
      stage: '',
      due_date: '',
      assignee: '',
      description: '',
      issueLoaded: false
    };

    // component method bindings
    this.handleChange = this.handleChange.bind(this);
    this.liveValidation = this.liveValidation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    // if, after an update (a re-render), the issue prop is an object, meaning it's not empty,
    // AND if that object has not been loaded into state, load it into state.
    if(typeof this.props.issue === 'object' && this.state.issueLoaded === false) {
      this.setState({
        title: this.props.issue.title,
        price: this.props.issue.price,
        due_date: this.props.issue.due_date,
        stage: this.props.issue.stage,
        assignee: this.props.issue.assignee,
        description: this.props.issue.body,
        issueLoaded: true
      });
    }
  }

  liveValidation() {
    //IF STAGE == ASSIGNED, ASSIGNEE CANNOT BE EMPTY
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    let endpoint = '';
    axios.put() 
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  render() {
    let { title, price, stage, assignee, due_date, description } = this.state;
    // console.log(typeof this.props.issue);
    // console.log(this.props.issue);
    // console.log(this.state)
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
            <label htmlFor="duration">Due Date</label>
            <input onChange={this.handleChange} type="text" value={due_date} className="form-control" id="duration"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="price">Stage</label>
            <select id="stage" className="form-control" value={stage === 'active' ? 'assigned' : stage} onChange={this.handleChange} >
              <option value="open">open</option>
              <option value="assigned">assigned</option>
              <option value="closed">closed</option>
            </select>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="duration">Assignee</label>
            <input onChange={this.handleChange} type="text" value={assignee === null ? '' : assignee} className="form-control" id="assignee"
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
