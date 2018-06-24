/**
 * @name seedDb.js
 * @description 
 * Forms a connection to a mongoDB (via platform.json) and seeds it with test data (via /db/data).
 * Standalone command-line node application for webmachine
 * @example node seedDb.js
 */


const { g, r, y, b } =          require('./console');
const mongoose =                require('mongoose');
const { Client } =              require('./db/schemas/Client');
const { Agent } =               require('./db/schemas/Agent');
const testClients =             require('./db/data/clients');
const testAgents =              require('./db/data/agents');



// Open connection via mongoose
console.log(b(":::Establishing connection to DB:::"));
require('./db/mongoose')(true);

console.log(y("DROPPING ALL EXISTING DATA"));

// AWAITS THE DROPPING OF DATA BEFORE PROCEEDING
// No return value from promise
dropData().then(() => {
    // Wait for both the client and agent collections to be created
    Promise.all([createClients(), createAgents()]).then(() => {
        console.log(b(":::SEEDING COMPLETE:::"));
        console.log(r(":::CLOSING DATA CONNECTION:::"));
        mongoose.connection.close();
    })
});

// Indiscriminately drops the databases
async function dropData() {
    await Client.remove({});
    await Agent.remove({});
    console.log(r("Data has been dropped."));
}

// Adds all client test data to the database
async function createClients() {
    let promises = [];
    
    testClients.map(current => promises.push(Client.create(current)));

    await Promise.all(promises).then(() => 
        console.log(b(":::CLIENTS HAVE BEEN CREATED:::"))
    )
}

// Adds all the agent test data to the database
async function createAgents() {
    let promises = [];
    testAgents.map(current => promises.push(Agent.create(current)));
    await Promise.all(promises).then(() => 
        console.log(b(":::AGENTS HAVE BEEN CREATED:::"))
    )
}
