
//////////////////////////////////////////////////////////////////////////
////////////////////  Unified Communications Schema /////////////////////
////////////////////////////////////////////////////////////////////////

const mongoose = require("mongoose");
const uuidv1 =  require('uuid/v1')
const Schema = mongoose.Schema;

// notes:
// messageid 34 char unique to the message, smssid is same, but deprecated
// accountsid owner
// messageservicesid is services associated with message
// from - phone number that sent the message and Body is message up to 1600 chars
const messageObject = {
  MessageSid: String,
  SmsSid: String,
  AccountSid: String,
  MessagingServiceSid: String,
  From: String,
  To: String,
  Body: String,
  NumMedia: String,
  NumSegments: String,
  MediaContentType: String,
  MediaUrl: String,
  FromCity: String,
  FromState: String,
  FromZip: String,
  FromCounty: String,
  SmsStatus: String,
  ToCity: String,
  ToState: String,
  ToZip: String,
  ToCountry: String,
  AddOns: String,
  ApiVersion: String,
  PostDate: { type: Date, default: Date.now },
  ChaoticSid: { type: String, default: uuidv1() },
  ChaoticSource: String
}

const messageSchema = new Schema(messageObject);

var Message = mongoose.model("Message", messageSchema);

module.exports = { Message, messageObject }
