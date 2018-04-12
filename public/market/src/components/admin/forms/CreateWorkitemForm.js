
////////////////////////////////////////////////
/////   Form for CREATING a new Workitem   /////
////////////////////////////////////////////////

import React, { Component }         from 'react';
import axios                        from 'axios';
import config                       from '../../../../../../config';
import Alert                        from './Alert';

const { create_issue_url }          = config.init().githubrepo;

class CreateWorkitemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // issueNumber: this.props.issueNumber,
      title: '',
      repo: this.props.repo,
      price: '',
      duration: '',
      description: '',
      errors: false
    }

    // component method bindings
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  submitForm(e) {
    // Attach issue number to work item object*
    this.state.issueNumber = this.props.issueNumber;
    e.preventDefault();
    let endpoint = `${create_issue_url}/${this.props.repo}`;
    let msg = 'Are you sure you want to create this workitem?';
    // Make sure admin intends to create this work item
    if(confirm(msg)) {
      axios.post(endpoint, this.state)
      .then(response => {
        // Clear form
        this.resetForm();
        // Show success alert
        document.getElementById('successAlert').style.display = '';
        // Hide it after 3 seconds
        setTimeout(function hideAlert(){
          document.getElementById('successAlert').style.display = 'none';
        }, 3000);
      })
      .catch(error => {
        // Display error messages in the console
        const response = error.response.data;
        console.error('CAUGHT VALIDATION ERROR(S)');
        response.errors.forEach(err => {
          console.error(`${err.param.toUpperCase()} VALIDATION ERROR: \n ${err.msg}` );
        });
        // Render error alerts
        this.renderErrorAlerts(response.errors);
      });
    }
  }

  renderErrorAlerts(errors) {
    let container = document.getElementById('errorAlerts');
    // Render an Alert for every potential error message
    let alerts = errors.map((err, i) => <Alert key={i} msg={err.msg} type='danger' />);
    // Set errors to state
    this.setState({ errors: alerts });
  }

  resetForm() {
    this.setState({
      title: '',
      price: '',
      duration: '',
      description: '',
      // setting this to false removes any error alerts
      errors: false
    });
  }

  render() {
    let { title, price, duration, description } = this.state;
    return (
      <form onSubmit={this.submitForm}>
        <div id="successAlert" className="alert alert-success" role="alert"
          style={{display: 'none'}}
        >
          Work Item created.
        </div>
        <div id="errorAlerts">
          {this.state.errors ? this.state.errors : null}
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input onChange={this.handleChange} type="text" value={title} className="form-control" id="title" required/>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="price">Price</label>
            <input onChange={this.handleChange} type="number" value={price} className="form-control" id="price" required/>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="duration">Duration</label>
            <input onChange={this.handleChange} type="number" value={duration} className="form-control" id="duration"
              placeholder="days" required
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
            required
          ></textarea>
        </div>
        {/* Using modal footer as form footer because it works */}
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          {/* <button type="button" className="btn btn-warning" onClick={this.resetForm}>Reset</button> */}
        </div>
      </form>
    ); 
  }
  
}

export default CreateWorkitemForm;
