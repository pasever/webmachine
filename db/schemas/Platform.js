///////////////////////////////////////////////////////////////////////
////////////////////      Platform Schema      ////////////////////////
///////////////////////////////////////////////////////////////////////

'use strict';

const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');

const Schema = mongoose.Schema;


const platformObject = {
    
    //// SHOULD NAME BE FORCED TO BE UNIQUE?
    // Org name
    name: {
        type: String,
        unique: true,
        default: uuidv1(),
    },
    // Description
    description: {
        type: String,
        default: "",
    },
    // Collections
    collections: {
        type: Array,
        default: [],
    },
    // Point of contact
    contact: {
        type: String,
        default: "",
    },
    // Number for SMS service to originate
    sms: { 
        type: String,
        default: "",
    },
    // Web
    web: {
        type: String,
        default: "",
    },
    // Mongo DB Name
    dbname: {
        type: String,
        default: "",
    },
    // Mongo DB URI - ENCRYPT??
    uri: {
        type: String,
        default: "",
    },
    // Username for Mongo DB
    username: {
        type: String,
        default: "",
    },
    // password for Mongo DB
    password: {
        type: String,
        default: "",
    },
    // if the connection string is live
    dbConnected: {
        type: Boolean,
        default: false,
    },
    // isPlatform?
    isPlatform: {
        type: Boolean,
        default: true,
    },
    // Is platform active?
    isLive: {
        type: Boolean,
        default: false,
    },
    /// Allows for SoftDelete functionality
    isDeleted: {
        type: Boolean,
        default: false,
    },
    // Unique ID
    id: { type: String, default: uuidv1() },

    // Id to the authenticated user
    clientId: { 
        type: String, 
        default: "",
    },
    // Stripe customer ID
    stripeCustomerId: {
        type: String,
        default: "",
    },

}

const platformSchema = new Schema(platformObject, { collection: "Platform", versionKey: false });



let Platform = mongoose.model("Platform", platformSchema);

module.exports = { Platform, platformSchema };