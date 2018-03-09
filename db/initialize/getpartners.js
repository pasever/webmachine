'use strict';

///////////////////////////////////////////////////////////////////////
///////           placeholder fo loading agents              ////////
/////////////////////////////////////////////////////////////////////

const Partner  =            require('../schemas/Partner').Partner
const mongoose =            require('mongoose')
const testPartners  =       require('../data/partners')
const { g, b, gr, r, y } =  require('../../console')

const limit = 1;

function getPartners (conn) {
      Partner.find({}).limit(limit).exec(function (err, collection){
          if (collection.length === 0) {
            // iterate over the set of agents for initialization and create entries
            testPartners.map(function(partner) {
                let newPartner = new Partner(partner)
                newPartner.save(function (err, data) {
                  if(err) {
                    console.log(err);
                    return //res.status(500).json({msg: 'internal server error'});
                  }
                })
              })
            console.log(g('Partners Initialized ' ))
            return
          }
          else {
            console.log(g('Partners Exist in db '))
          }
        })
      }

module.exports = {
  getPartners: getPartners
}
