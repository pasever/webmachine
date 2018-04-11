///////////////////////////////////////////////////////////////////////
//////////////////     Name and Address Info Form      ////////////////
///////////////////////////////////////////////////////////////////////
// DGO

import React, { Component } from "react";
import { Input, TextArea } from "../../components/form";
import { Col } from "../../components/grid";
/// Displays the name and addressfields from stripe

/* REQUIRED PROPS

    user - the user object
    updateFormField (method) - method that is fired when an input is 
*/
export const NameAndAddressSection = ({ user, updateFormField }) => (
  <div>
    <Input
      value={user.addressLine1}
      name="addressLine1"
      onChange={updateFormField}
      displayName="Address"
      type="text"
      placeholder="123 Main St"
    />
    <Input
      value={user.addressLine2}
      name="addressLine2"
      onChange={updateFormField}
      type="text"
      placeholder="Suite. G"
    />
    <Input
      value={user.city}
      name="city"
      onChange={updateFormField}
      displayName="City"
      type="text"
      placeholder="New York"
    />
    <Input
      value={user.state}
      name="state"
      onChange={updateFormField}
      displayName="State"
      type="text"
      placeholder="NY"
      width="2"
    />
    <Input
      value={user.zip}
      name="zip"
      onChange={updateFormField}
      displayName="Zip"
      type="text"
      placeholder="12345"
    />
  </div>
);
