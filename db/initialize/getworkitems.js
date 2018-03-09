'use strict';

///////////////////////////////////////////////////////////////////////
///////           placeholder for test workitems              ////////
/////////////////////////////////////////////////////////////////////

const Workitem  =            require('../schemas/Workitem').Workitem
const mongoose =             require('mongoose')
const testWorkitems  =       require('../data/Workitems')
const { g, b, gr, r, y } =   require('../../console')

const limit = 1;

function getWorkitems (conn) {
      Workitem.find({}).limit(limit).exec(function (err, collection){
          if (collection.length === 0) {
            // iterate over the set of agents for initialization and create entries
            testWorkitems.map(function(item) {
                let newWorkitem = new Workitem(item)
                newWorkitem.save(function (err, data) {
                  if(err) {
                    console.log(err);
                    return //res.status(500).json({msg: 'internal server error'});
                  }
                })
              })
            console.log(g('Workitems Initialized '))
            return
          }
          else {
            console.log(g('Workitems Exist in db ' ))
          }
        })
      }

module.exports = {
  getWorkitems: getWorkitems
}
