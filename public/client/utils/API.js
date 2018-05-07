import axios from 'axios';

const config = require('../../../config').init();


axios.defaults.headers.common['Authorization'] = localStorage.id_token;

export default {
    getAuthorizedClient: () => {
        return axios.get('/api/db/client?accessToken=' + localStorage.id_token);
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