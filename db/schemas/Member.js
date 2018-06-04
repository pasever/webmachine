'use strict';

///////////////////////////////////////////////////////////////////////////
/////////////// Partner Schema: Developers, Designers, SQE ///////////////
//////////////////////////////////////////////////////////////////////////

const mongoose = require("mongoose");
const uuidv1 =  require('uuid/v1')
const Schema = mongoose.Schema;

// notes:
// refactor - areas to explore include capturing github auth data, auth via cell,
// management of workitems, payments data info
// need to identify some unique identifier for each partner

const memberObject = {
  firstName: String,
  lastName: String,
  image: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  zip: String,
  cell: String,
  email: String,
  auth0Id: String,
  networks: [ String ],
  // isAuthenticated: { type: Boolean, default: false },
  // isActive: { type: Boolean, default: true },
  joinDate: { type: Date, default: Date.now() },
  // postdate: { type: Date, default: Date.now() },
  id: { type: String, default: uuidv1() }
}

const memberSchema = new Schema(memberObject, { collection: 'Member' });

var Member = mongoose.model("Member", memberSchema);

module.exports = { Member, memberSchema }
