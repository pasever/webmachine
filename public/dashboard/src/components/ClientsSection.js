import React from 'react';
import { OwnedClient } from './';

export const ClientsSection = ({ clients, pageText }) => 
    <div>
        <h3 className="title">{ pageText.ownedNetworksTitle }</h3>
        <div className="owned-networks">
            { clients.map((current, idx) =>  
                <OwnedClient key={idx} network={ current } />
            )}
        </div>
    </div>

