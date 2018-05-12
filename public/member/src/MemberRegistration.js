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
      location: 'networks-to-join'
    };

    this.liftChildState = this.liftChildState.bind(this);
  }

  /** @method */
  // Is passed through props to children as handler to lift state.
  /** 
   * @param {String} page - identifier of page user is navigating to.
   * @param {Array|Object} load - data stored in the child's state.
   */
  liftChildState(page, load) {
    // replace any dashes (-) with underscores (_).
    // use the output as name of new property in state.
    // use this.state.location to test & replace because the
    // incoming load is for the current location, not the next one.
    let loc = this.state.location;
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