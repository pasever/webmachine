import auth0 from 'auth0-js';


  // Sets the session in local storage
const setSession = (authResult) => {
    // Set the time that the Access Token will expire at
    // Gets tomorrow
    let expiresAt = JSON.stringify((authResult.expiresIn * 302400) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
}

  //this function acquires user access token to be used for returning profile information
const getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return null;
    }
    return accessToken;
}


export default {
  //this function checks for successful authentication, and if successful sets session and moves you to the new page
    handleAuthentication() {
        console.log("Handling Authentication!!");
        auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
            this.setSession(authResult);
            history.replace('/');
            return true;
        } else if (err) {
            console.log(err);
            return false;
        }
    });    
  },
  
  isAuthenticated() {
    // Check whether the current time is past the 
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  },

  //this function returns profile object which is populated with the authenticated user's information
  getProfile(cb) {
    let accessToken = getAccessToken();
    if(accessToken){
      auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          return cb(err, profile);
        }
        return cb(err, {});      
      });
    }
  }


}