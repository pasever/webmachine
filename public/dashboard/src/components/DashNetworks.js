//////////////////////////////////////////////////////////////////////////////////
/////////////////////           DashNetworks.js          /////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///                                                                             //
///  Displays the Networks a user is an owner of.                               //
///                                                                             //
/// DGO                                                                         //
//////////////////////////////////////////////////////////////////////////////////


import React, {Component} from 'react';
import { ClientsSection } from './';
import { FlexItem } from '../../../common/grid';
import { Button } from '../../../common/form';


/**
 * @class DashNetworks
 * @author DGO
 * @description Creates the page that allows the options to launch or maintain a Network (Client)
 */
export const DashNetworks = ({ text, clients, launchNetwork }) => 

    <FlexItem classes="animated fadeIn light-shadow text-center">
        { text.networkTitle && <h1>{ text.networkTitle }</h1>}
        
        { clients.length > 0 ? (
            <ClientsSection clients={ clients } pageText={ text } />
        ) : ( <h4>{ text.noNetworks }</h4> ) }
            <div className="launch-network">
                <Button 
                    text={ text.launchNetworkButton} 
                    onClick={ launchNetwork }
                    style="default"
                />                            
            </div>
    </FlexItem>
            
