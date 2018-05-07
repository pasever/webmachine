///////////////////////////////////////////////////////////////////////
////////////////////      Client APP.JS        ////////////////////////
///////////////////////////////////////////////////////////////////////
// 05/02/18 - REFACTOR 0.8
// DGO

'use strict';

import React, { Component } from 'react';
import API from '../utils/API';
import LoadingPage from './pages/LoadingPage';
import { MaintenanceHeader } from './pages/Partials/';
import {Container, Row, Col } from './components/grid';
import { Link } from 'react-router-dom';
import ErrorBoundary from './components/error/ErrorBoundary';
import MaintenanceWrapper  from './pages/Maintenance/MaintenanceWrapper';
import 'react-tabs/style/react-tabs.css';
import './App.css';

//////// DEFAULT PLATFORM
// Deprecated 04/30/18 for REFACTOR 0.7
//const Platform = require('../../../config/').platform();


// The APP class is currently the main hub for the platform.
// It requires the user object, so it will handle all form changes and submits.
export default class App extends Component {
    // ctor
    constructor(props) {
        super(props);
        
        this.state = {
            user:  null,            //  should be passed in the response from Authorization
            pageData: null,         //  page data object
            hasErrors: false,       //  flags if we should display a message about errors
            redirectToLogin: false,
        };
    }
    
    /// GRABS OUR PAGE DATA.  THIS IS WHERE ALL THE TEXT EXISTS FOR THE PLATFORM PAGES.  TO MAKE CHANGES SEE ../static/platformPageData.json
    getPlatformPageData() {
        
        return new Promise((resolve, reject) => { 
            fetch('/client/static/platformPageData.json')
                .then(resp => { let json = resp; return { json, resolve }})
                .then(({ json, resolve }) => resolve(json) )
        })
    }

    /// When the component mounts, we will try and get all of the platform text and the user object from token.
    componentDidMount() {
        // Gets our platform page data
        const data = this.getPlatformPageData().then(resp => { return resp.json(); });
        
        // Gets our localized user.  Preferably from a localStorage.profileId
        const user = API.getAuthorizedClient(); // get user from localStorage.token through api
        // Waits till all promises are fulfilled to proceed.
        Promise.all([data, user]).then(values => {
            let user = values[1];
            console.log(values);
            /// FOR TESTING PURPOSES.  GRABS THE DEFAULT DATA.
            if(Object.keys(user.data).length === 0 || user === "TOKEN REJECTED") {
                this.setState({ noBusiness: true });
            } else {
                this.setState({ pageData: values[0], user: user.data});
            }
        }).catch((err) => { 
             console.log("ERROR ON MOUNT: ", err)
             this.setState({ redirectToLogin: true });
        })
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
                { this.state.redirectToLogin ? ( <h2>You must be logged in to view this.</h2>) 
                    : ( 
                
                <div>
                    { this.state.pageData === null && !this.state.redirectToLogin ? ( 
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
                                    <MaintenanceWrapper user={this.state.user} pageData={this.state.pageData} />
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
            )}
            </div>
            
        );
    };
};