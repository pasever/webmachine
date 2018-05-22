//////////////////////////////////////////////////////////////////////////////////
////////////////////      Utils URI.js         ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///  Utility functions for URI's                                                //
///                                                                             //
///  DGO                                                                        //
//////////////////////////////////////////////////////////////////////////////////

const config = require('../../../config').init();

export default {
    // Gets a queryStringValue.
    // Usage:
    //// Url: https://www.url.com?myValue=myValue 
    //// let myValue = URI.getQueryStringValue("myValue") 
    //// Works with ? and &
    getQuerystringValue: (name) => {
        let url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        let results = regex.exec(url);
        if(!results) return null;
        if(!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    // Sends the user to the login page.  
    // Gets the login page from the Config file
    redirect: url => {
        window.location.href = url;
    }

}