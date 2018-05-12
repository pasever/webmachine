/**
 * @description
 * Member Registration page/process.
 * 
 * Process consists of two (or more?) steps:
 * 1. Network selection - User selects from array 
 *    of available networks to join.
 * 2. Member form - Member specific information
 *    is gathered through a form.
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

  constructor(props) {
    super(props);
    this.state = {
      test: 'hello',
      location: 'networks-to-join'
    };

    this.liftChildState = this.liftChildState.bind(this);
  }

  liftChildState(page, load) {
    let arrName = /-/.test(page) ? this.state.location.replace('-','_') : page;
    this.setState({ location: page, [arrName]: load })
  }

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