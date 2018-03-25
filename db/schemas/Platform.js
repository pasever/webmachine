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
        required: true,
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
        type: Number,
        default: 0,
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
        required: true,
        unique: true,
    },
    // password for Mongo DB
    password: {
        type: String,
        required: true,
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
    profileId: String,
}

const platformSchema = new Schema(platformObject, { collection: "Platform" });

let Platform = mongoose.model("Platform", platformSchema);

module.exports = { Platform, platformSchema };