/**
 * @description
 * Member Registration page.
 * Contains member registration form.
 * Successful submission of this form will
 * create and insert a Member document within
 * the Members collections of the respective Client.
 */

import React, { Component } from 'react';
import MemberForm from './components/MemberForm';

class MemberRegistration extends Component {
  render() {
    return (
      <div className='container'>
        <MemberForm />
      </div>
    )
  }
}

export default MemberRegistration;