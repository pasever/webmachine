///////////////////////////////////////////////////////////////////////
//////////////////             Stripe Form             ////////////////
///////////////////////////////////////////////////////////////////////

import React, { Component } from "react";
import { injectStripe } from "react-stripe-elements";
import { Button } from "../../../../common/form";
import { CardSection, NameAndAddressSection, StripeData } from "./";
import LoadingPage from "../../../../common/LoadingPage";
import API from "../../../../common/utils/API";

const stripeCust = {};

/// The stripe form injects stripe so we can add a source to a potential customer.
//  The source will be created for a payment method that can be accessed later.
class StripeForm extends Component {
  state = {
    errors: [], // Errors handled as an array are listed at the top of the form
    warnings: [], // Warnings handled as an array are listed at the top of the form
    isUpdated: false,
    isSaving: false,
    client: this.props.client
  };

  /// Makes sure the necessary data exists on the form.
  validateInfo() {
    const u = this.props.client,
      errors = [],
      warnings = [];

    // Pushes errors and warning messages into the arrays.
    if (u.zip === "") errors.push("Zip code is REQUIRED.");
    if (u.state.length > 2)
      errors.push("State abbreviation only, i.e. NC for North Carolina.");
    if (u.addressLine1 === "")
      warnings.push("We highly suggest entering your address.");
    if (u.city === "") warnings.push("We highly suggest entering your city.");
    if (u.state === "") warnings.push("We highly suggest entering your state");

    // Sets the new arrays
    this.setState({ errors: errors, warnings: warnings });
    // If there is one or more errors we fail validation
    return errors.length > 0 ? false : true;
  }

  finishSave = stripeCustomer => {
    // Extract the client from the state
    const client = this.state.client;
    // Assign the returned stripeCustomer to our extracted client
    client.stripeCustomer = stripeCustomer;
    // Sets the state.
    this.setState({ isSaved: true, client: client, isSaving: false });
  };

  ///  Calls the API to change the default source
  changeDefaultSource = event => {
    event.preventDefault();
    // Flags to the form that we are saving to show the animation
    this.setState({ isSaving: true });
    // Make our call to the server, passing our customer Id and Source Id
    API.stripe.setDefaultSource(
      this.state.client.stripeCustomer.id,
      event.target.dataset.sourceId
    ).then(response => {
      this.finishSave(response.data);
    });
  };

  ///  Calls the API to remove a source
  removeSource = event => {
    event.preventDefault();
    // Flags to the form that we are saving to show the animation
    this.setState({ isSaving: true });
    // Make our call to the server, passing the source we want to remove
    API.stripe.removeSource(
      this.state.client.stripeCustomer.id,
      event.target.dataset.sourceId
    ).then(response => {
      this.finishSave(response.data);
    });
  };

  /// Function called at the submit event.
  handleSubmit = event => {
    event.preventDefault();
    if (!this.validateInfo()) return false;
    this.setState({ isSaving: true });
    const u = this.props.client;

    /// Creates a stripe source with the client information.  stripe-react-elements handles getting the card data to the source.
    this.props.stripe
      .createSource({
        owner: {
          name: u.name,
          address: {
            line1: u.addressLine1,
            line2: u.addressLine2,
            city: u.city,
            state: u.state
          }
        },
        usage: "reusable"
      })
      .then(resp => {
        let promises = [
          API.stripe.addSourceToCustomer(
            this.state.client.stripeCustomerId,
            resp.source.id
          ),
          API.client.updateClient(this.state.client)
        ];

        Promise.all(promises).then(values => {
          this.setState({
            isSaving: false,
            isUpdated: true,
            client: values[1].data
          });
        });
      });
  };

  render() {
    return (
      <div className="billing-form-wrapper">
        <div className="billing-form-section light-shadow">
          <form onSubmit={this.handleSubmit}>
            {/* Shows errors/warnings/updates */}
            {this.state.errors.map((current, index) => (
              <div key={index}>
                <h2 className="badge badge-danger">{current}</h2>
              </div>
            ))}
            {this.state.warnings.map((current, index) => (
              <div key={index}>
                <h2 className="badge badge-warning">{current}</h2>
              </div>
            ))}
            {this.state.isUpdated ? (
              <h2 className="badge badge-success">User Updated!</h2>
            ) : (
              ""
            )}
            <NameAndAddressSection
              client={this.state.client}
              updateFormField={this.props.updateFormField}
            />
            <CardSection />
            {this.state.isSaving ? (
              <i className="fa fa-cog fa-spin fa-2x margin-top-10" />
            ) : (
              <Button
                type="submit"
                text="Submit"
                style="default"
                name="signup"
              />
            )}
          </form>
        </div>
        <div className="billing-form-section light-shadow">
          {this.state.client.stripeCustomer === null ? (
            <h2>No stripe customer loaded.</h2>
          ) : (
            <StripeData
              stripeCust={this.state.client.stripeCustomer}
              changeSource={this.changeDefaultSource}
              removeSource={this.removeSource}
            />
          )}
        </div>
      </div>
    );
  }
}

export default injectStripe(StripeForm);
