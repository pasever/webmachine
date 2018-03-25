///////////////////////////////////////////////////////////////////////
////////////////////      Platform APP.JS      ////////////////////////
///////////////////////////////////////////////////////////////////////
// DGO

'use strict';

import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import API from '../utils/API';
import LoadingPage from './pages/LoadingPage';
//import SignupPage from './pages/Signup/';
import MaintenanceForm from './pages/Maintenence';
import config from '../../../config';
// import { Link } from 'react-router-dom';
import './App.css';

const origin = config.origin;



// The APP class is currently the main hub for the platform.
// It requires the user object, so it will handle all form changes and submits.
export default class App extends Component {
    // ctor
    constructor(props) {
        super(props);
        
        this.state = {
            user:  null,        //{},  //res.data  /// should be passed in the response from Authorization
            errors: {},         
            pageData: null,
        };
    }
    
    /// GRABS OUR PAGE DATA.  THIS IS WHERE ALL THE TEXT EXISTS FOR THE PLATFORM PAGES.  TO MAKE CHANGES SEE ../static/platformPageData.json
    getPlatformPageData() {
        
        return new Promise((resolve, reject) => { 
            fetch(origin + '/platform/static/platformPageData.json')
                .then(resp => { let json = resp; return { json, resolve }})
                .then(({ json, resolve }) => resolve(json) )
        })
    }

    // HANDLES UPDATING FORMS ON BOTH THE SIGNUP AND MAINTENANCE PAGES
    updateFormField = event => {
        event.preventDefault();
        // Grabs the attributes from the target
        const { name, value } = event.target;
        // Get the current user object from the state
        const user = this.state.user;
        // If this is a phone number, we need to remove the mask
        if(name === "sms") {
            // Handles removing mask from Phone Number input
            const number = value.replace(/\D/g, "");
            user[name] = number;
        } else
            user[name] = value;

        // Sets the updated user object back in the state
        this.setState({
            user: user
        });
        
    }
    
    submitSignupForm = event => {
        event.preventDefault();
        API.addUser(this.state.user, true).then(resp => console.log(resp));
    }

    /// When the component mounts, we will try and get all of the platform text and the user object from token.
    componentDidMount() {
        // Gets our platform page data
        const data = this.getPlatformPageData().then(resp => resp.json());
        
        /////////// FUTURE ----
        let token = localStorage.token;     
        //////////  FUTURE  
        ////////// TURN TOKEN INTO PROFILE ID AND SEE IF WE HAVE A MATCHING PROFILE ID THAT'S ALREADY IN MONGO.  IF SO,
        ////////// RETURN THAT USER DATA!

        // Gets our localized user.  Preferably from a localStorage.token
        const user = API.getAuthorizedUser()[0]; // get user from localStorage.token through api
        
        // Waits till all promises are fulfilled to proceed.
        Promise.all([data, user]).then(values => {
            this.setState({ pageData: values[0], user: values[1] })
        })
    }

    render() {
        return (
            <div className="app-container">
                { /* SHOWS A LOADING SCREEN UNTIL THE PAGE TEXT IS RETURNED */}
                { this.state.pageData === null ? ( 
                    <LoadingPage />
                ) : (
                    <div>
                        <header className="app-header">
                            <h1 className="header-title">{ this.state.pageData.main.title }</h1>
                        </header>
                        <main className="app-content">
                            { /* IF THE USER IS NOT YET LIVE, HAVE THEM COMPLETE THE SIGNUP PROCESS */ }
                            <Container>
                                <Row>
                                    <MaintenanceForm
                                        user={ this.state.user } 
                                        updateFormField={ this.updateFormField } 
                                        onSubmit={ this.submitSignupForm }
                                        errors={ this.state.errors }
                                        text={ this.state.pageData.signup } />      
                                </Row>
                            </Container>
                        </main>
                    </div>
                
                )}
            </div>
            
        );
    };
};