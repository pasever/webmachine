import React, { Component } from 'react';
import Label from '../FormElements/Label';
import Input from '../FormElements/Input';
import Select from '../FormElements/Select';
import state_abbreviations from '../../data/state_abbreviations';

/**
 * ---- Fields ----
 * [x] First Name 
 * [x] Last Name
 * [ ] Image (?) []
 * [x] Address 1 & 2
 * [x] City, State, Zip
 * [x] Cell
 * [x] Email
 */

 // Global reference to document object
 const d = window.document;
// Global reference to localStorage
const ls = window.localStorage;

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // If there's record of state in localStorage, retrieve it
  // and refill the form with it.
  componentDidMount() {
    if ('memberForm' in ls) {
      let memberFormRemnants = JSON.parse(ls.getItem('memberForm'));
      let keys = Object.keys(memberFormRemnants);
      let values = Object.values(memberFormRemnants);
      let updatedState = {};
      // Safety net
      if (keys.length !== values.length) return;

      let form = Array.from(d.getElementById('member-form'));
      // Get rid of submit button - not needed for these purposes
      form.pop();

      // Iterate through every form field and create an object using
      // key/value pairs from localStorage
      for (let i = 0; i < form.length; i++) {
        updatedState[keys[i]] = values[i];
      }

      this.setState(updatedState);

    } else {
      // First time component mounts and there's no data in localStorage
      // this.setState({ state: d.getElementById('state')[0].value });
    }

  }

  handleInputChange(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  handlePageChange() {
    // if(this.props.loadIsOkToLift(this.state)) {
      // Passes name of next page/step
      this.props.liftState('networks-to-join', this.state)
    // } else {
      // alert('Please fill out all of the required fields');
    // }
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.props.loadIsOkToLift(this.state)) {
      // state not lifting before register gets called...
      this.props.liftState('member-form', this.state);
      this.props.register();
    } else {
      alert('Please fill out all of the required fields');
    }
  }

  /**
   * @TODO Create method to upload a picture ?
   * 1. Upload it to cloudinary
   * 2. Get URL back
   * 3. Save IMG URL into state
   */

   /** @method */
   // If component will unmount, save state into localStorage
   componentWillUnmount() {
     let memberForm = this.state;
     memberForm = JSON.stringify(memberForm);
     ls.setItem('memberForm', memberForm);
   }

  render() {
    let {
      firstName, lastName, phone, email,
      address1, address2, city, state, zip
    } = this.state;
    return (
      <form id='member-form' style={{ width: '70%', margin: '0 auto' }}>
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
              id='state' options={state_abbreviations}
              value={state}
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
        
        <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Complete Registration</button>
      </form>
    );
  }
}

export default MemberForm;