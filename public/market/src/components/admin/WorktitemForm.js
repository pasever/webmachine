import React, { Component } from 'react';
import axios from 'axios';

class WorkitemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      price: '',
      duration: '',
      description: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  submitForm(e) {
    e.preventDefault();
    let endpoint = `http://localhost:3000/api/github/create-issue/${this.props.repo}`;
    let msg = 'Are you sure you want to create this workitem?';
    // Make sure admin intends to create this work item
    if(confirm(msg)) {
      axios.post(endpoint, this.state)
      .then(response => {
        console.log(response.data.workitem);
        // Clear form
        this.resetForm();
        // Show success alert
        document.getElementById('successAlert').style.display = '';
        // Hide it after 3 seconds
        setTimeout(function hideAlert(){
          document.getElementById('successAlert').style.display = 'none';
        }, 3000);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  resetForm() {
    this.setState({
      title: '',
      price: '',
      duration: '',
      description: ''
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
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="title">Title</label>
            <input onChange={this.handleChange} type="text" value={title} className="form-control" id="title" required/>
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="price">Price</label>
            <input onChange={this.handleChange} type="number" value={price} className="form-control" id="price" required/>
          </div>
          <div className="form-group col-md-3">
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
            required
          ></textarea>
        </div>
        {/* Using modal footer as form footer because it works */}
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" className="btn btn-warning" onClick={this.resetForm}>Reset</button>
        </div>
      </form>
    ); 
  }
  
}

export default WorkitemForm;