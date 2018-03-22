///////////////////////////////////////////////////////////////////////
////////////////////   Platform Signup Page    ////////////////////////
///////////////////////////////////////////////////////////////////////
// DGO


import React from 'react';
import { Container, Col, Row } from '../../components/grid/';
import { Input, TextArea } from '../../components/form/';


// Handles Signup for the Platform
/* 
PROPS: 
    user - the user object
    updateFormField (method) - the method to be used to handle the updating of the form data
    errors - error object, modelled after the user object to display errors on the form
*/

const SignupPage = ({ user, updateFormField, submitForm, errors, text }) => (
    <Container>
        <Row>
            { /* PADDING */ }
            <Col size="md-2" />
            <Col size="md-8">
                <h2>{ !text.formTitle  ? "" : text.formTitle }</h2>
                <form>
                    <Input value={ user.name } 
                        name="name" onChange={ updateFormField } 
                        displayName="Name" type="text" errorText={ errors.name } />
                    <TextArea 
                        value={ user.description } name="description"
                        onChange={ updateFormField } displayName="Description"
                        cols={10} rows={3} errorText={ errors.description } 
                        byline="Just a short description of your organization" />
                    <Input value={ user.contact } 
                        name="contact" onChange={ updateFormField }
                        displayName="Contact" type="text" errorText={ errors.contact } placeholder="Contact" />
                    <Input value={ user.sms } name="sms" onChange={ updateFormField } 
                        displayName="SMS Phone #" type="text"
                        errorText={ errors.sms } placeholder="5555555555" maskPhone={true} />
                    <Input value={ user.web } name="web" errorText={ errors.web } placeholder="Web"
                        displayName="Web URL" type="text" onChange={ updateFormField } />
                </form>
            </Col>
            { /* PADDING */ }
            <Col size="md-2" />
        </Row>
    </Container>
);

export default SignupPage;

