import axios from 'axios';


export default {
    getAuthorizedUser: () => {
        return axios.get('/api/db/platform?pid=' + localStorage.profileId);
        
    },
    addUser: (user) => {
        localStorage.profileId = user.profileId;
        return axios.put('/api/db/platform', user);
    },
    updateUser: (user) => {
        return axios.post('/api/db/platform', user);
    },

}