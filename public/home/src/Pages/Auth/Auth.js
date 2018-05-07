// src/Auth/Auth.js
import history from './History';
import auth0 from 'auth0-js';
import {Redirect} from 'react-router-dom';

const config = require("../../../../../config").init();

//set up auth0 configuration
export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'teststrategicmachines.auth0.com',
    clientID: config.auth0.clientID,
    redirectUri: 'http://localhost:3000',
    audience: 'https://teststrategicmachines.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile user_metadata',
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  
//this function pulls up the auth0 authorization
  login() {
    this.auth0.authorize();
  }

  //this function checks for successful authentication, and if successful sets session and moves you to the new page
  handleAuthentication() {
    console.log("Handling authentication!!");
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/');
      } else if (err) {
        history.replace('/');
        console.log(err);
      }
    });    
  }

  // Sets the session in local storage
  setSession(authResult) {
    // Set the time that the Access Token will expire at
    // Gets tomorrow
    let expiresAt = JSON.stringify((authResult.expiresIn) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    history.replace('/');    
  }

  //this function acquires user access token to be used for returning profile information
  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return null;
    }
    return accessToken;
  }

  
  //this function returns profile object which is populated with the authenticated user's information
  getProfile(cb) {
    let accessToken = this.getAccessToken();
    if(accessToken){
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          return cb(err, profile);
        }
        return cb(err, {});      
      });
    }
  }


  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  
}

