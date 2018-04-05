import axios from 'axios';


export default {
    getAuthorizedPlatform: () => {
        return axios.get('/api/db/platform?cid=' + localStorage.clientId );
        
    },
    addPlatform: (platform) => {
        if(!platform.clientId) {
            platform.clientId = "testprofile";
            localStorage.clientId = platform.clientId;
        }
        return axios.put('/api/db/platform', platform);
    },
    updatePlatform: (platform) => {
        return axios.post('/api/db/platform', platform);
    },
<<<<<<< Updated upstream

=======
    deletePlatform: (platform) => {
        return axios.delete('/api/db/platform', { data: { id: platform.id }});
    },
    addSourceToCustomer: (customerId, sourceId) => {
        return axios.post('/api/db/platform/addStripeSource', { cId: customerId, sId: sourceId });
    }
>>>>>>> Stashed changes
}