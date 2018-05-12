///////////////////////////////////////////////////////////////////////
////////////////     Billing Maintenance Page       ///////////////////
///////////////////////////////////////////////////////////////////////
// DGO



'use strict';

import React, { Component } from 'react';
import { Container, Col, Row } from '../../../../common/grid';
import ErrorBoundary from '../../../../common/error/ErrorBoundary';
import {StripeProvider, Elements, PaymentRequestButtonElement, injectStripe } from 'react-stripe-elements';
import { StripeFormWrapper } from '../Partials';

import '../../styles/maintenancepage.css';

///                     ../../../../../ << WHAT?!?!
const config = require('../../../../../config/').init();


/// FUTURE - Send User object, and check if the client is in Stripe.
export class BillingMaintenance extends Component {
  render() {
    return (
      <ErrorBoundary>
        {this.props.text.title ? <h2>{this.props.text.title}</h2> : ""}
        {this.props.text.body ? <p>{this.props.text.body}</p> : ""}
        <StripeProvider apiKey={config.stripe.publishKey}>
          <StripeFormWrapper
            client={this.props.client}
            updateFormField={this.props.updateFormField}
          />
        </StripeProvider>
      </ErrorBoundary>
    );
  }
}

