///////////////////////////////////////////////////////////////////////
////////////////////      DASHBOARD APP.JS     ////////////////////////
///////////////////////////////////////////////////////////////////////
// 05/02/18 - REFACTOR 0.8
// DGO

'use strict';

import React, { Component } from 'react';
import API from '../../common/utils';
import './App.css';



// The APP class is currently the main hub for the platform.
// It requires the user object, so it will handle all form changes and submits.
export default class App extends Component {
    state = {
        isAuthorized: false,
        ownedNetworks: [],
        memberNetworks: [],
    }



    /// GRABS OUR PAGE DATA.  THIS IS WHERE ALL THE TEXT EXISTS FOR THE PLATFORM PAGES.  TO MAKE CHANGES SEE ../static/platformPageData.json
    getPlatformPageData() {
        
        return new Promise((resolve, reject) => { 
            fetch('/client/static/dashboardPageData.json')
                .then(resp => { let json = resp; return { json, resolve }})
                .then(({ json, resolve }) => resolve(json) )
        })
    }

    componentDidMount() {
        API.get
    }

    render() {
        return (
            <div className="app-container">
                { this.state.isAuthorized ? (
                <h2>Welcome to the Dashboard!</h2>
                ) : (<h2>THOUGH SHALL NOT PASS</h2> )}
            </div>
            
        );
    };
};