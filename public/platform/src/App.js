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
            user:  null,            //  should be passed in the response from Authorization
            errors: {},             //  errors object
            pageData: null,         //  page data object
            hasErrors: false,       //  flags if we should display a message about errors
            isSaved: false,         //  flags if we should inform the user data has been saved
            isSaving: false,        //  shows the "saving" cog
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

            /// FOR TESTING PURPOSES.  GRABS THE DEFAULT DATA.
            if(Object.keys(user.data).length === 0) {
                API.addPlatform(Platform[0]).then(resp => {
                    this.setState({pageData: values[0], user: resp.data})
                })
            } else {
                this.setState({ pageData: values[0], user: user.data});
            }
        })
    }

    // HANDLES UPDATING
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
    submitForm = event => {
        this.setState({ isSaving: true });
        event.preventDefault();
        API.updatePlatform(this.state.user).then(resp => {
        
            if(resp.data.errors) {
                this.setState({ errors: resp.data.errors, hasErrors: true, isSaved: false, isSaving: false });
            } else {
                this.setState({ errors: {}, hasErrors: false, user: resp.data, isSaved: true, isSaving: false });
            }
        }).catch(err => { 
            console.log(err) 
            this.setState({ isSaving: false, isSaved: false });
        });
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
                                                user={ this.state.user } updateFormField={ this.updateFormField } 
                                                onSubmit={ this.submitForm } errors={ this.state.errors }
                                                text={ this.state.pageData.userMaintenance } isSaving={this.state.isSaving } />      
                                        </Col>
                                    </TabPanel>
                                    <TabPanel>
                                        <Col size="12 md-8">
                                            <DbMaintenance
                                                user={ this.state.user } updateFormField={ this.updateFormField } 
                                                onSubmit={ this.submitForm } errors={ this.state.errors }
                                                text={ this.state.pageData.dbMaintenance } isSaving={this.state.isSaving } />      
                                        </Col>
                                    </TabPanel>
                                    <TabPanel>
                                        <Col size="12">
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