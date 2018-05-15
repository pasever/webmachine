import React, {Component} from 'react';
import { ClientsSection } from './';
import { Col } from '../../../common/grid';
import ErrorBoundary from '../../../common/error/ErrorBoundary';
import API from '../../../common/utils/API';
import LoadingPage from '../../../common/LoadingPage';

export class DashHome extends Component {
    state = {
        pageText: this.props.pageText,
        ownedNetworks: [],
        joinedNetworks: [],
        isLoading: true,
    }

    componentDidMount() {
        let ownedNetworks = API.getClientsByAccessId();
        let joinedNetworks = API.getJoinedNetworks();
        Promise.all([ ownedNetworks, joinedNetworks ]).then(values => {
            this.setState({ isLoading: false, ownedNetworks: values[0].data, 
                        joinedNetworks: values[1].data });            
        })

    }

    render() {
        return (
            <ErrorBoundary>
            <div className="center-content">
                <h1 className="title">
                    { this.state.pageText.title}
                </h1>
                <p className="paragraph">{this.state.pageText.subTitle }</p>
                <a href="/member" className="btn btn-default">{ this.state.pageText.searchNetworksButton }</a>
            </div>
            { this.state.isLoading ? ( <LoadingPage /> ) : (
                <div className="right-border">
                    { this.state.ownedNetworks.length > -1 ? (
                        <ClientsSection clients={this.state.ownedNetworks } pageText={this.state.pageText } />
                    ) : "" }
                </div>                
            )}
            
            </ErrorBoundary>
        );
    }
}