//////////////////////////////////////////////////////////////////////////////////
/////////////////////      BillingMaintenance.js         /////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///  Billing Maintenance Wrapper                                                //
///  REFACTOR 0.7 REMOVED UNNECESSARY IMPORTS                                   //
///                                                                             //
///  DGO                                                                        //
//////////////////////////////////////////////////////////////////////////////////


'use strict';

import React, { Component } from 'react';
import { ErrorBoundary } from 'Common/error';
import API from 'Common/utils/API';
import {StripeProvider } from 'react-stripe-elements';
import { StripeFormWrapper } from '../Partials';

import '../../styles/maintenancepage.css';

const config = require('Config').init();


/// FUTURE - Send User object, and check if the client is in Stripe.
/**
 * @class BillingMaintenance
 * @description 
 * Connects the user to the stripe API from the front end
 */
export class BillingMaintenance extends Component {
  state = {
    stripeCustomerLoaded: false,
    client: this.props.client,
  }
  componentDidMount() {
    const { client }  = this.state;
    if(client.stripeCustomerId === "") {
      API.stripe.createStripeCustomer(client).then(resp => {
        this.props.updateClient(resp.data);
        this.setState({ stripeCustomerLoaded: true, client: resp.data });
      }).catch(err => console.log(err));
    } else {
      this.setState({ stripeCustomerLoaded: true });
    }
  }
  render() {
    return (
      <ErrorBoundary>
        { !this.state.stripeCustomerLoaded ? ( <h2>Retrieving Payment Details <i className="fa fa-spin fa-cog"></i></h2>) : (
          <div>
            {this.props.text.title && <h2>{this.props.text.title}</h2> }
            {this.props.text.body && <p>{this.props.text.body}</p> }
            <StripeProvider apiKey={config.stripe.publishKey}>
              <StripeFormWrapper
                client={this.state.client}
                updateFormField={this.props.updateFormField}
              />
            </StripeProvider>
          </div>
        )}
      </ErrorBoundary>
    );
  }
}

