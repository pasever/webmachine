'use strict';

const Client =              require('../schemas/Client').Client
const mongoose =            require('mongoose')
const testClients =         require('../data/clients')
const { g, b, gr, r, y } =  require('../../console')

const limit = 1;

function getClients (conn) {
      Client.find({}).limit(limit).exec(function (err, collection){
          if (collection.length === 0) {
            // iterate over the array for initialization and create entries
            testClients.map(function(client) {
                let newClient = new Client(client)
                newClient.save(function (err, data) {
                  if(err) {
                    console.log(err);
                    return //res.status(500).json({msg: 'internal server error'});
                  }
                })
              })
            console.log(g('Clients Initialized'))
            return
          }
          else {
            console.log(g('Clients Exist in db ' ))
          }
        })
      }

module.exports = {
  getClients: getClients
}
