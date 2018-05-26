//////////////////////////////////////////////////////////////////////////////////
/////////////////////           DashHome.js              /////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///                                                                             //
///  Wrapper for the Dashboard                                                  //
///                                                                             //
/// DGO                                                                         //
//////////////////////////////////////////////////////////////////////////////////


import React, {Component} from 'react';
import { ClientsSection } from './';
import { Container, Row, Col, FlexItem } from '../../../common/grid';
import { Button } from '../../../common/form';
import { ErrorBoundary } from '../../../common/error';
import API from '../../../common/utils/API';
import LoadingPage from '../../../common/LoadingPage';
import URI from '../../../common/utils/URI';
import Config from '../../../../config';

const config = Config.init();


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
            
