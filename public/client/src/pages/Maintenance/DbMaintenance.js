///////////////////////////////////////////////////////////////////////
//////////////////      Db Maintenance Page       /////////////////////
///////////////////////////////////////////////////////////////////////
// DGO

"use strict";

import React, { Component } from "react";
import { Container, Col, Row } from "../../../../common/grid/";
import { Input, TextArea, Button } from "../../../../common/form/";
import ErrorBoundary from "../../../../common/error/ErrorBoundary";
import "../../styles/maintenancepage.css";

/* 
REQUIRED PROPS: 
    onSubmit (method) - method that fires when the form is submitted
    errors - errors object
    client - the client object
    text - text to display
    updateFormField (method) - method that fires when a form value is updated
*/
export const DbMaintenance = ({ errors, text, client, onSubmit, updateFormField,isSaving }) => (
  <ErrorBoundary>
    <div className="form-styles light-shadow">
      {text.title ? <h2>{text.title}</h2> : ""}
      {text.body ? <p>{text.body}</p> : ""}
      {client.dbConnected ? (
        <h6>
          <i className="fa fa-toggle-on" /> db can connect.
        </h6>
      ) : (
        <h6>
          <i className="fa fa-toggle-off" /> db connection failed. Please check
          the uri.
        </h6>
      )}
      <form onSubmit={onSubmit}>
        <Input
          value={client.dbname}
          name="dbname"
          errorText={errors.dbname}
          placeholder="Database Name"
          displayName="Database Name"
          type="text"
          onChange={updateFormField}
        />

        <Input
          value={client.uri}
          name="uri"
          errorText={errors.uri}
          placeholder="db.example.net"
          displayName="Database URI"
          type="text"
          byline="Do not include your clientname and password"
          onChange={updateFormField}
          classPrepend="fa fa-database"
        />

        <Input
          value={client.username}
          name="username"
          errorText={errors.username}
          placeholder="username"
          displayName="Database Username"
          type="text"
          onChange={updateFormField}
        />

        <Input
          value={client.password}
          name="password"
          errorText={errors.password}
          placeholder=""
          displayName="Database Password"
          type="password"
          onChange={updateFormField}
        />
        {isSaving ? (
          <i className="fa fa-spin fa-gear fa-2x margin-top-10" />
        ) : (
          <Button type="submit" text="Save" style="default" name="save" />
        )}
      </form>
    </div>
  </ErrorBoundary>
);
