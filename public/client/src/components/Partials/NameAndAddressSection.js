///////////////////////////////////////////////////////////////////////
//////////////////     Name and Address Info Form      ////////////////
///////////////////////////////////////////////////////////////////////
// DGO

import React, { Component } from "react";
import { Input, TextArea } from "../../../../common/form";
import { Col } from "../../../../common/grid";
/// Displays the name and addressfields from stripe

/* REQUIRED PROPS

    client - the client object
    updateFormField (method) - method that is fired when an input is 
*/
export const NameAndAddressSection = ({ client, updateFormField }) => (
  <div>
    <Input value={client.addr1}
      name="addressLine1"
      onChange={updateFormField}
      displayName="Address"
      type="text"
      placeholder="123 Main St"
    />
    <Input
      value={client.addr2}
      name="addressLine2"
      onChange={updateFormField}
      type="text"
      placeholder="Suite. G"
    />
    <Input
      value={client.city}
      name="city"
      onChange={updateFormField}
      displayName="City"
      type="text"
      placeholder="New York "
    />
    <Input
      value={client.state}
      name="state"
      onChange={updateFormField}
      displayName="State"
      type="text"
      placeholder="NY"
      width="2"
    />
    <Input
      value={client.zip}
      name="zip"
      onChange={updateFormField}
      displayName="Zip"
      type="text"
      placeholder="12345"
    />
  </div>
);
