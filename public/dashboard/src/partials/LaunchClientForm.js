import React, { Component } from "react";
import { Input, Button } from "../../../common/form";
import { FlexItem, Col, Row } from "../../../common/grid";
import API from "../../../common/utils/API";
import URI from "../../../common/utils/URI";
import "../../../common/styles/animate.css";

export class LaunchClientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: "",
      contactName: "",
      email: "",
      errors: {}
    };
    this.updateFormField = this.updateFormField.bind(this);
    this.launchClient = this.launchClient.bind(this);
  }
  updateFormField(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  launchClient(e) {
    e.preventDefault();
    let client = {
      name: this.state.companyName,
      contact: this.state.contactName,
      email: this.state.email
    };
    API.client.addClient(client).then(resp => {
      URI.redirect("/client?clientId" + resp.data._id);
    });
  }

  render() {
    return (
      <FlexItem classes="animated fadeIn light-shadow">
        <a href="#" onClick={this.props.goBack}>
          <i className="fa fa-arrow-left" /> Go Back
        </a>
        <form onSubmit={this.launchClient}>
          <Col size="8">
            <Input
              value={this.state.companyName}
              name="companyName"
              onChange={this.updateFormField}
              displayName="Company Name"
              type="text"
              errorText={this.state.errors.name}
              classPrepend="fa fa-building"
            />
            <Input
              value={this.state.contactName}
              name="contactName"
              onChange={this.updateFormField}
              displayName="Contact Name"
              type="text"
              errorText={this.state.errors.contactName}
              classPrepend="fa fa-user"
            />
            <Input
              value={this.state.email}
              name="email"
              onChange={this.updateFormField}
              displayName="Contact Email"
              type="email"
              errorText={this.state.errors.email}
              classPrepend="fa fa-at"
            />

            <Button style="default" type="submit" text="Launch" />
          </Col>
        </form>
      </FlexItem>
    );
  }
}
