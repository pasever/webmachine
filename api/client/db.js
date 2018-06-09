//////////////////////////////////////////////////////
//////           Client CRUD DB Ops            ///////
//////////////////////////////////////////////////////
// DGO - 03/19/18
// DGO - 04/30/18  - REFACTOR for 0.7  RENAMING INSTANCES OF PLATFORM TO CLIENT.  ADDED ACCESS_ID RETRIEVAL.
'use strict';

const MongoClient = require('mongodb').MongoClient;
const { Client } = require('../../db/schemas/Client');
const {r,g,y,b} = require('../../console');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../utils/auth/verifyJwtToken');
const config = require('../../config').init();
const stripe = require('stripe')(config.stripe.secretKey);



/// TESTS IF WE CAN CONNECT TO THE MONGODB SERVER
const buildConnString = (client) => {
    //  Assign a new mongo client
    return new Promise((resolve, reject) => {
        // If there is no username or password, the : and @ need to be dropped.
        let colon = client.username !== '' && client.password !== '' ? ':' : '';
        let at = client.username !== '' && client.password !== '' ? '@' : ''
        client.connectionString = `mongodb://${ client.username.trim() }${ colon }${ client.password.trim() }${ at }${ client.uri.trim() }/${ client.dbname }`;
        console.log("CONNNECTIONSTRING::::::::\n" + client.connectionString);
        let testClient = new MongoClient(client.connectionString);
        /// Attempts to connect
        testClient.connect((error, client) => {
            if(error) return resolve(false);
            // Close the client and resolve we did connect.
            console.log(g("CONNECTED TO THE DATABASE!!!!"));
            testClient.close();
            return resolve(true);
        });
    });
}

const createStripeCustomer = async (client) => {
    return new Promise((resolve, reject) =>{
        stripe.customers.create({
            email: client.email,
            account_balance: 0,
            description: client.description,
        }, (err, customer) => {
            if(err) {
                console.log(r("Error when creating Stripe customer.  Bailing."));
                console.log(err);
                reject(err);
            }
            
            client["stripeCustomerId"] = customer.id;
            resolve(client);
        });
    })     
    
}

/// Gets all Clients in the DB Collection
/// IMPORTANT TO NOTE THIS WILL ONLY GET ACTIVE CLIENTS.  THERE IS ANOTHER CALL TO GET ALL CLIENTS
exports.getClients = (accessId) => {
    return new Promise((resolve, reject) => {
        Client.find({ accessToken: accessId }).then(response => {
            resolve(response);
        }).catch(err => {
            if (err) {
                if (err.error !== 'not_found') 
                    resolve(err)
                else 
                    reject(err)
            };
        });
    })  
}

// Gets all public clients
exports.getPublicClients = () => {
    return new Promise((resolve, reject) => {
        Client.find({ isPrivate: false, isActivated: true }, "name image description addr1 addr2 city state zip sms").then(response => {
            resolve(response);
        }).catch(err => {
            if(err) {
                if(err.error !== 'not_found') 
                    resolve(err)
                else
                    reject(err);
            }
        })
    })
}

// Gets Client by id
exports.getClient = (id) => {
    return new Promise((resolve, reject) => {
        Client.find({ where: { id: id }}).then(response => {
            resolve(response);
        }).catch(err => {
            if(err) {
                if(err.error !== 'not_found') 
                    resolve(err);
                else 
                    reject(err);
            }
        });
    })
}

// Gets all clients a member has joined.
exports.getJoinedClients = (aId) => {
    return new Promise((resolve, reject) => {
        Client.find({ members: aId }, "name description image addr1 addr2 city state zip sms").then(response => {
            resolve(response);
        }).catch(err => {
            if(err) {
                if(err.error !== 'not_found') 
                    resolve(err);
                else 
                    reject(err);
            }            
        })

    })
}

// Gets Client(s) by Auth Access Id & Client Id
exports.getOneOwnedClient = (aId, cId) => {
    return new Promise((resolve, reject) => {
        Client.findOne({ accessToken: aId, _id: cId }).lean().then(response => {
            let client = response;
            if(client.stripeCustomerId) {
                stripe.customers.retrieve(client.stripeCustomerId, (err, stripeCust) => {                
                    if(err) 
                        client["stripeCustomer"] = null;
                    else 
                        client["stripeCustomer"] = stripeCust;
                    return resolve(client);
                })
            } else {
               return resolve(client);
            }
        }).catch(err => {
            reject(err);
        })
    })
}

// Adds a client to the DB
exports.putClient = (client) => {
    
    // Checks if we can connect to the DB provided
    return new Promise((resolve, reject) => {
        createStripeCustomer(client).then(resp => {            
            let newClient = new Client(resp);
            newClient.save().then(response => {
                resolve(newClient)
            }).catch(err => reject(err));
        });
    })
}

exports.createStripeCustomer = (client) => {
    return new Promise((resolve, reject) => {
        createStripeCustomer(client).then(resp => {
            Client.findOneAndUpdate({ _id: resp._id }, resp, {upsert: true, new: true}).lean().then(respClient => {
                
                stripe.customers.retrieve(respClient.stripeCustomerId, (err, stripeCust) => {       
                    if(err) 
                        respClient["stripeCustomer"] = null;
                    else 
                        respClient["stripeCustomer"] = stripeCust;
                    return resolve(respClient);
                })
            }).catch(err => reject(err));
        })
    })
}
// Updates a client
exports.updateClient = (client) => {
    return new Promise((resolve, reject) => {
        // Checks if we can connect to the database provided
        buildConnString(client).then(resp => { 
            // Assigns the returned boolean to dbConnected
            client.dbConnected = resp;
            // Finds the Client by ID, and performs an UPSERT.  LEAN() is used to attach new objects to the Schema.
            Client.findOneAndUpdate({ _id: client._id }, client, {upsert: true, new: true}).lean().then(respClient => {
                // Try and retrieve Stripe's data.
                stripe.customers.retrieve(respClient.stripeCustomerId, (err, stripeCust) => {       
                    if(err) 
                        respClient["stripeCustomer"] = null;
                    else 
                        respClient["stripeCustomer"] = stripeCust;
                    return resolve(respClient);
                })
            }).catch(err => reject(err));
        })
    })
}

// Deletes a platform.  SOFTDELETE only - flags isDeleted to TRUE
exports.deleteClient = (id) => {
    return new Promise((resolve, reject) => {
        Client.findOneAndUpdate({id: id}, { $set:{ isDeleted: true }}, { new: true }, (err, response) => {
            if (err) {
                if (err.error !== 'not_found') {
                    resolve(err)
                } else {
                    reject(err)
                }
            };
            resolve(response);
        });
    })
}

/// Adds a payment source 
// cId - stripe customer id
// sId - stripe source id
exports.addStripeSource = (cId, sId) => {
    return new Promise((resolve, reject) => {
        stripe.customers.createSource(cId, {
            source: sId,
        }).then(response => resolve(response))
        .catch(err => reject(err));
    })
}

// Sets a default payment source via API
exports.setDefaultSource = (cId, sId) => {
    return new Promise((resolve, reject) => {
        stripe.customers.update(cId, { 
            default_source: sId 
        }).then(response => resolve(response))
        .catch(err => reject(err));
    })
}

// Removes a payment source via API
// The deleteSource only sends back a copy of the source, so we need to grab a new copy of
// our stripe customer to return back to the client
exports.removeSource = (cId, sId) => {
    return new Promise((resolve, reject) => {
        stripe.customers.deleteSource(cId, sId).then(response => { 
            stripe.customers.retrieve(cId, (err, stripeCust) => {
                resolve(stripeCust);
            })
        }).catch(err => reject(err));
    })
}
