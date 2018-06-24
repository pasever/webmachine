//////////////////////////////////////////////////////
//////           Client Mongo Schema           ///////
//////////////////////////////////////////////////////
/// DGO - 04/30/18  
/// REFACTOR 0.7 - DEFAULT VALUES ADDED TO PREVENT A DOCUMENT FROM BEING ADDED TO A COLLECTION WITHOUT THE FIELDS, CAUSING PROBLEMS LATER.


'use strict';

const mongoose = require("mongoose");
const uuidv1 =  require('uuid/v1')

const Schema = mongoose.Schema;

const clientObject = {
  ///// GENERAL INFORMATION /////
  // Org name
  name: {
    type: String,
    unique: true,
    required: true,
    default: "",
  },
  // Avatar
  image: { 
    type: String,
    default: "",
  },
  // Address: 
  addr1: {
    type: String,
    default: "",
  },
  addr2: {
    type: String,
    default: "",
  },
  // City
  city: {
    type: String,
    default: "",
  },
  // State
  state: {
    type: String,
    default: "",
  },
  // Zip
  zip: {
    type: String,
    default: "",
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
  // Correspondence email
  email: { 
    type: String,
    default: "",
  },

  ////// DATABASE INFORMATION //////////
  // Name of Client's datastore
  dbname:{ 
    type: String,
    default: "",
  },

  urilocal: String,
  // Db Uri.  I.E. mongodb://localhost
  uri:{ 
    type: String,
    default: "",
  },
  dbConnected: {
    type: Boolean,
    default: false,
  },
  // Db Username
  username:{ 
    type: String,
    default: "",
  },
  connectionString: {
    type: String,
    default: "",
  },
  // Db Password
  password: { 
    type: String,
    default: "",
  },

  // For AuthO
  accessToken: { 
    type: String, 
    default: "",
    select: false,
    required: true,
  },
  // Stripe customer ID
  stripeCustomerId: {
    type: String,
    default: "",
  },

  /////// ONLINE PRESENCE INFORMATION ////////////
  // Web
  web: {
    type: String,
    default: "",
  },
  // If they launched a site with Strategic Machines
  netlifySiteId: {
    type: String,
    default: "",
  },
  // Templated data
  siteData: {
    callToAction: {
      type: String,
      default: "",
    },
    shortDescription: {
      type: String,
      default: "",
    },
    longDescription: {
      type: String,
      default: "",
    },
  },
  // Array that consists of AuthO Access_Id's
  members: {
    type: Array,
    default: [],
  },
  agents: {
    type: Array,
    default: [],
  },
  // Array that consists of whitelisted emails.  We need to always remove Emails/Numbers who join.
  whiteList: {
    type: Array,
    defailt: [],
  },

  // Flags if the Network wishes to be deleted or not
  isDeleted: {type: Boolean, default: false },
  // Flags is the Network seeks only private communication
  isPrivate: { type: Boolean, default: true },
  // Flags if the network has gone live
  isActivated: { type: Boolean, default: false },
  // Date the Network is added to the Database
  postdate: { type: Date, default: Date.now },
  // Unique Identifier, use instead of _id.
  id: { type: String, default: uuidv1() }
}

const clientSchema = new Schema(clientObject, { collection: 'Client' });

var Client = mongoose.model("Client", clientSchema);

module.exports = { Client, clientSchema, clientObject }
