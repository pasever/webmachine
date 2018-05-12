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
      location: 'networks-to-join'
    };

    this.liftChildState = this.liftChildState.bind(this);
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
    let stateProp = /-/.test(loc) ? loc.replace('-','_') : page;
    this.setState({ location: page, [stateProp]: load })
  }

  // Renders component based on page location
  renderPage() {
    let { location } = this.state;

    if (location === 'networks-to-join') {
      return <NetworkSelection liftState={this.liftChildState}  />
    } else if (location === 'member-form') {
      return <MemberForm liftState={this.liftChildState}  />
    } else {
      // If, for whatever reason, the value of location is wiped out
      // from state, render the first step of the registration process.
      return <NetworkSelection liftState={this.liftChildState}  />
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

    function loadHasEmptyFields() {};
    /** @todo */
    // have a method to check if load is empty and another to check if
    // load has any empty fields
    function loadIsEmpty(load) {
      // if it's not an array, then it's a plain object
      if (Array.isArray(load)) {
        if(load.length === 0)
          alert('Please select at least one network to join');
          return true;
      } else {
        // checks if it has empty fields! not if it's empty...
        let loadValues = Object.values(load);
        for (let i = 0; i < loadValues.length; i++) {
          if (loadValues[i] === '') {
            alert('Please fill out all fields in the form');
            return true;
          }
        }
      }

      return false;
    }

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