import React, { Component } from 'react';

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
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  submitForm(e) {
    e.preventDefault();
    console.log(e.target);
  }

  render() {
    console.log(this.state);
    let { title, price, duration, description } = this.state;
    return (
      <form onSubmit={this.submitForm}>
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
        </div>
      </form>
    ); 
  }
  
}

export default WorkitemForm;