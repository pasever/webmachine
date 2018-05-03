///////////////////////////////////////////////////////////////////////
////////////////////   Platform Signup Page    ////////////////////////
///////////////////////////////////////////////////////////////////////
// DGO
"use strict";

import React from "react";
import { Container, Col, Row } from "../../components/grid/";
import { Input, TextArea, Button } from "../../components/form/";
import "../../styles/signuppage.css";

// Handles Signup for the Platform
/* 
PROPS: 
    user - the user object
    updateFormField (method) - the method to be used to handle the updating of the form data
    errors - error object, modelled after the user object to display errors on the form
*/

const SignupPage = ({ user, updateFormField, onSubmit, errors, text }) => (
  <Container>
    <Row>
      {/* PADDING */}
      <Col size="md-2" />
      <Col size="md-8">
        <div className="jumbotron">
          <h2>{!text.title ? "" : text.title}</h2>
          <p>{!text.body ? "" : text.body}</p>
        </div>
        <form onSubmit={onSubmit}>
          <Input
            value={user.name}
            name="name"
            onChange={updateFormField}
            displayName="Name"
            type="text"
            errorText={errors.name}
          />

          <TextArea
            value={user.description}
            name="description"
            onChange={updateFormField}
            displayName="Description"
            cols={10}
            rows={3}
            errorText={errors.description}
            byline="Just a short description of your organization"
          />

          <Input
            value={user.contact}
            name="contact"
            onChange={updateFormField}
            displayName="Contact"
            type="text"
            errorText={errors.contact}
            placeholder="Contact"
          />

          <Input
            value={user.sms}
            name="sms"
            onChange={updateFormField}
            displayName="SMS Phone #"
            type="text"
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
          />

          <Input
            value={user.db}
            name="db"
            errorText={errors.db}
            placeholder="Database Name"
            displayName="Database Name"
            type="text"
            onChange={updateFormField}
          />

          <Input
            value={user.uri}
            name="uri"
            errorText={errors.uri}
            placeholder="db.example.net"
            displayName="Database URI"
            type="text"
            byline="Do not include your username and password"
            onChange={updateFormField}
          />

          <Input
            value={user.username}
            name="username"
            errorText={errors.username}
            placeholder="username"
            displayName="Database Username"
            type="text"
            onChange={updateFormField}
          />

          <Input
            value={user.password}
            name="password"
            errorText={errors.password}
            placeholder=""
            displayName="Database Password"
            type="password"
            onChange={updateFormField}
          />

          <Button type="submit" text="Sign Up" style="default" name="signup" />
        </form>
      </Col>
      {/* PADDING */}
      <Col size="md-2" />
    </Row>
  </Container>
);

export default SignupPage;
