///////////////////////////////////////////////////////////////////////
////////////////////      DASHBOARD APP.JS     ////////////////////////
///////////////////////////////////////////////////////////////////////
// 05/02/18 - REFACTOR 0.8
// DGO

'use strict';

import React, { Component } from 'react';
import API from '../../common/utils/API';
import LoadingPage from '../../common/LoadingPage';

import './App.css';

const config = require('../../../config').init();


// The APP class is currently the main hub for the platform.
// It requires the user object, so it will handle all form changes and submits.
export default class App extends Component {
    state = {
        isAuthorized: false,
        isLoading: true,
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
        let ownedNetworks = API.getClientsByAccessId();
        let joinedNetworks = API.getJoinedNetworks();
        Promise.all([ownedNetworks]).then(values => {
            console.log(values);
            this.setState({ isLoading: false, ownedNetworks: values[0].data});
        })
    }

    render() {
        return (
            <div className="app-container">
                { this.state.isLoading ? ( <LoadingPage /> ) : (
                    <div>
                        { this.state.ownedNetworks.length > -1 ? (
                            <div>
                                {this.state.ownedNetworks.map((current, idx) =>  
                                    <h2 key={idx}>{current.name}</h2>
                                )}
                            </div>
                        ) : (<h2>Nothing to show here</h2>)}
                    </div>
                )}
                
            </div>
            
        );
    };
};