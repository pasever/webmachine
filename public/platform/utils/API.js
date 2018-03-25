import axios from 'axios';


const platform = require('../../../config/').platform();

export default {
    getAuthorizedUser: () => {
        

        return platform;//axios.get('../../../../config/platform.json');
    },

    addUser: (user, isLive) => {
        user.isLive = isLive;
        return axios.put('/api/db/platform', user);
    }
}