

import React, {Component} from 'react';
import { Input, TextArea, Button } from 'Common/form';
import API from 'Common/utils/API';

import '../../styles/netlifyDeploy.css';


export class NetlifyDeploy extends Component {

    state = {
        client: this.props.client,
        siteData: this.props.client.siteData,
        isSaving: false,
        templateData: [],
        selectedTemplate: 0,  
        error: "",
    }
    getTemplateData(){
        //Ajax request
        //fetch(origin + '/web/static/portfolioData.json')
        fetch('/client/static/templateList.json')
            .then(r => r.json())
            .then(json => {
                this.setState({  templateData: json  });
                console.log(this.state.templateData)
        })
    }
    updateTemplateSelection = event => {
        this.setState({ selectedTemplate: event.target.value });
    }
    updateFormField = event => {
        const {name, value } = event.target;
        const siteData = this.state.siteData;
        siteData[name] = value;
        this.setState({ siteData: siteData })
    }
    launchNetlify = event => {
        event.preventDefault();
        // Extract the Client
        const client = this.state.client;
        
        // 
        client.siteData = this.state.siteData;
        this.setState( { isSaving: true });
        
        API.netlify.deployNetlify(client, this.state.templateData[this.state.selectedTemplate]).then(resp => {
            console.log("Response! : ", resp)
            this.setState({ client: resp.data, siteData: resp.data.siteData, isSaving: false })
        }).catch(err => { console.log("ERROR!!", err); this.setState({ error: "There was an error processing your request", isSaving: false })});
    }
    componentDidMount() {
        this.getTemplateData();
    }
    render() {
        return (
            <div>
                { this.state.error === "" ? ("") : (<h4 className='badge badge-danger'>{this.state.error}</h4>)}
                <h4>Add some data</h4>
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
                    { this.state.templateData.length > 0 ? ( 
                        <div>
                            <h4>Select your template</h4>
                            <div className="template-selection">
                                { this.state.templateData.map((current, idx) => (
                                    <div className="radio template" key={idx}>
                                        <h5>{ current.name }</h5>
                                        <img src={ current.imageLoc } className="img-thumbnail img-responsive" />
                                        <h6><a href={ current.demoLoc } target="_blank">Live Demo</a></h6>
                                        <label>
                                            
                                            <input type="radio" 
                                                value={ idx } 
                                                data-idx={ idx } 
                                                onChange={ this.updateTemplateSelection } 
                                                checked={ this.state.selectedTemplate == idx } />
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        ) : (
                        
                        <h2>Loading Templates...</h2>
                    )}
                    { this.state.isSaving ? (
                        <i className="fa fa-gear fa-spin fa-2x margin-top-10" />
                        ) : (
                        <Button type="submit" text="Launch" style="default" name="save" />
                    )}
    
                </form>
            </div>
        );
    }
}

