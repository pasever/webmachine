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
import { ErrorBoundary } from '../../../common/error';
import API from '../../../common/utils/API';
import LoadingPage from '../../../common/LoadingPage';
import URI from '../../../common/utils/URI';
import Config from '../../../../config';

const config = Config.init();



export class DashNetworks extends Component {
    state = {
        pageText: this.props.pageText,
        ownedNetworks: [],
        joinedNetworks: [],
        isLoading: true,
        errorHappened: false,
    }

    componentDidMount() {
        let ownedNetworks = API.getClientsByAccessId();
        let joinedNetworks = API.getJoinedNetworks();
        Promise.all([ ownedNetworks, joinedNetworks ]).then(values => {
            this.setState({ isLoading: false, ownedNetworks: values[0].data, 
                        joinedNetworks: values[1].data });            
        }).catch(err => { this.setState({ errorHappened: true }); return console.log(err); })

    }

    sendToLogin() {
        URI.redirect(config.auth0.sloppyLoginUrl);
    }
    render() {
        return (
            <ErrorBoundary>
            { this.state.errorHappened && this.sendToLogin() }
            { this.state.isLoading ? ( <LoadingPage /> ) : (
                <FlexItem>
                    <div className="light-shadow">
                    { this.state.pageText.networkTitle && <h3>{ this.state.pageText.networkTitle }</h3>}
                    
                    { this.state.ownedNetworks.length > 0 ? (
                        <ClientsSection clients={this.state.ownedNetworks } pageText={this.state.pageText } />
                    ) : ( <h4>{this.state.pageText.noNetwork }</h4> ) }
                    </div>
                </FlexItem>
            )}
            
            </ErrorBoundary>
        );
    }
}