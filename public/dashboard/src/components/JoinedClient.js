import React from 'react';

import './network.css';

export const JoinedClient = ({ network }) => 
    <div className="network">
            <a className="client-name" href={ `/client?clientId=${ network._id }`}>    
            { network.image === "" ? 
                <img src="static/images/noimages.jpg" className="img-fluid" alt="No image uploaded" /> : 
                <img src={ network.image } className="img-fluid" alt={`${ network.name }'s Logo`} /> }
            <span>{network.name}</span>
        </a>
    </div>

