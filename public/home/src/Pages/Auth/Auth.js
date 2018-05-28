// src/Auth/Auth.js
import history from './History';
import auth0 from 'auth0-js';
import {Redirect} from 'react-router-dom';
import URI from '../../../../common/utils/URI';
const config = require("../../../../../config").init();



//set up auth0 configuration
export default class Auth {
  
  auth0 = new auth0.WebAuth({
    domain: config.auth0.domain,
    clientID: config.auth0.clientID,
    redirectUri: 'http://localhost:3000',
    audience: config.auth0.audience,
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
  login(redirect = "") {
    if(redirect !== "") localStorage.setItem("redirect", redirect);
    this.auth0.authorize();
  }

  //this function checks for successful authentication, and if successful sets session and moves you to the new page
  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        let redirect = localStorage.getItem("redirect");
        if(redirect) {
          localStorage.removeItem("redirect");
          URI.redirect(redirect);
        }
        history.replace('/');
      } else if (err) {
        history.replace('/');
        console.log("ERR::::", err);
      }
    });    
  }

  // Sets the session in local storage
  setSession(authResult) {
    // Set the time that the Access Token will expire at
    // Gets about a month
    let expiresAt = JSON.stringify((authResult.expiresIn * 304400) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
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

