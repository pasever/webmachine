///////////////////////////////////////////////////////////////////////
//////////////////     User Maintenance Page      /////////////////////
///////////////////////////////////////////////////////////////////////
// DGO

"use strict";

import React, { Component } from "react";
import { Container, Col, Row } from "../../components/grid/";
import { Input, TextArea, Button } from "../../components/form/";
import ErrorBoundary from "../../components/error/ErrorBoundary";
import "../../styles/maintenancepage.css";

/* 
REQUIRED PROPS: 
    onSubmit (method) - method that fires when the form is submitted
    errors - errors object
    user - the user object
    text - text to display
    updateFormField (method) - method that fires when a form value is updated
*/
export const UserMaintenance = ({ errors, text, user, onSubmit, updateFormField, isSaving }) => (
  <ErrorBoundary>
    <div className="form-styles light-shadow">
      {text.title ? <h2>{text.title}</h2> : ""}
      {text.body ? <p>{text.body}</p> : ""}
      <form onSubmit={onSubmit}>
        <Input
          value={user.name}
          name="name"
          onChange={updateFormField}
          displayName="Name"
          type="text"
          errorText={errors.name}
          classPrepend="fa fa-users"
        />

        <TextArea
          value={user.description}
          name="description"
          onChange={updateFormField}
          displayName="Description"
          cols={10}
          rows={3}
          errorText={errors.description}
          byline="A short description of your organization"
        />

        <Input
          value={user.contact}
          name="contact"
          onChange={updateFormField}
          displayName="Contact"
          type="text"
          errorText={errors.contact}
          placeholder="Contact"
          classPrepend="fa fa-user"
        />

        <Input
          value={user.email}
          name="contact"
          onChange={updateFormField}
          classPrepend="fa fa-envelope"
          displayName="Email"
          type="email"
          errorText={errors.email}
          placeholder="name@yourdomain.com"
        />

        <Input
          value={user.sms}
          name="sms"
          onChange={updateFormField}
          displayName="SMS Phone #"
          type="text"
          classPrepend="fa fa-phone"
          errorText={errors.sms}
          placeholder="5555555555"
          maskPhone={true}
        />

        <Input
          value={user.web}
          name="web"
          errorText={errors.web}
          placeholder="Web"
          displayName="Web URL"
          type="text"
          onChange={updateFormField}
          classPrepend="fa fa-link"
        />

        {isSaving ? (
          <i className="fa fa-gear fa-spin fa-2x margin-top-10" />
        ) : (
          <Button type="submit" text="Save" style="default" name="save" />
        )}
      </form>
    </div>
  </ErrorBoundary>
);
