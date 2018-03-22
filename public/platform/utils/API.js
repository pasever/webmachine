import axios from 'axios';


const platform = require('../../../config/').platform();

export default {
    getAuthorizedUser: () => {
        return platform;//axios.get('../../../../config/platform.json');
    },
}