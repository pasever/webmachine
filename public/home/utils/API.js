import axios from "axios";

const config = require ("../../../config").init();

export default {
    clientSignUp: (user) => {
        var options = { method: 'POST',
            url: 'https://machines.auth0.com/dbconnections/signup',
            headers: { 'content-type': 'application/json' },
            body: 
                { client_id: 'DkvyepuhN_8bXFqWMFSARYtOqwr0Te8f',
                email: user.email,
                password: user.password,
                },
            json: true 
        };
        return axios(options)
    }



}