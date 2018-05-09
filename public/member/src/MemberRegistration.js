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

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NetworkSelection from './components/Steps/NetworkSelection';
import MemberForm from './components/Steps/MemberForm';

class MemberRegistration extends Component {
  render() {
    /**
     * @TODO
     * Add state and write methods to lift state.
     * State at this level is used to keep track of
     * data as we progress through member registration steps.
     */
    return (
        <Router>
          <div className='container'>
            <Route exact path='/member' component={NetworkSelection} />
            <Route path='/member-form' component={MemberForm} />
          </div>
        </Router> 
    )
  }
}

export default MemberRegistration;