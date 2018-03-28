///////////////////////////////////////////////////////////////////////
//////////////////      Db Maintenance Page       /////////////////////
///////////////////////////////////////////////////////////////////////
// DGO


'use strict';

import React, { Component } from 'react';
import { Container, Col, Row } from '../../components/grid/';
import { Input, TextArea, Button } from '../../components/form/';
import ErrorBoundary from '../../components/error/ErrorBoundary';
import '../../styles/maintenancepage.css';


export const DbMaintenance = ({errors, text, user, onSubmit, updateFormField, onTestDb }) => (
    <ErrorBoundary>
        { text.title ? ( <h2>{text.title}</h2>): ("")}
        { text.body ? (<p>{text.body}</p>) : ("") }
        { user.dbConnected ? ( 
            <h6><i className="fa fa-toggle-on"></i> db can connect.</h6> ) : ( 
            <h6><i className="fa fa-toggle-off"></i> db connection failed.  Please check the uri.</h6>
        )}
        <form onSubmit={ onSubmit }>
            <Input value={ user.dbname } name="dbname" errorText={ errors.dbname } placeholder="Database Name"
                displayName="Database Name" type="text" onChange={ updateFormField } />

            <Input value={ user.uri } name="uri" errorText={ errors.uri } placeholder="db.example.net"
                displayName="Database URI" type="text" byline="Do not include your username and password" 
                onChange={ updateFormField } />
            
            <Input value={ user.username } name="username" errorText={ errors.username } placeholder="username"
                displayName="Database Username" type="text" onChange={ updateFormField } />

            <Input value={ user.password } name="password" errorText={ errors.password } placeholder=""
                displayName="Database Password" type="password" onChange={ updateFormField } />

            <Button type="submit"  text="Save" style="default" name="signup" />
        </form>
    </ErrorBoundary>
);

