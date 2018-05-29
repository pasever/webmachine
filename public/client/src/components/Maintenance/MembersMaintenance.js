//////////////////////////////////////////////////////////////////////////////////
/////////////////////      MembersMaintenance.js         /////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///                                                                             //
///  Allows private clients to add members to a WhiteList by phone number       //
///  or email.                                                                  //
///                                                                             //
///  DGO                                                                        //
//////////////////////////////////////////////////////////////////////////////////



import React, { Component } from "react";
import { ErrorBoundary, ErrorDisplay } from '../../../../common/error';
import {Button} from '../../../../common/form';
import { AddMembers, MembersWhiteList } from '../Partials';
import API from '../../../../common/utils/API';

/** 
  @prop {Object} client: The Client we are manipulating:
  @prop {Object} pageText: Text to display on the page   
*/
export class MembersMaintenance extends Component {
  
  /**
   * 
   * @param {Props} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      client: this.props.client,
      members: [],
      membersToRemove: [],
      current: "",
      errors: {},
      isSaving: false,
    };
    this.handleFiles = this.handleFiles.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddMember = this.handleAddMember.bind(this);
    this.addMembers = this.addMembers.bind(this);
    this.handleWhiteListSelect = this.handleWhiteListSelect.bind(this);
    this.saveClient = this.saveClient.bind(this);
    this.removeFromWhiteList = this.removeFromWhiteList.bind(this);
  }
  
  /**
   * Handles when the textbox value is changed
   * @param {object} event - the control that called the event
   */
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  
  /**
   * Adds a new member to the member array (formSubmit)
   * @param {object} event 
   */
  handleAddMember(event) {
    event.preventDefault();
    const {members, current }  = this.state; 
    // Bails if the user hasn't added a name or if we suspect a email or phone number hasn't been properly entered
    if(current === "") 
      return;
    else if(current.indexOf("@") < 0 && isNaN(parseFloat(current))) {
      const errors = { emailOrPhone: "You must use an email address or phone number." };
      return this.setState({ errors: errors });
    }
    
    members.push(current);
    this.setState({ current: "", members: members, errors: {} });
    console.log(this.state.members);
    
  }

  /**
   * Calls the API that saves the client
   */
  saveClient(client) {
    this.setState({isSaving: true});
    API.client.updateClient(client).then(resp => {
      this.setState({ client: resp.data, isSaving: false });
    }).catch(err => this.setState({ isSaving: false, errors: { saveError: "There was an error saving the members"}}))
  }

  /**
   * Adds members to the Client object
   */
  addMembers() {
    if(this.state.members.length <= 0) return;
    const {client} = this.state;
    this.state.members.map(current => client.whiteList.push(current));
    this.saveClient(client);
  }

  /**
   * Creates an array based on which items the user has selected
   * @param { object } event 
   */
  handleWhiteListSelect(event) {
    // Gets the child <option> nodes
    const { childNodes } = event.target;
    // Creates a new array.
    let membersToRemove = [];
    // Iterates through the child nodes, pushing the value of selected child nodes into the new array
    childNodes.forEach(current => {
      if(current.selected) membersToRemove.push(current.value);
    })
    // Saves the new array.
    this.setState({ membersToRemove: membersToRemove });
  }

  /**
   * Removes selected members from white list
   */
  removeFromWhiteList() {
    const { membersToRemove, client } = this.state;
    
    client.whiteList = client.whiteList.filter((current) => !membersToRemove.includes(current));
    this.setState({ client: client });
    this.saveClient(client);
  }

  /**
   * Turns the values read from a CSV into an array and adds the members
   * @param {Array} files - files from the ReactFileReader
   */
  handleFiles(files) {
    // Bails if the file isn't a proper CSV
    if(files[0].name.indexOf('.csv') < 0) {
      const errors = { fileError: "Please upload a .csv file" }
      return this.setState({errors: errors });
    }
    let reader = new FileReader();
    // Event handler for when the file is read
    reader.onload = (e) => {
      const { members } = this.state;
      console.log(reader.result);
      let splitValue = reader.result.indexOf(',') > 0 ? ',' : '\n';
      // Splits the values by split value
      reader.result.split(splitValue).map((current) => { 
        
        if(current !== "") members.push(current) 
      });
    
      
      this.setState({members: members, errors: {} });
    }
    reader.readAsText(files[0]);
  }

  render() {
    return (
      <ErrorBoundary>
      { this.state.text.title && ( <h2>{this.state.text.title }</h2>)}
      <hr />
      <div className="flex-wrapper">  
        <div className="flex-section light-shadow">
          {this.state.text.addMembers && <h3>{ this.state.text.addMembers }</h3> }
          { this.state.errors.saveError && (
            <ErrorDisplay text={ this.state.errors.saveError } />
          )}
          <AddMembers handleChange={ this.handleChange } 
            handleAddMember={ this.handleAddMember } emailOrPhone={ this.state.current }
            handleFiles={this.handleFiles} errors={this.state.errors} text={this.state.text } />
          <hr />
          {this.state.text.manageWhiteList && <h3>{ this.state.text.manageWhiteList }</h3>}
          <MembersWhiteList 
            members={ this.state.members } 
          />
          { this.state.isSaving ? (
            <i className="fa fa-gear fa-spin fa-2x margin-top-10" />
          ) : (
            <Button type="text" onClick={ this.addMembers } style="success" text="Add to Whitelist" />
          )}
        </div>
        <div className="flex-section light-shadow">
          {this.state.text.manageMembers && ( <h3>{ this.state.text.manageMembers }</h3>)}
          <MembersWhiteList 
            members={this.state.client.whiteList }
            selectClick={ this.handleWhiteListSelect } />
            { this.state.isSaving ? (
              <i className="fa fa-gear fa-spin fa-2x margin-top-10" />
            ) : (
              <Button text="Remove from list" 
                type="submit"
                onClick={ this.removeFromWhiteList } />
            )}
        </div>
      </div>
      </ErrorBoundary>
    );
  }
}
