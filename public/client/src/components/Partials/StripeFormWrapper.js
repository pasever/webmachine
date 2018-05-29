///////////////////////////////////////////////////////////////////////
////////////       Credit Card Info Form Wrapper       ////////////////
///////////////////////////////////////////////////////////////////////
// DGO

import React, { Component } from "react";
import { CardElement, Elements } from "react-stripe-elements";

import StripeForm from "./StripeForm";

/// Wraps the credit card info form so we can inject Stripe
export class StripeFormWrapper extends Component {
  render() {
    return (
      <Elements>
        <StripeForm
          client={this.props.client}
          updateFormField={this.props.updateFormField}
        />
      </Elements>
    );
  }
}
