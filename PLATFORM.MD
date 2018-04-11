# Platform Object

Affected folders and changes made:

  * api
    *  platform  -- Added
       *  db.js -- [Link to reference](#api-db-functions)
       *  index.js -- [Link to reference](#index-db-functions)
  * config
    * config.js [Link to reference](#config-changes)
    * platform.js [Link to reference](#platform-config-changes)
  * db
    * schemas
      * Platform.js [Link to reference](#platform-schema-changes)
    *  mongoose.js [Link to reference](#mongoosejs-changes)
  * public
    * platform -- [Link to reference](#platform-react-app)
  * routes
    * db
      * dbplatform.js [Link to reference](#platform-routes)  
    * auth.js [Link to reference](#auth-changes)
    * db.js [Linke to reference](#db-route-changes)
  * zserver
    * server.js [Link to reference](#server-changes)
  




# API Db Functions

Each of the following functions return a promise with the requested information.  These functions communicate directly from the DB, and should 
only be called via the corresponding index through a route.

    // Tests the Db URI for a good connection (returns bool)
    function testDb(platform)

    // Gets all platforms in the DB Collection 
    function getPlatforms()  

    // Gets platform by platform id
    function getPlatform(id) 

    // Gets platform by Client Id.  This function will also reach out to stripe and attach a stripe customer to the object.  Preferred.
    getPlatformByCId(cId)

    // Adds a platform to the DB.  Takes the email address from the Platform and creates a new stripe customer, and assigns the id to the stripeCustomerId field.
    function putPlatform(platform)

    // Updates a platform  
    function updatePlatform(platform)

    // Deletes a platform.  SOFTDELETE only - flags isDeleted to TRUE  
    function deletePlatform(id)

    // Adds a source of payment to the Stripe customer
    function addStripeSource (customerId, sourceId) 

    // Sets a default payment source via API  
    function setDefaultSource(customerId, ssourceId)

    // Removes a source from a customer in Stripe
    function removeSource(cId, sId)


  
[Return to top](#platform-object)
  
# Index Db Functions

The index.js db functions serve as a connection between the data-layer and the service-layer.  There are added token, connection, and callback functions tacked on,
but they share the same names / purposes as the [API Db Functions](#api-db-functions)

[Return to top](#platform-object)

# Config Changes

The following has been appended.  The new template can be found in configExample:

	"stripe": {
		"publishKey": "",
		"secretKey": ""
	},
	"netlify": {
		"token": "",
		"clientId": "",
		"secret": ""
	},


[Return to top](#platform-object)

# Platform Config Changes

The platform config has been refactored to look more like the Schema.  This removes some barriers to saving it AS a schema, which is done if no schema can be found in the Db.

	{
		"name": "Test Strategic Machines",
		"firstName": "",
    	"surname": "",
		"addressLine1": "",
    	"addressLine2": "",
		"city": "",
		"state": "",
		"zip": "",
		"email": "email@email.com",
		"description": "Test db with primary auth records for orgs and marketplace collections",
		"collections": ["platform", "partners", "workitems"],
		"contact": "ChaoticRoute",
		"sms": "",
		"web": "demo",
		"dbname": "machines",
		"dbConnected": false,
		"uri": "mongodb://localhost:27017/",
		"username": "",
		"password": "",
		"stripeCustomerId": "",
		"isPlatform": true,
		"isLive": false,
		"clientId": "testprofile"
	}


[Return to top](#platform-object)

# Platform Schema Changes

The Platform Schema looks very similar to the Platform.json.  

__NOTE__ the field db was changes to dbname, as Mongo will not allow a document with a field name __db__

    //// SHOULD NAME BE FORCED TO BE UNIQUE?
    // Org name
    name: {
        type: String,
        unique: true,
        required: true,
        default: uuidv1(),
    },
    firstName: type: String,
    surname: type: String,
    addressLine1: type: String,
    addressLine2: type: String,
    city: type: String,
    state: type: String,
    zip: type: String,
    email: type: String,
    description: type: String,
    collections: type: Array,
    contact: type: String,
    sms: type: String,
    web: type: String,
    dbname: type: String,
    uri: type: String,
    username: type: String,
    password: type: String,
    dbConnected: type: Boolean,
    isPlatform: type: Boolean,
    isLive: type: Boolean,
    isDeleted: type: Boolean,
    id: { type: String, default: uuidv1() },
    clientId: type: String, 
    stripeCustomerId: type: String,


[Return to top](#platform-object)

# Mongoose Js Changes

Line 40 was changes to reflect the edit of __db__ to __dbname__

[Return to top](#platform-object)

# Platform React App

Coming soon...

[Return to top](#platform-object)

# Platform Routes

The platform routes have your basic Get, Put, Update, Delete routes, with a few modifiers for API connectivity.  

The get route has been modified to allow either a clientId (__cid__) or platformId (__id__) to be passed via query string.  In this event, it will pass back the corresponding Platform.  Otherwise the program will pass all platforms back.  

Additional routes are: 

    // ==========================  /api/db/platform/addStripeSource ==========================
    // == Adds a stripe source to a Stripe customer.  
    // == Expects a __cId__ (Stripe customer Id) and __sId__ (Stripe source Id) to be in the request body.
    router.post('/addStripeSource', (req, res, next) => { ... }

    
    // ==========================  /api/db/platform/setDefaultSource  ==========================
    // == 
    // == Sets a default payment source for a Stripe customer
    // == Expects a __cId__ (Stripe customer Id) and __sId__ (Stripe source Id) to be in the request body.
    router.post('/setDefaultSource', (req, res, next) => { ... }

    // ==========================  /api/db/platform/removeSource  ==========================
    // == Removes a payment source from a Stripe customer
    // == Expects a __cId__ (Stripe customer Id) and __sId__ (Stripe source Id) to be in the request body.
    router.post('/removeSource', (req, res, next) => { ... }



[Return to top](#platform-object)

# Auth Changes

The auth.js file was changed to allow query strings to pass through a path without having to know the exact path being called.
Line 35 has the addition: 

    test = apiPath.match(/platform/g);
    if(test) apiPath = '/platform';

[Return to top](#platform-object)

# Db Route Changes

Initialized React Router for the platform.

[Return to top](#platform-object)

# Server Changes

The server was changed to point to the new (Platform React App)[#platform-react-app]..

    43  app.use('/platform', express.static('public'));

[Return to top](#platform-object)


