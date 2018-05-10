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
import {
  BrowserRouter as Router,
  Route
}                                 from "react-router-dom";
import NetworkSelection           from './components/Steps/NetworkSelection';
import MemberForm                 from './components/Steps/MemberForm';

const routes = [
  {
    //member_registration_step#
    path: '/member',
    exact: true,
    component: NetworkSelection
  },
  {
    path: '/member-form',
    component: MemberForm
  }
];

class MemberRegistration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      test: 'hello'
    };

    this.liftChildState = this.liftChildState.bind(this);
  }

  /**@todo
   * write a function that allows each child
   * to lift its respective state
   */

  liftChildState(value) {
    this.setState({ test: value })
  }

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
            {/* Render a Route forEach object in routes Array */}
            {routes.map(({ path, component: C }) => (
              <Route
                key={path}
                path={path}
                 // ...props = routing props
                render={(props) => 
                  <C {...props} liftState={this.liftChildState} />
                }
              />
            ))}
          </div>
        </Router> 
    )
  }
}

export default MemberRegistration;