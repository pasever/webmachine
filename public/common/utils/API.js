import axios from 'axios';

const config = require('../../../config').init();


axios.defaults.headers.common['Authorization'] = localStorage.id_token;

export default {
    /// USED TO GET A CLIENT BY ACCESS ID AND CLIENT ID
    /// THIS WILL BE USED TO GRAB THE MOST UNIQUE CLIENT TO A USER FOR MAINTENANCE
    getClientForMaintenance: (id) => {
        /// HACK - REMOVE HARDCODED ID
        return axios.get('/api/db/client?accessToken=' + localStorage.id_token + '&clientId=' + id);
    },
    
    /// USED TO GET ALL CLIENTS ONE INDIVIDUAL LOGIN MANAGES
    getClientsByAccessId: () => {
        return axios.get('/api/db/client?accessToken=' + localStorage.id_token);
    },
    getPublicClients: () => {
        return axios.get('/api/db/client/public');
    },
    /// WE WILL NOT BE ADDING CLIENTS FROM THIS SECTION ANYMORE
    //addClient: (client) => {
        //localStorage.clientId = client.clientId;
    //    return axios.put('/api/db/client', client);
    //},
    updateClient: (client) => {
        return axios.post('/api/db/client', { client: client, token: localStorage.id_token});
    },
    deleteClient: (client) => {
        return axios.delete('/api/db/client', { data: { id: client.id }});
    },
    addSourceToCustomer: (customerId, sourceId) => {
        return axios.post('/api/db/client/addStripeSource', { cId: customerId, sId: sourceId });
    },
    setDefaultSource: (customerId, sourceId) => {
        return axios.post('/api/db/client/setDefaultSource', { cId: customerId, sId: sourceId });
    },
    removeSource: (customerId, sourceId) => {
        return axios.post('/api/db/client/removeSource', { cId: customerId, sId: sourceId });
    },
    deployNetlify: (client, templateData) => {
        return axios.post('/api/db/client/netlify', { client: client, templateData: templateData });
    },
}