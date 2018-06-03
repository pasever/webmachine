'use strict';

//////////////////////////////////////////////////////////////
////////     process db http message for Clients       ///////
//////////////////////////////////////////////////////////////
// DGO 04/30/18  REFACTOR 0.7  Commenting and removing references to Platform


const bodyParser =  			                require('body-parser')
const clientApi =                               require('../../api/client');
const netlifyApi =                              require('../../api/client/netlify');
const { r, g, b } =                             require('../../console');
const request =                                 require('request');
const jwt =                                     require('jsonwebtoken');
const config =                                  require('../../config').init();
const { verifyJWTToken, getIdFromToken } =      require('../../utils/auth/verifyJwtToken');



const dbclient = (router) => {
    router.use(bodyParser.json());
    router.use(verifyJWTToken);
    // DELETE ROUTE
    router.delete("/", (req, res, next) => {
        console.log("-----------DB Clients DELETE ROUTE -----------");
        clientApi.deleteClient(req.token, req.body.id, req.conn, (response) => {
            res.status(200).send(response);
		    next();
 	    });
    });

    // Checks to see if there is an accessId passed in the Request Body, or a Client Id.
    // Might need refactoring?
    router.get('/',  (req, res, next) => {
        console.log("-----------DB Clients GET ROUTE -----------");
        let accessToken = req.headers.authorization || null;
        let clientId = req.query.clientId || null;
        // Checks if there is an access Id passed, gets the matching Client
        console.log(getIdFromToken(accessToken));
        if(accessToken && !clientId) {   
            // Gets the ID out of the JWT
            let accessId = getIdFromToken(accessToken);
            clientApi.getClients(req.token, accessId, req.conn, (response) => {
                res.status(200).send(response);
            });
        // Checks if there's a Client Id passed, gets the matching client
        } else if(accessToken && clientId) {
            let accessId = getIdFromToken(accessToken);
            console.log("ACCESSID:::::::", accessId)
            /// Get's a client based on their Auth0 Id and the Id of the Client
            clientApi.getOneOwnedClient(req.token, accessId, clientId, req.conn, (response) => {
                if(response.name === "CastError") 
                    return res.status(404).send(response);
                else 
                    return res.status(200).send(response);
            });
        // Fail
        } else {
            res.status(401).send({ 
                error: "Nothing to do",
            });
        }
    });
    router.get('/joined', (req, res, next) => {
        console.log("----------DB Clients JOINED GET ROUTE ---------------");
        let accessToken = req.headers.authorization;
        if(accessToken) {
            let accessId = getIdFromToken(accessToken);
            clientApi.getJoinedClients(req.token, accessId, req.conn, (response) => {
                res.status(200).send(response);
            });
        } else {
            res.status(401).send({
                error: "Nothing to do",
            });
        }
    })
    router.get('/public', (req, res, next) => {
        clientApi.getPublicClients(req.token, req.conn, (response) => {
            res.status(200).send(response);
        })
    })
    // Updates a client
    router.post('/', (req, res, next) => {
        console.log("-----------DB Clients POST ROUTE -----------");
        if (req.body) {
            clientApi.updateClient(req.token, req.body, req.conn, function(response){
                res.status(200).send(response);
                next();
            })
        } else {
            let err = new Error('Error Post DB - Please Provide All Required Data');
            res.status(403).send(err.message);
            next(err);
        }
    });

    // Puts a new Client in the Database
    router.put('/', (req, res, next) => {
        console.log("-----------DB Clients PUT ROUTE -----------");
        
        if (req.body) {
            req.body.accessToken = getIdFromToken(req.headers.authorization);
            clientApi.addClient(req.token, req.body, req.conn, (response) => {
                console.log("RESPONSE --- ", response);
		        res.status(200).send(response);
                next();
            })
        } else {
            let err = new Error('Error Put DB - Please Provide All Required Data');
            res.status(403).send(err.message);
            next(err);
        }
    });

    // Adds a stripe source to a client
    router.post('/addStripeSource', (req, res, next) => {
        // Checks if there is a stripe CustomerId and a StripeId
        if(req.body.cId && req.body.sId) {
            
            clientApi.addStripeSource(req.token, req.body.cId, req.body.sId, req.conn, (response) => {
                console.log("RESPONSE --- ", response);
                res.status(200).send(response);
                next();
            })
        } else {
            let err = new Error('Error Post Stripe Source - Please Provide All Required Data');
            res.status(403).send(err.message);
            next(err);
        }

    });

    router.post('/createStripeCustomer', (req, res, next) => {
        if(!req.body) {
            let err = new Error('Need a client object to create a Stripe customer');
            res.status(403).send(err.message);
            next(err);
        }

        clientApi.createStripeCustomer(req.token, req.body, req.conn, (response) => {
            console.log(g("RESPONSE --- ", response));
            res.status(200).send(response);
        })
    })

    // Sets a Stripe Source as the default source
    router.post('/setDefaultSource', (req, res, next) => {
        
        if(req.body.cId && req.body.sId) {
            clientApi.setDefaultSource(req.token, req.body.cId, req.body.sId, req.conn, (response) => {
                console.log(g("RESPONSE --- ", response));
                res.status(200).send(response);
            })
        } else {
            let err = new Error('Error Update Stripe Source - Please Provide All Required Data');
            res.status(403).send(err.message);
            next(err);            
        }
    }); 

    // Removes a source from a Stripe customer
    router.post('/removeSource', (req, res, next) => {
        if(req.body.cId && req.body.sId) {
            clientApi.removeSource(req.token, req.body.cId, req.body.sId, req.conn, (response) => {
                console.log(g("RESPONSE --- ", response));
                res.status(200).send(response);
            })
        } else {
            let err = new Error('Error in Remove Stripe Source - Please Provide All Required Data');
            res.status(403).send(err.message);
            next(err);            
        }
    })

    // Calls the API which deploys a new Netlify site
    router.post('/netlify', (req, res, next) => {
        if(req.body.client && req.body.templateData) {
            netlifyApi.deployNetlifySite(req.body.client, req.body.templateData).then(resp => {
                console.log(g("Response --- ", resp));
                res.status(200).send(resp);
            }).catch(err => res.status(400).send(err));
        } else {
            let err = new Error('Error in deploying Netlify website -- Not enough information provided.');
            res.status(403).send(err.message);
            next(err);
        }
    })
}

module.exports = dbclient;