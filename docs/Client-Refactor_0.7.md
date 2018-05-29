# Client Refactor 0.7

Changes to Client Schema : 
  * Default values added
  * Netlify Id and SiteData placeholders added
  * IsDeleted added
  * Stripe customer information added.  << Doesn't get saved, but tacked on when using Lean() in mongoose.

Changes to CONFIG.json :  
  	"auth0": {  
  		"clientID": "",  
  		"clientSecret": "",  
  		"jwksUri": "",  
  		"domain": "",  
  		"issuer": "",  
  		"audience": ""  
  	},  
  	"cloudinary": {  
          "preset": "",  
          "url": ""  
      },  


API/Core Changes : 
  * Client data-access library now exists in /client folder, inside API
  * Added getPublicClients, as well as getClientsByAccessId
  * utils/auth added jwtVerifyToken function for use as middleware for protected routes.  
  > ABOUT PROTECTING YOUR ROUTES --   
  > 
  > > All api calls should be made using axios, and be contained in the /public/common/API.js file.  
  > > Axios will make the call to these routes placing the id_token (which can be deconstructed) in the header.  
  > > Protect your routes on the server side by using the verifyJWTToken middleware.  
  > > Beware - protecting a navicable route poses a larger challenge than protecting routes with actual data access.
  > >   
  * getIdFromToken added to jwtVerifyToken file, used to strip the Id out of the token.  Pass this function the entire JWT from Auth0.
  

ROUTES Changes :
  * Renamed dbclient.js to dbclient.js.bak
  * Renamed dbplatform to dbclient.js
  * Route: /api/db/client can either be sent only an accessId or both an accessId and a clientId.  If it is just provided with an access Id it will return an array of all clients that accessId manages.  Otherwise, it will return a single client (for maintenance).  This route will return a 401 Unauthorized error code.
  * Added /api/db/client/public route, which gets all Clients who are marked isPrivate: false and isActivated: true.  This is for public network selection.
  * Added /api/db/client/joined route, which gets all Clients a member has joined.  

PUBLIC Changes :
  * Added /common folder to hold all common React components
  * API calls should now all be placed in the /common/utils/API.js file
  * Axios calls to the server will now include authorization header containing the user's id_token from Auth0.  It can be found in req.headers.authorization
  * /client route now takes a query string expected to the the Client's _id (mongo).  The route that is used to get this Client's Document out of mongo checks to make sure the user's Auth0 id_token also appears in the Document.
  * Added URI utility functions which provide a redirect and the ability to parse URL parameters.