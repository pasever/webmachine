///////////////////////////////////////////////////////////////////////
////////////////////      Platform APP.JS      ////////////////////////
///////////////////////////////////////////////////////////////////////
// DGO

'use strict';

import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import API from '../utils/API';
import LoadingPage from './pages/LoadingPage';
import { UserMaintenance, DbMaintenance, BillingMaintenance } from './pages/Maintenence';
import config from '../../../config';
import {Container, Row, Col } from './components/grid';
import { Tab, TabPanel, Tabs, TabList } from 'react-tabs';
import ErrorBoundary from './components/error/ErrorBoundary';
import 'react-tabs/style/react-tabs.css';
import './App.css';

//////// DEFAULT PLATFORM
const Platform = require('../../../config/').platform()
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
            hasErrors: false,
            isSaved: false,
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
        const user = API.getAuthorizedUser(); // get user from localStorage.token through api
        
        // Waits till all promises are fulfilled to proceed.
        Promise.all([data, user]).then(values => {
            let user = values[1];
            /// SEE'S IF WE HAVE THE OBJECT IN THE DB.  IF NOT WE RELY ON......  SOMETHING ELSE.  FOR NOW, PLATFORM.JSON
            if(user.data.length <= 0) {
                user = Platform[0];            
                /// If the user doesn't exist in the database, put them there now
                API.addUser(user).then((resp) => {         
                    console.log(resp.data);
                    this.setState({ pageData: values[0], user: resp.data })
                }).catch(err => console.log(err));
            } else {
                this.setState({ pageData: values[0], user: user.data[0]});
            }
            
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
        API.updateUser(this.state.user).then(resp => {
            if(resp.data.errors) {
                this.setState({ errors: resp.data.errors, hasErrors: true  });
                console.log(resp.data.errors);
            } else {
                this.setState({ errors: {}, hasErrors: false });
            }
        }).catch(err => console.log(err));
    }

    toggleSystem = () => {
        let user = this.state.user;
        user.isLive = !user.isLive;
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
                    <main className="app-content">
                        <ErrorBoundary>
                        <Container>
                            <Row>
                                <Col size="md-12">
                                    { this.state.user.isLive ? ( 
                                        <h6><i onClick={ this.toggleSystem } className="fa fa-toggle-on toggle"></i> system is live.</h6> ) : ( 
                                        <h6><i onClick={this.toggleSystem} className="fa fa-toggle-off toggle"></i> system is off.</h6>
                                    )}
                                    { this.state.hasErrors ? ( 
                                        <h6 className="badge badge-warning">Please check the forms for errors</h6>
                                    ) : ( "" ) }
                                </Col>
                                <Tabs>
                                    <TabList>
                                        <Tab>Organization</Tab>
                                        <Tab>Database</Tab>
                                        <Tab>Billing</Tab>
                                    </TabList>
                                
                                    <TabPanel>
                                        <Col size="8">
                                            <UserMaintenance
                                                user={ this.state.user } 
                                                updateFormField={ this.updateFormField } 
                                                onSubmit={ this.submitSignupForm }
                                                errors={ this.state.errors }
                                                text={ this.state.pageData.userMaintenance } />      
                                        </Col>
                                    </TabPanel>
                                    <TabPanel>
                                        <Col size="8">
                                            <DbMaintenance
                                                user={ this.state.user } 
                                                updateFormField={ this.updateFormField } 
                                                onSubmit={ this.submitSignupForm }
                                                errors={ this.state.errors }
                                                text={ this.state.pageData.dbMaintenance }
                                                onTestDb={ this.state.testDb } />      
                                        </Col>
                                    </TabPanel>
                                    <TabPanel>
                                        <Col size="8">
                                            <BillingMaintenance text={this.state.pageData.billingMaintenance } />
                                        </Col>
                                    </TabPanel>
                                </Tabs>
                            </Row>
                        </Container>
                        </ErrorBoundary>
                    </main>
                </div>
                
                )}
            </div>
            
        );
    };
};