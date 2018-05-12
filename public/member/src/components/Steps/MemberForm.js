import React, { Component } from 'react';
import Label from '../FormElements/Label';
import Input from '../FormElements/Input';
import Select from '../FormElements/Select';

/**
 * ---- Fields ----
 * [x] First Name 
 * [x] Last Name
 * [ ] Image (?) []
 * [x] Address 1 & 2
 * [x] City, State, Zip
 * [x] Cell
 * [x] Email
 * 
 */

 const states = ['NC', 'MA', 'FL'];

class MemberForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  handlePageChange() {
    // Passes name of next page/step
    this.props.liftState('networks-to-join', this.state)
  }

  /**
   * @TODO Create method to upload a picture ?
   * 1. Upload it to cloudinary
   * 2. Get URL back
   * 3. Save IMG URL into state
   */

  render() {
    let {
      firstName, lastName, phone, email,
      address1, address2, city, state, zip
    } = this.state;
    return (
      <form style={{ width: '70%', margin: '0 auto' }}>
        <h4 className="form-title">Last Step</h4>
        <a href='#' onClick={this.handlePageChange}> Go (back) to the Network Selection Stage </a>
        <div className="form-row">

          <div className="form-group col-md-6">
            <Label forHtml='firstName' innerText='First Name' />
            <Input
              type='text' placeholder='John'
              id='firstName' value={firstName}
              handleInput={this.handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <Label forHtml='lastName' innerText='Last Name' />
            <Input
              type='text' placeholder='Smith'
              id='lastName' value={lastName}
              handleInput={this.handleInputChange}
            />
          </div>

        </div>

        <div className="form-row">

          <div className="form-group col-md-6">
            <Label forHtml='phone' innerText='Phone Number' />
            <Input
              type='text' placeholder='111-222-3333'
              id='phone' value={phone}
              handleInput={this.handleInputChange}
            />
          </div>
          <div className="form-group col-md-6">
            <Label forHtml='email' innerText='Email' />
            <Input
              type='email' placeholder='email@domain.com'
              id='email' value={email}
              handleInput={this.handleInputChange}
            />
          </div>

        </div>

        {/* <div className="form-row"> */}

          <div className="form-group">
            <Label forHtml='address1' innerText='Address Line 1' />
            <Input
              type='text' placeholder='100 Main St.'
              id='address1' value={address1}
              handleInput={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <Label forHtml='address2' innerText='Address Line 2' />
            <Input
              type='text' placeholder='Apartment, Studio or Floor'
              id='address2' value={address2}
              handleInput={this.handleInputChange}
            />
          </div>

        {/* </div> */}

        <div className="form-row">

          <div className="form-group col-md-6">
            <Label forHtml='city' innerText='City' />
            <Input
              type='text' id='city'
              value={city}
              handleInput={this.handleInputChange}
            />
          </div>
          <div className="form-group col-md-4">
            <Label forHtml='state' innerText='State' />
            <Select
              id='state' options={states} 
              handleInput={this.handleInputChange}
            />
          </div>
          <div className="form-group col-md-2">
            <Label forHtml='zip' innerText='Zip Code' />
            <Input
              type='text' id='zip'
              value={zip}
              handleInput={this.handleInputChange}
            />
          </div>

        </div>
        
        <button type="submit" className="btn btn-primary">Complete Registration</button>
      </form>
    );
  }
}

export default MemberForm;