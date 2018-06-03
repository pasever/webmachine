//////////////////////////////////////////////////////////////////////////////////
////////////////////      Utils API.js         ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///  Handles making calls to the API.                                           //
///  Authorized API calls require being called through Axios, from this file.   //
///  Otherwise, the Authorization header needs to be manually attached.         //
///  DGO                                                                        //
//////////////////////////////////////////////////////////////////////////////////

import axios from 'axios';

const config = require('Config').init();



axios.defaults.headers.common['Authorization'] = localStorage.id_token;

export default {
    client: {
        getClientForMaintenance: (id) => {
            return axios.get('/api/db/client?clientId=' + id);
        },
        getJoinedNetworks: () => {
            return axios.get('/api/db/client/joined');
        },
        /// USED TO GET ALL CLIENTS ONE INDIVIDUAL LOGIN MANAGES
        getClientsByAccessId: () => {
            return axios.get('/api/db/client');
        },
        getPublicClients: () => {
            return axios.get('/api/db/client/public');
        },
        /// WE WILL NOT BE ADDING CLIENTS FROM THIS SECTION ANYMORE
        addClient: (client) => {
            return axios.put('/api/db/client', client);
        },
        updateClient: (client) => {
            return axios.post('/api/db/client', client);
        },
        deleteClient: (client) => {
            return axios.delete('/api/db/client', { data: { id: client.id }});
        },
    },
    member: {
      register: (memberPayload) => {
        return axios.post('/api/db/member/register', memberPayload);
      },
      getProfileData: (clientId) => {
        return axios.get('/api/db/member/profile/network/' + clientId);
      },
      updateProfileData: (clientId, memberUpdates) => {
        return axios.put('/api/db/member/profile/network/' + clientId, memberUpdates);
      },
      removeFromNetwork: (clientId) => {
        return axios.delete('/api/db/member/profile/network/' + clientId);
      }
    },
    stripe: {
        addSourceToCustomer: (customerId, sourceId) => {
            return axios.post('/api/db/client/addStripeSource', { cId: customerId, sId: sourceId });
        },
        setDefaultSource: (customerId, sourceId) => {
            return axios.post('/api/db/client/setDefaultSource', { cId: customerId, sId: sourceId });
        },
        createStripeCustomer: (client) => {
            return axios.post('/api/db/client/createStripeCustomer', client);
        },
        removeSource: (customerId, sourceId) => {
            return axios.post('/api/db/client/removeSource', { cId: customerId, sId: sourceId });
        },
    },
    netlify: {
        deployNetlify: (client, templateData) => {
            return axios.post('/api/db/client/netlify', { client: client, templateData: templateData });
        },
    },
    market: {
      getRepos: () => axios.get(config.githubrepo.repos_url),
      getIssues: (repo) => axios.get(config.githubrepo.issues_url + '/' + repo)
    }
}