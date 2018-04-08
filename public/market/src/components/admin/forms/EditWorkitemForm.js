import React, { Component }             from 'react';
import moment                           from 'moment';
import axios                            from 'axios';
import config                           from '../../../../../../config';
const { edit_issue_url }                = config.init().githubrepo;

export default class EditWorkitemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repo: this.props.repo,
      number: this.props.issue.number,
      title: this.props.issue.title,
      price: this.props.issue.price,
      duration: +this.props.issue.duration,
      stage: this.props.issue.stage,
      assignee: this.props.issue.assignee,
      description: this.props.issue.body,
    };

    // component method bindings
    this.handleChange = this.handleChange.bind(this);
    this.liveValidation = this.liveValidation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let { number, title, price, duration, stage, assignee, body } = nextProps.issue;
    this.setState({ title, price, duration, stage, assignee, description: body });
  }

  calculateDueDate() {
    let dateFormat = 'MMMM D, YYYY, h:mm:ss a';
    let duration = this.state.duration;
    // Calculate due date by adding X days to today's date.
    let dueDate = moment().add(duration, 'days').format(dateFormat);
    // Set due time at 11:59:00 PM
    dueDate = new Date(dueDate).setHours(23, 59, 0);
    // Format final dueDate
    dueDate = moment(dueDate).format(dateFormat);
    return dueDate;
  }

  handleChange(e) {
    if(e.target.id === 'stage' || e.target.id === 'assignee')
      this.liveValidation(e.target.id, e.target.value);
    this.setState({[e.target.id]: e.target.value});
  }

  liveValidation(id, value) {
    /* Enforces the following rules:
      - IF STAGE == OPEN ASSIGNEE FIELD IS DISABLED
      - IF STAGE == ASSIGNED OR CLOSED, ASSIGNEE FIELD IS
        UNLOCKED AND IT BECOMES REQUIRED
      - IF STAGE CHANGES BACK TO OPEN, ASSIGNEE FIELD IS
        DISABLED AND ITS VALUE CLEARED
    */
    let stage = document.getElementById('stage');
    let assignee = document.getElementById('assignee');
    console.log(id, value);
    if (id === 'stage' && (value === 'active' || value === 'closed')) {
      assignee.removeAttribute('disabled');
      assignee.required = true;
      console.log(`stage = ${value}; assignee cannot be empty`);
      // assignee.value = this.state.assignee;
    } else if (id === 'assignee' && (this.state.stage === 'active' || this.state.stage === 'closed')) {
      console.log(`stage = ${this.state.stage}; assignee cannot be empty`);
    } else if (id === 'stage' && value === 'open') {
      console.log('here');
      this.state.assignee = null;
      assignee.setAttribute('disabled', 'disabled');
      assignee.required = false;
    }

    // if stage changes to open and assignee field has value, clear it

    if(id === 'assignee' && stage.value === 'open') {
      console.log('if stage is open, assignee must be empty');
      assignee.value = '';
    } 
  }

  handleSubmit(e) {
    e.preventDefault();
    let endpoint = `${edit_issue_url}/${this.state.repo}`;
    // Make PUT request and send edits to server
    axios.put(endpoint, this.state) 
      .then(res => {
        console.log(res.data);
        // if the request is successful, reset the form
        // and show a success alert for 3 secons
        this.resetForm();
        document.getElementById('successAlert').style.display = '';
        setTimeout(function hideAlert(){
          document.getElementById('successAlert').style.display = 'none';
        }, 3000);
      })
      .catch(err => {
        // if there is an error, catch it and
        // log it to the console. (Preferably, let user
        // know)
        console.log(err);
      })
  }

  resetForm() {
    this.setState({
      number: '',
      title: '',
      price: '',
      stage: '',
      duration: '',
      assignee: '',
      description: ''
    });
  }
  
  render() {
    // console.log(this.props);
    let { title, price, stage, assignee, duration, description } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div id="successAlert" className="alert alert-success" role="alert"
          style={{display: 'none'}}
        >
          Workitem updated.
        </div>
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
            <label htmlFor="duration">Duration (days)</label>
            <input onChange={this.handleChange} type="text" value={duration} className="form-control" id="duration"
            />
          </div>
        </div>
        <div className="form-group text-center">
          <p><strong>Expected delivery date: {this.calculateDueDate()}</strong></p>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="price">Stage</label>
            <select id="stage" className="form-control" value={stage === 'active' ? 'active' : stage} onChange={this.handleChange} >
              <option value="open">open</option>
              <option value="active">active</option>
              <option value="closed">closed</option>
            </select>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="duration">Assignee</label>
            <input onChange={this.handleChange} type="text" value={assignee === null ? '' : assignee} className="form-control" id="assignee" disabled
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
