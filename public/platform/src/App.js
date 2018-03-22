

import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import API from '../utils/API';
import LoadingPage from './Pages/LoadingPage';
import SignupPage from './Pages/Signup/';
import config from '../../../config';
// import { Link } from 'react-router-dom';
import './App.css';

const origin = config.origin;



// ENTRY POINT
export default class App extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            user:  API.getAuthorizedUser()[0], //{},  //res.data  /// should be passed in the response from Authorization
            errors: {},
            pageData: null,
        };
    }
    
    /// GRABS OUR PAGE DATA.  THIS IS WHERE ALL THE TEXT EXISTS FOR THE PLATFORM PAGES.  TO MAKE CHANGES SEE ../static/platformPageData.json
    getPlatformPageData() {
        fetch(origin + '/platform/static/platformPageData.json')
            .then(resp => resp.json())
            .then(json => { this.setState({pageData: json })} )
    }

    updateFormField = event => {
        event.preventDefault();
        const { name, value } = event.target;
        const user = this.state.user;
        
        // Handles removing mask from Phone Number input
        if(name === "sms") {
            const number = value.replace(/\D/g, "");
            user[name] = number;
        } else
            user[name] = value;
        this.setState({
            user: user
        });
        
    }
    
    componentDidMount() {
        this.getPlatformPageData();
    }

    render() {
        return (
            <div className="app-container">
                { this.state.pageData === null ? ( 
                    <LoadingPage />
                ) : (
                    <div>
                        <header className="app-header">
                            <h1 className="header-title">{ this.state.pageData.main.title }</h1>
                        </header>
                        <main className="app-content">
                        { this.state.user.name === "" ? (
                            <LoadingPage /> 
                        ) : ( 
                            <SignupPage 
                                user={ this.state.user } 
                                updateFormField={ this.updateFormField } 
                                errors={ this.state.errors }
                                text={ this.state.pageData.signup }
                            />
                        )}
                        </main>
                    </div>
                )}    
            </div>
            
        );
    };
};