
////////////////////////////////////////////////////////
/////////////   mongo db functions        /////////////
//////////////////////////////////////////////////////

const Agent  =       require('../db/schemas/Agent').Agent
const Client =       require('../db/schemas/Client').Client
//const Platform =     require('../db/schemas/Platform').Platform 


      //////////////////////////////////////////////////////
      //////           agent collection              //////
      ////////////////////////////////////////////////////

  exports.findAgent = (obj) => {

      return new Promise((resolve, reject) => {
        Agent.find({name: obj.machine.name}, function(err, response) {
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

  exports.getAgent = () => {

    return new Promise((resolve, reject) => {
      Agent.find({}, function(err, response) {
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

  exports.putAgent = (params) => {

    agent = new Agent(params);
    return new Promise((resolve, reject) => {
        agent.save(function (err, response) {
          if (err) {
            console.log("Error When Saving Agent")
            reject(err)
          }
          resolve(response)
    })
   })
  }

  exports.updateAgent = (contact) => {

    return new Promise((resolve, reject) => {
    Agent.findOneAndUpdate({id: contact.id}, contact, {upsert: true}, function (err, response) {
      if (err) {
        console.log(r("Error When Updating Agent"))
        reject(err)
      }
      resolve(response);
      })
    })
  }

  exports.deleteAgent = (id) => {

    return new Promise((resolve, reject) => {
      Agent.remove({id: id}, function(err, response) {
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

      //////////////////////////////////////////////////////
      //////          client collection              //////
      ////////////////////////////////////////////////////

  exports.getClients = () => {

    return new Promise((resolve, reject) => {
      Client.find({}, function(err, response) {
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

  exports.putClient = (params) => {

    let client = new Client(params);
    return new Promise((resolve, reject) => {
        client.save(function (err, response) {
          if (err) {
            console.log("Error When Saving Client Roster")
            reject(err)
          }
          resolve(response)
     })
   })
  }

  exports.updateClient = (contact) => {


    return new Promise((resolve, reject) => {
    Client.findOneAndUpdate({id: contact.id}, contact, function (err, response) {
      if (err) {
        console.log(r("Error When Updating Client"))
        reject(err)
      }
      resolve(response);
      })
    })
  }

  exports.deleteClient = (id) => {

    return new Promise((resolve, reject) => {
      Client.remove({id: id}, function(err, response) {
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

