import React from 'react';
import { JoinedClient } from './';

export const MembersSection = ({ clients, pageText }) => 
    <div>
        <h3 className="title">{ pageText.membershipTitle }</h3>
        <div className="owned-networks">
            { clients.map((current, idx) =>  
                <JoinedClient key={idx} network={ current } />
            )}
        </div>
    </div>
