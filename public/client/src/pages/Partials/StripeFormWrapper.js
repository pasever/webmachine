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
          user={this.props.user}
          updateFormField={this.props.updateFormField}
        />
      </Elements>
    );
  }
}
