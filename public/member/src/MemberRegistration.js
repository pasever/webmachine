/**
 * @description
 * Member Registration page/process.
 * Contains member registration form.
 * Successful submission of this form will
 * create and insert a Member document within
 * the Members collections of the respective Client(s).
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NetworkSelection from './components/Steps/NetworkSelection';
import MemberForm from './components/Steps/MemberForm';

class MemberRegistration extends Component {
  render() {
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