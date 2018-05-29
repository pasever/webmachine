  ////////////////////////////////////////////////////
 ///////         Agent Skills Page            ///////
////////////////////////////////////////////////////

import React, { Component }    from 'react';
import axios                   from 'axios';
import SkillsList from './SkillsList';
import SearchBar from './SearchBar'; 
import SkillsAvailable from './SkillsAvailable';
import AgentsSkillsCrumbs from './AgentsSkillsCrumbs';
import { Link } from 'react-router-dom';


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      agent: [],
      skills: [],
      isLoading: false,
      search: '',
      error: null
    }
    // binds 'this' to the updateSearch
    this.updateSearch = this.updateSearch.bind(this);
  };
  
  // fetching the agents and filtering by agent name passed in props 
  componentDidMount() {
    this.setState({ isLoading: true });   
    axios.get('/api/db/agent/')    
      .then(res => res.data.filter( agent => agent.name.toLowerCase().trim() === this.props.name.toLowerCase().trim())) 
      .then(result => this.setState({ agent: result[0], skills: result[0].skills, isLoading: false }))    
      .catch(error => this.setState({ error, isLoading: false }));
  };
  
  // setting the state.search to the typed in value
  updateSearch(event) {
    this.setState({ search: event.target.value.trim() });
  }
  // render the Search Results (as the user types in) 
  renderSearchResults() {
    const filteredSkills = this.state.skills.filter(
      skill => ( skill.skillname.includes(this.state.search.toLowerCase())) 
    );

  // if filtered > 0 => render skills results
  if ( filteredSkills.length > 0 ) {
    return (
      <div>
          <SkillsAvailable qty={ filteredSkills.length } name={this.state.agent.name} />
          <SkillsList skills={ filteredSkills } /> 
      </div>
    )
  } else {
  // else displays "skills not found" message
    return (
    <p className="noFoundAgent skills-available">
      Can't find a skill for <span> { this.state.agent.name } </span> by provided criteria 
    </p>
    )
  }
}

// main render component
  render() {
  // if data is still being fetched  
    if(this.state.isLoading) {
      return <p>Loading ...</p>;
    }
    
    return (
      <div>
         
          <AgentsSkillsCrumbs name={ this.state.agent.name } />
          
          {/*  search bar component passes the state.search value */}
          <SearchBar
            value={ this.state.search }
            updateSearch={ this.updateSearch }
            /> 
            {/* if state.search value is empty => renders all the skills for this particular agent */}        
            {
              !this.state.search ? 
              (
                <div>
                  <SkillsAvailable qty={ this.state.skills.length } name={ this.state.agent.name } />
                  <SkillsList skills={ this.state.skills } /> 
              </div>
              ) : (
              // {/* if state.search value is not empty => calls the renderSearchResults method and displays results */}
                <div>
                  {this.renderSearchResults()}
              </div>
              )
            }
                
      </div>
    );
  } 
}
  
export default App;