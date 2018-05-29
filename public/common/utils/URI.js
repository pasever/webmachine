//////////////////////////////////////////////////////////////////////////////////
////////////////////      Utils URI.js         ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///  Utility functions for URI's                                                //
///                                                                             //
///  DGO                                                                        //
//////////////////////////////////////////////////////////////////////////////////


export default {
    /**
      * @function getQuerystringValue
      * @argument name
      * @returns the value of the requested querystring or ""
      * @description Gets a queryStringValue.
      *  Usage:
      * Url: https://www.url.com?myValue=myValue 
      * let myValue = URI.getQueryStringValue("myValue") 
      * Works with ? and &
    */
    getQuerystringValue: name => {
        let url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        let results = regex.exec(url);
        if(!results) return null;
        if(!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    // Sends the user to another page
    redirect: url => {
        window.location.href = url;
    }

}