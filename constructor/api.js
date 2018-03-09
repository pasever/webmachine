
///////////////////////////////////////////////////////////////////
//// constructor to instantiate key functions for microservices //
/////////////////////////////////////////////////////////////////


const request =       require('request')

exports.Api = class Api {
    constructor (workobj) {
        this.message = workobj.message
        this.machine = workobj.machine
        this.agent = workobj.agent
        this.classifier = workobj.classifier
        this.response = workobj.response
        this.status = workobj.status
        this.dialogue = workobj.dialogue
        this.meter = workobj.meter
        this.org = workobj.org
        this.postdate = workobj.postdate
        this.id = workobj.id

      }

    getMessage () {
      return new Promise((resolve, reject) => {
        resolve(this.message)
      })
    }

    getMessageFrom () {
      return new Promise((resolve, reject) => {
        resolve(this.message.From)
      })
    }

    getMachineName () {
      return new Promise((resolve, reject) => {
        resolve(this.machine.name)
        })
      }

    getAgentResponse (apiparm) {
      return new Promise((resolve, reject) => {
        /*
        request.get(apiparm, function (error, response, body) {
                  if (error) {
                      console.log(error)
                      reject(error)}
                  resolve(body)
            })
            */
            resolve("working on api agent response")
      })
    }
  }

  /*
  exports.getAgentResponse = (apiparm) => {
       return new Promise((resolve, reject) => {
         request.post(
              apiparm.url,
              { json: apiparm.body },
              function (error, response, body) {
                if (error) {
                    console.log(error)
                    reject(error)}
                resolve(body)
          });
       })
     }

     */
