/**
 * @description
 * Member Registration process.
 * 
 * Process consists of two steps:
 * 1. Network selection - User selects from array 
 *    of available discoverable networks to join.
 * 2. Member form - Member specific information
 *    is gathered through a form.
 * 3. When moving, either to or from, one step to
 *    another, the data gathered in the state of each
 *    child component is lifted to the state of the 
 *    highest order component" <MemberRegistration />.
 * 
 * Successful submission of the data gathered in this
 * process creates and inserts a Member document within
 * the Member collections of each respective Client(s)
 * who manage the selected Network(s).
 */

import React, { Component }       from 'react';
import axios                      from 'axios';
import BackToDashboard            from './components/BackToDashboard'
import NetworkSelection           from './components/Steps/NetworkSelection';
import MemberForm                 from './components/Steps/MemberForm';
import API                        from 'Common/utils/API';
import URI                        from 'Common/utils/URI';
import Auth                       from '../../home/src/Pages/Auth/Auth';

const ls = window.localStorage;

class MemberRegistration extends Component {

  /**
   * @property {String} location - identifier of current page/step
   *  in the member registration process
   */
  constructor(props) {
    super(props);
    this.state = {
      // Defaults to step1 of the registration process.
      location: 'networks-to-join',
      networks_to_join: [],
      member_form: {},
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleNetworkSelectionChange = this.handleNetworkSelectionChange.bind(this);
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
    this.registerMember = this.registerMember.bind(this);
  }

  componentWillMount() {
    let auth = new Auth();
    if (!auth.isAuthenticated())
      auth.login()
  }

  /**
   * @param {String} location
   * Passed to children to handle page changes
   */
  handlePageChange(location) {
    this.setState({ location });
  }

  /**
   * @param {Array} networks_to_join
   * Passed to NetworkSelection stage to allow
   * for the lifting up of networks_to_join array
   */
  handleNetworkSelectionChange(networks_to_join) {
    this.setState({ networks_to_join });
  }

  /**
   * @param {Object} event
   * Allows MemberForm to become a controlled component
   */
  handleFormInputChange(e) {
    let member_form;
    if ('member_form' in this.state)
      member_form = this.state.member_form;

    member_form[e.target.id] = e.target.value;
    this.setState({ member_form });
  }

  // Renders component based on page location
  renderPage() {
    let { location } = this.state;

    if (location === 'networks-to-join') {
      return (
        <NetworkSelection
          networks={this.state.networks_to_join}
          changePage={this.handlePageChange}
          handleChange={this.handleNetworkSelectionChange}
        /> )
    } else if (location === 'member-form') {
      return (
        <MemberForm
          formValues={this.state.member_form}
          changePage={this.handlePageChange}
          handleChange={this.handleFormInputChange}
          handleSubmit={this.registerMember}
        /> )
    } else {
      // If, for whatever reason, the value of location is wiped out
      // from state, render the first step of the registration process.
      return (
        <NetworkSelection
          networks={this.state.networks_to_join}
          changePage={this.handlePageChange}
          handleChange={this.handleNetworkSelectionChange}
        /> )
    }
  }

  // Passed to MemberForm.
  // Triggered when 'Complete Registration' button is clicked.
  // Performs a few things:
  // 1. Checks that load from each step IS NOT empty (@method)
  //  1.1 If one or more is empty, it DOESN'T submit
  //  1.2 If none are empty, it moves on.
  // 2. Makes request to member registration route in backend,
  //    effectively passing ALL information necessary to register
  //    a new member.
  // 3. Waits for response and notifies user of outcome.
  registerMember(e) {
    e.preventDefault();
    // gets called when both loads are valid and ready to go.
    let member_load = this.state;
    API.member.register(member_load)
      .then(res => {
        if ('networksToJoin' in ls)
          ls.removeItem('networksToJoin');
        
        if ('memberForm' in ls)
          ls.removeItem('memberForm')

        URI.redirect('/dashboard')
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="container">
        <BackToDashboard />
        {this.renderPage()}
      </div>
    )
  }
}

export default MemberRegistration;
