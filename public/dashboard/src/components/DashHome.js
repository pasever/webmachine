

import React, {Component} from 'react';
import { ClientsSection } from './';
import { Container, Row, Col } from '../../../common/grid';
import ErrorBoundary from '../../../common/error/ErrorBoundary';
import API from '../../../common/utils/API';
import LoadingPage from '../../../common/LoadingPage';
import { Redirect } from 'react-router-dom';
import URI from '../../../common/utils/URI';
import Config from '../../../../config';

const config = Config.init();

export class DashHome extends Component {
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
        URI.sendToLogin();
    }
    render() {
        return (
            <ErrorBoundary>
            { this.state.errorHappened && this.sendToLogin() }
            { this.state.isLoading ? ( <LoadingPage /> ) : (
            <div>
                <header>
                    <div className="header-wrapper">
                        <h1 className="title">
                            { this.state.pageText.title}
                        </h1>
                        <p className="paragraph">{this.state.pageText.subTitle }</p>
                        <a href="/member" className="btn btn-default">{ this.state.pageText.searchNetworksButton }</a>
                    </div>
                </header>
            
                <div>
                    { this.state.ownedNetworks.length > -1 ? (
                        <ClientsSection clients={this.state.ownedNetworks } pageText={this.state.pageText } />
                    ) : "" }
                </div>                
            </div>
            )}
            
            </ErrorBoundary>
        );
    }
}