//////////////////////////////////////////////////////
//////           platform CRUD DB Ops          ///////
//////////////////////////////////////////////////////
// DGO - 03/19/18

'use strict';

const MongoClient = require('mongodb').MongoClient;
const { Platform } = require('../../db/schemas/Platform');
const {r,g,y,b} = require('../../console');

const config = require('../../config').init();
const stripe = require('stripe')(config.stripe.secretKey);

/// TESTS IF WE CAN CONNECT TO THE MONGODB SERVER
const testDb = (platform) => {
    //  Assign a new mongo client
    let client = new MongoClient(platform.uri);
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

/// Gets all platforms in the DB Collection
exports.getPlatforms = () => {
    return new Promise((resolve, reject) => {
        Platform.find({}, (err, response) => {
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

// Gets platform by id
exports.getPlatform = (id) => {
    return new Promise((resolve, reject) => {
        Platform.find({ where: { id: id }}, (err, response) => {
            if(err) {
                if(err.error !== 'not_found') {
                    resolve(err);
                } else {
                    reject(err);
                }
            }
            resolve(response);
        })
    })
}

// Gets platform by Client Id
exports.getPlatformByCId = (cId) => {
    return new Promise((resolve, reject) => {
        Platform.find({ clientId: cId }).lean().then(response => {
            let user = response[0];
            stripe.customers.retrieve(user.stripeCustomerId, (err, stripeCust) => {                
                if(err) {
                    user["stripeCustomer"] = null;
                } else {
                    user["stripeCustomer"] = stripeCust;
                }
                resolve(user);
            })
        }).catch(err => {
            if(err) {
                if(err.error !== 'not_found') {
                    resolve(err);
                } else {
                    reject(err);
                }
            }
        })
    })
}

// Adds a platform to the DB
exports.putPlatform = (platform) => {
    // Creates a new platform from the Mongo Schema
    let p = new Platform(platform);
    // Checks if we can connect to the DB provided
    return new Promise((resolve, reject) => {
        testDb(platform).then(resp => { 
            // Assign the boolean response to dbConnected
            p.dbConnected = resp;
            stripe.customers.create({
                email: p.email,
                account_balance: 0,
                description: p.description,
            }, (err, customer) => {
                if(err) {
                    console.log(r("Error when creating Stripe customer.  Bailing."));
                    console.log(err);
                }
                p.stripeCustomerId = customer.id;
                p.save().then(response => {
                    resolve(p)
                }).catch(err => reject(err));
            })
        })
    })
}

// Updates a platform
exports.updatePlatform = (platform) => {
    // Checks if we can connect to the database provided
    return new Promise((resolve, reject) => {
        testDb(platform).then(resp => { 
            // Assigns the returned boolean to dbConnected
            platform.dbConnected = resp;
            Platform.findOneAndUpdate({ id: platform.id }, platform, {upsert: true, new: true}).lean().then(user => {
                stripe.customers.retrieve(user.stripeCustomerId, (err, stripeCust) => {       
                    if(err) {
                        user["stripeCustomer"] = null;
                    } else {
                        user["stripeCustomer"] = stripeCust;
                    }
                    resolve(user);
                }).catch(err => resolve(user));
            }).catch(err => reject(err));
        })
    })
}

// Deletes a platform.  SOFTDELETE only - flags isDeleted to TRUE
exports.deletePlatform = (id) => {
    return new Promise((resolve, reject) => {
        Platform.findOneAndUpdate({id: id}, { $set:{ isDeleted: true }}, { new: true }, (err, response) => {
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