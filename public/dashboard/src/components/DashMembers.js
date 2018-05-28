//////////////////////////////////////////////////////////////////////////////////
/////////////////////           DashMembers.js           /////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///                                                                             //
///  Displays the Networks a user is a member of.                               //
///                                                                             //
/// DGO                                                                         //
//////////////////////////////////////////////////////////////////////////////////

import React, { Component } from "react";
import { MembersSection } from "./";
import { FlexItem } from "../../../common/grid";
import { Button } from "../../../common/form";

export const DashMembers = ({ text, clients }) => (
  <FlexItem classes="animated fadeIn light-shadow text-center">
    {text.memberTitle && <h1>{text.memberTitle}</h1>}

    {clients.length > 0 ? (
      <MembersSection clients={clients} pageText={text} />
    ) : (
      <h4>{text.noMemberships}</h4>
    )}
    <div className="launch-network">
      <a href="/member" className="btn btn-default">
        Find Networks
      </a>
    </div>
  </FlexItem>
);
