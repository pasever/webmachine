////////////////////////////////////////////////////////////////////////
//////////////////      Web Maintenance Page       /////////////////////
////////////////////////////////////////////////////////////////////////
// DGO

"use strict";

import React, { Component } from "react";
import { Container, Col, Row } from "../../components/grid/";
import { Input, TextArea, Button } from "../../components/form/";
import { NetlifyDeploy } from '../Partials';
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

export const WebMaintenance = ({ errors, text, user, onSubmit, updateFormField,isSaving }) => (
    <ErrorBoundary>
        <div className="web-form-wrapper">
            <div className="web-form-section light-shadow">
                {text.title ? <h2>{text.title}</h2> : ""}
                {text.welcomeBody ? <p>{text.welcomeBody}</p> : ""}
                <form onSubmit={onSubmit}>
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
            <div className="web-form-section light-shadow">
                { text.getNetlify && user.web ? ( <p><i className="fa fa-info-circle"></i> { text.getNetlify }</p> ) : ("") }
                { user.web === "" ? (
                    <div>{ text.launchMessage ? ( <h2>{text.launchMessage }</h2> ) : "" }
                        <NetlifyDeploy user={ user } />
                    </div>
                ) : "" }
            
            </div>
        </div>
    </ErrorBoundary>
);