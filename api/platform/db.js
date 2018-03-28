//////////////////////////////////////////////////////
//////           platform CRUD DB Ops          ///////
//////////////////////////////////////////////////////
// DGO - 03/19/18

'use strict';

const MongoClient = require('mongodb').MongoClient;
const { Platform } = require('../../db/schemas/Platform');
const {r,g,y,b} = require('../../console');


/// TESTS IF WE CAN CONNECT TO THE MONGODB SERVER
const testDb = (platform) => {
    let client = new MongoClient(platform.uri);
    return new Promise((resolve, reject) => { 
        client.connect((error, client) => {
            if(error) {
                return resolve(false);
            }
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
            }};
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

// Gets platform by Profile Id
exports.getPlatformByPId = (pid) => {
    return new Promise((resolve, reject) => {
        Platform.find({ where: { client: pid }}, (err, response) => {
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

// Adds a platform to the DB
exports.putPlatform = platform => {
    console.log("API/PUT PLATFORM")
    let p = new Platform(platform);
    testDb(platform).then(resp => { 
        platform.dbConnected = resp;
        return new Promise((resolve, reject) => {
            p.save((err, response) => {
                if (err) {
                    console.log("Error When Saving Platform")
                    reject(err)
                }
                resolve(response)
            })
        })
    })
}

// Updates a platform
exports.updatePlatform = (platform) => {
    testDb(platform).then(resp => { 
        console.log(resp);
        platform.dbConnected = resp;
        console.log("UPDATED PLATFORM", platform);
        return new Promise((resolve, reject) => {
            Platform.findOneAndUpdate({id: platform.id}, platform, {upsert: true}, (err, response) => {
                if (err) {
                    console.log(r("Error When Updating Platform"));
                    reject(err)
                }
                resolve(response);
            })
        })
    })
}

// Deletes a platform.  SOFTDELETE only - flags isDeleted to TRUE
exports.deletePlatform = (id) => {
    return new Promise((resolve, reject) => {
        Platform.findOneAndUpdate({id: id}, { $set:{ isDeleted: true }}, (err, response) => {
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
