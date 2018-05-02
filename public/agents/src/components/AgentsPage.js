  ////////////////////////////////////////////////////
 ///////         Agents Home Page             ///////
////////////////////////////////////////////////////

import React, { Component }    from 'react';
import axios                   from 'axios';
import AgentList from './AgentList';
import SearchBar from './SearchBar'; 
import AgentsAvailable from './AgentsAvailable';


class App extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
       agents: [],
       isLoading: false,
       error: null,
       search: ''
      } 
      // binds 'this' to the updateSearch
      this.updateSearch = this.updateSearch.bind(this);
    };
    
    // fetches all the agents from the databases and setting the state
    componentDidMount() {
      this.setState({ isLoading: true })
      axios.get('/api/db/agent/')
        .then(res => this.setState({ agents: res.data, isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));
    };
    
    // setting the state.search to the typed in value
    updateSearch(event) {
      this.setState({ search: event.target.value.trim() });
    }
    
    // render the Search Results (as the user types in)
    renderSearchResults() {
      let filteredAgents = this.state.agents.filter(agent => 
        ( agent.name.includes(this.state.search.toLowerCase()) ));
    
   // if filtered > 0 => render results
      if( filteredAgents.length > 0 ) {
          return (
          <div>
            <AgentsAvailable qty={ filteredAgents.length }  />
            <AgentList agents={ filteredAgents } onAgentClick={ this.props.onAgentClick } /> 
          </div>
          ) 
   // if = 0 => shows 'not found' message
        } else {
        return (
          <p className="noFoundAgent">
            Can't find an agent with the given name...
          </p>
        )
    } 
  } 
    
  // main render component 
    render() {
      return ( 
        
        <div>
         
          {/*  search bar component passes the state.search value */}
            <SearchBar
              value={ this.state.search }
              updateSearch={ this.updateSearch }
             /> 
          {/* if state.search value is empty => renders all the agents in the state  */}
            { !this.state.search
            ?
            (<div>
              <AgentsAvailable qty={ this.state.agents.length } />
              <AgentList agents={ this.state.agents } onAgentClick={ this.props.onAgentClick } />
            </div>) 
            : 
          // {/* if state.search is not empty => calls the renderSearchResults method */}
            (<div> 
              {this.renderSearchResults()}
            </div>)} 
             
        </div>
      );
    } 
  }
  
  export default App;