//////////////////////////////////////////////////////
//////           Client CRUD DB Ops            ///////
//////////////////////////////////////////////////////
// DGO - 03/19/18
// DGO - 04/30/18  - REFACTOR for 0.7  RENAMING INSTANCES OF PLATFORM TO CLIENT.  ADDED ACCESS_ID RETRIEVAL.
'use strict';

const MongoClient = require('mongodb').MongoClient;
const { Client } = require('../../db/schemas/Client');
const {r,g,y,b} = require('../../console');

const config = require('../../config').init();
const stripe = require('stripe')(config.stripe.secretKey);

/// TESTS IF WE CAN CONNECT TO THE MONGODB SERVER
const testDb = (client) => {
    //  Assign a new mongo client
    let client = new MongoClient(client.uri);
    return new Promise((resolve, reject) => { 
        /// Attempts to connect
        client.connect((error, client) => {
            if(error) {
                /// In case of an error, we resolve false
                return resolve(false);
            }
            // Close the client and resolve we did connect.
            client.close();
            return resolve(true);
        });
    });
}

/// Gets all Clients in the DB Collection
/// IMPORTANT TO NOTE THIS WILL ONLY GET ACTIVE CLIENTS.  THERE IS ANOTHER CALL TO GET ALL CLIENTS
exports.getClients = () => {
    return new Promise((resolve, reject) => {
        Client.find({ isActivated: true }, (err, response) => {
            if (err) {
                if (err.error !== 'not_found') 
                    resolve(err)
                else 
                    reject(err)
            };
            resolve(response);
        });
    })  
}

exports.getPublicClients = () => {
    return new Promise((resolve, reject) => {
        Client.find({ isPrivate: false, isActivated: true }, (err, response) => {
            if(err) {
                if(err.error !== 'not_found') 
                    resolve(err)
                else
                    reject(err);
            }
            resolve(response);
        })
    })
}

// Gets Client by id
exports.getClient = (id) => {
    return new Promise((resolve, reject) => {
        Client.find({ where: { id: id }}, (err, response) => {
            if(err) {
                if(err.error !== 'not_found') 
                    resolve(err);
                else 
                    reject(err);
            }
            resolve(response);
        })
    })
}

// Gets Client(s) by Auth Access Id
exports.getClientByAccessId = (aId) => {
    return new Promise((resolve, reject) => {
        Client.find({ accessId: aId }).lean().then(response => {
            let user = response[0];
            stripe.customers.retrieve(user.stripeCustomerId, (err, stripeCust) => {                
                if(err) 
                    user["stripeCustomer"] = null;
                else 
                    user["stripeCustomer"] = stripeCust;
                resolve(user);
            })
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

// Adds a client to the DB
exports.putClient = (client) => {
    // Creates a new client from the Mongo Schema
    let c = new Platform(client);
    // Checks if we can connect to the DB provided
    return new Promise((resolve, reject) => {
        testDb(client).then(resp => { 
            // Assign the boolean response to dbConnected
            c.dbConnected = resp;
            stripe.customers.create({
                email: c.email,
                account_balance: 0,
                description: c.description,
            }, (err, customer) => {
                if(err) {
                    console.log(r("Error when creating Stripe customer.  Bailing."));
                    console.log(err);
                }
                c.stripeCustomerId = customer.id;
                c.save().then(response => {
                    resolve(c)
                }).catch(err => reject(err));
            })
        })
    })
}

// Updates a client
exports.updateClient = (client) => {
    return new Promise((resolve, reject) => {
        // Checks if we can connect to the database provided
        testDb(client).then(resp => { 
            // Assigns the returned boolean to dbConnected
            client.dbConnected = resp;
            // Finds the Client by ID, and performs an UPSERT.  LEAN() is used to attach new objects to the Schema.
            Client.findOneAndUpdate({ id: client.id }, client, {upsert: true, new: true}).lean().then(respClient => {
                // Try and retrieve Stripe's data.
                stripe.customers.retrieve(respClient.stripeCustomerId, (err, stripeCust) => {       
                    if(err) 
                        respClient["stripeCustomer"] = null;
                    else 
                        respClient["stripeCustomer"] = stripeCust;
                    resolve(user);
                }).catch(err => resolve(user));
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
