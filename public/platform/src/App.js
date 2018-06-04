///////////////////////////////////////////////////////////////////////
////////////////////      Platform APP.JS      ////////////////////////
///////////////////////////////////////////////////////////////////////
// DGO

'use strict';

import React, { Component } from 'react';
import API from '../utils/API';
import LoadingPage from './pages/LoadingPage';
import { UserMaintenance, DbMaintenance, BillingMaintenance } from './pages/Maintenance';
import { MaintenanceHeader } from './pages/Partials/';
import config from '../../../config';
import {Container, Row, Col } from './components/grid';
import { Tab, TabPanel, Tabs, TabList } from 'react-tabs';
import ErrorBoundary from './components/error/ErrorBoundary';
import 'react-tabs/style/react-tabs.css';
import './App.css';

//////// DEFAULT PLATFORM
const Platform = require('../../../config/').platform();
const origin = config.origin;



// The APP class is currently the main hub for the platform.
// It requires the user object, so it will handle all form changes and submits.
export default class App extends Component {
    // ctor
    constructor(props) {
        super(props);
        
        this.state = {
            user:  null,        //{},  //res.data  /// should be passed in the response from Authorization
            errors: {},             //  errors object
            pageData: null,         //  page data object
            hasErrors: false,       //  flags if we should display a message about errors
            isSaved: false,         //  flags if we should inform the user data has been saved
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

    /// When the component mounts, we will try and get all of the platform text and the user object from token.
    componentDidMount() {
        // Gets our platform page data
        const data = this.getPlatformPageData().then(resp => resp.json());
        
        // Gets our localized user.  Preferably from a localStorage.profileId
        const user = API.getAuthorizedPlatform(); // get user from localStorage.token through api
        // Waits till all promises are fulfilled to proceed.
        Promise.all([data, user]).then(values => {
            let user = values[1];
            console.log(user);
            /// SEE'S IF WE HAVE THE OBJECT IN THE DB.  IF NOT WE RELY ON......  SOMETHING ELSE.  FOR NOW, PLATFORM.JSON
            /* 
            THE FOLLOWING HAS BEEN COMMENTED OUT BECAUSE WE ARE NOW ASSUMING THERE IS IN FACT A PLATFORM THAT EXISTS IN THE
            DATABASE, AND THERE IS A LOCAL TOKEN FOR THE CLIENT ID OR IT'S SENT THROUGH RES.DATA

            ^^  THIS NEEDS TO BE WORKED OUT.
            if(user.data.name == "") {
                user = Platform[0];            
                /// If the user doesn't exist in the database, put them there now
                API.addPlatform(user).then((resp) => {        
                    console.log(resp); 
                    this.setState({ pageData: values[0], user: resp.data })
                }).catch(err => console.log(err));
            } else { */
            
            this.setState({ pageData: values[0], user: user.data});
            
            
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
    
    // Method that handles saving the user
    submitSignupForm = event => {
        event.preventDefault();
        API.updatePlatform(this.state.user).then(resp => {
        
            if(resp.data.errors) {
                this.setState({ errors: resp.data.errors, hasErrors: true, isSaved: false });
            } else {
                this.setState({ errors: {}, hasErrors: false, user: resp.data, isSaved: true });
            }
        }).catch(err => console.log(err));
    }

    // Method that handles the clicking of the DELETE PLATFORM button.  
    ///  FUTURE - SOME MORE WARNING SHOULD BE GIVEN BEFORE THE USER ACTUALLY HAS THEIR PLATFORM FLAGGED FOR DELETION.
    deletePlatform = event => {
        event.preventDefault();
        API.deletePlatform(this.state.user).then(resp => {
            this.setState({ user: resp.data });
        })
    }

    /// TOGGLES THE SYSTEM GOING LIVE.  
    /// NON-FUNCTIONAL
    toggleSystem = () => {
        //// RUN A TEST IF THE SYSTEM CAN GO LIVE!!
        //// 
        let user = this.state.user;
        user.isLive = !user.isLive;
        
        //// DON'T JUST UPDATE THE STATE - SAVE THE USER!
        this.setState({ user: user });
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
                    { this.state.user.isDeleted ? ( <h2>This platform has been deleted</h2>) : (
                    <main className="app-content">
                        <ErrorBoundary>
                        <Container>
                            <Row>
                                <MaintenanceHeader 
                                    toggleSystem={this.toggleSystem} user={this.state.user} hasErrors={this.state.hasErrors } 
                                    headerText={this.state.pageData.header} deletePlatform={ this.deletePlatform } />
                                { this.state.isSaved ? ( <span className="badge badge-success">Changes have been saved.</span>) : null }
                                <Tabs>
                                    <TabList>
                                        <Tab>Organization</Tab>
                                        <Tab>Database</Tab>
                                        <Tab>Billing</Tab>
                                    </TabList>
                                
                                    <TabPanel>
                                        <Col size="12 md-8">
                                            <UserMaintenance
                                                user={ this.state.user } 
                                                updateFormField={ this.updateFormField } 
                                                onSubmit={ this.submitSignupForm }
                                                errors={ this.state.errors }
                                                text={ this.state.pageData.userMaintenance } />      
                                        </Col>
                                    </TabPanel>
                                    <TabPanel>
                                        <Col size="12 md-8">
                                            <DbMaintenance
                                                user={ this.state.user } 
                                                updateFormField={ this.updateFormField } 
                                                onSubmit={ this.submitSignupForm }
                                                errors={ this.state.errors }
                                                text={ this.state.pageData.dbMaintenance } />      
                                        </Col>
                                    </TabPanel>
                                    <TabPanel>
                                        <Col size="12 md-8">
                                            <BillingMaintenance 
                                                text={ this.state.pageData.billingMaintenance } 
                                                user={ this.state.user } 
                                                updateFormField={ this.updateFormField } />
                                        </Col>
                                    </TabPanel>
                                </Tabs>
                            </Row>
                        </Container>
                        </ErrorBoundary>
                    </main>
                    /* END isDeleted CHECK */
                    )}
                </div>
                /* END pageData CHECK */
                )}
            </div>
            
        );
    };
};