

import React, {Component} from 'react';
import { Input, TextArea, Button } from '../../components/form';

export class NetlifyDeploy extends Component {
    state = {
        user: this.props.user,
        siteData: this.props.user.siteData,
        isSaving: false,
    }
    updateFormField = event => {
        const {name, value } = event.target;
        const siteData = this.state.siteData;
        siteData[name] = value;
        this.setState({ siteData: siteData })
    }
    launchNetlify = event => {
        event.preventDefault();
        this.setState( { isSaving: true });
    }

    render() {
        return (
            <form onSubmit={ this.launchNetlify }>
                <Input
                    value={ this.state.siteData.callToAction }
                    name="callToAction"
                    placeholder="Encourage your potential members"
                    displayName="Call to action"
                    type="text"
                    onChange={ this.updateFormField }
                    classPrepend="fa fa-bullhorn"
                />
                <Input
                    value={ this.state.siteData.shortDescription }
                    name="shortDescription"
                    placeholder="Short description"
                    displayName="Short description"
                    type="text"
                    onChange={ this.updateFormField }
                    classPrepend="fa fa-info"
                />
                <TextArea
                    value={this.state.siteData.longDescription}
                    name="longDescription"
                    onChange={ this.updateFormField }
                    displayName="Detailed description"
                    cols={10}
                    rows={3}
                    byline="Write a detailed description of your partnership with Strategic Machines"
                />
                                
                { this.state.isSaving ? (
                    <i className="fa fa-gear fa-spin fa-2x margin-top-10" />
                    ) : (
                    <Button type="submit" text="Launch" style="default" name="save" />
                )}
 
            </form>

        );
    }
}

