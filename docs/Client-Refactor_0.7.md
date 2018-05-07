# Client Refactor 0.7

Changes to Schema : 
  * Default values added
  * Netlify Id and SiteData placeholders added
  * IsDeleted added
  * Stripe customer information added.  << Doesn't get saved, but tacked on when using Lean() in mongoose.

API Changes : 
  * Client data-access library now exists in /client folder, inside API
  * Added getPublicClients, as well as getClientsByAccessId

ROUTES Changes :
  * Renamed dbclient.js to dbclient.js.bak
  * Renamed dbplatform to dbclient.js

PUBLIC Changes :
  * Added /common folder to hold all common React components
  * API calls should now all be placed in the /common/utils/API.js file
  * Axios calls to the server will now include authorization header