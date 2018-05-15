/**
 * @description
 * Member Registration page/process.
 * 
 * Process consists of two (or more?) steps:
 * 1. Network selection - User selects from array 
 *    of available discoverable networks to join.
 * 2. Member form - Member specific information
 *    is gathered through a form.
 * 3. When moving, either to or from, one step to
 *    another, the data gathered in the state of each
 *    child component is lifted to the state of the 
 *    highest order component; this one.
 * 
 * Successful submission of the data gathered in this
 * process creates and inserts a Member document within
 * the Members collections of the respective Client(s)
 * who manage the selected Network(s).
 */

import React, { Component }       from 'react';
import NetworkSelection           from './components/Steps/NetworkSelection';
import MemberForm                 from './components/Steps/MemberForm';

class MemberRegistration extends Component {

  /**
   * @property {String} location - identifier of current page OR step
   *  in the member registration process
   */
  constructor(props) {
    super(props);
    this.state = {
      // Defaults to step1 of the registration process.
      location: 'networks-to-join',
      networks_to_join: [],
      member_form: {}
    };

    this.liftChildState = this.liftChildState.bind(this);
    this.registerMember = this.registerMember.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { networks_to_join, member_form } = this.state;
    // if loads are NOT ready to be submitted, re-render.
    // otherwise, don't re-render
    console.log(this.state)
    if (!this.loadIsOkToSubmit(networks_to_join) || !this.loadIsOkToSubmit(member_form)) {
      console.log('not ready to submit');
      return true;
    } else {
      console.log('ready to submit');
      return false;
    }
  }

  loadIsOkToSubmit(load) {
    // if it's not an array, then it's a plain object
    console.log(load)
    if (Array.isArray(load)) {
      if(load.length === 0) {
        // alert('Please select at least one network to join');
        return false;
      }
    } else {
      let loadValues;
      // Address 2 is optional; if it's empty, delete it
      if (load.address2 === '') delete load.address2;
      // Capture value of each key in an array
      let x = Object.values(load);
      
      // Safety net in case somehow all keys get deleted.
      // Shouldn't happen (look at initial state of MemberForm)
      // but just in case
      if (x.length > 0)
        loadValues = x
      else {
        // alert('Please fill out all fields in the form')
        return false
      }

      for (let i = 0; i < loadValues.length; i++) {
        if (loadValues[i] === '') {
          // alert('Please fill out all fields in the form');
          return false;
        }
      }
    }

    return true;
  }

  /** @method 
   * @description - Is passed through props to children as handler to lift state.
   * @param {String} page - identifier of page user is navigating to.
   * @param {Array|Object} load - data passed from the child's state.
   */
  liftChildState(page, load) {
    // replace any dashes (-) with underscores (_).
    // use the output as name of new property in state.
    // i.e. uses networks-to-join to save array (in state) called networks_to_join
    // uses this.state.location to test & replace because the
    // incoming load is from the current location, not the next one.
    let loc = this.state.location === '' ? 'networks-to-join' : this.state.location;
    let stateProp = /-/.test(loc) ? loc.replace(/-/g,'_') : page;
    this.setState({ location: page, [stateProp]: load })
  }

  // Renders component based on page location
  renderPage() {
    let { location } = this.state;

    if (location === 'networks-to-join') {
      return <NetworkSelection liftState={this.liftChildState} loadIsOkToLift={this.loadIsOkToSubmit} />
    } else if (location === 'member-form') {
      return <MemberForm liftState={this.liftChildState} loadIsOkToLift={this.loadIsOkToSubmit} register={this.registerMember} />
    } else {
      // If, for whatever reason, the value of location is wiped out
      // from state, render the first step of the registration process.
      return <NetworkSelection liftState={this.liftChildState} loadIsOkToLift={this.loadIsOkToSubmit} />
    }
  }

  // Passed to the component handling last step of the process.
  // Triggered when 'Complete Registration' button is clicked.
  // Performs a few things:
  // 1. Checks that load from each step IS NOT empty (@method)
  //  1.1 If one or more is empty, it DOESN'T submit
  //  1.2 If none are empty, it moves on.
  // 2. Makes request to member registration route in backend,
  //    effectively passing ALL information necessary to register
  //    a new member.
  // 3. Waits for response and notifies user of outcome.
  registerMember() {
    // gets called when both loads are valid and ready to go.
    console.log('submitting now!');
  }

  render() {
    return (
      <div className="container">
        {this.renderPage()}
      </div>
    )
  }
}

export default MemberRegistration;