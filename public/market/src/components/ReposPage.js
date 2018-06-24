
//////////////////////////////////////////////////////
////////         WorkItem Home Page           ///////
////////////////////////////////////////////////////

import React, { Component }    from 'react';
import axios                   from 'axios';
import Repo                    from './Repo';
import SearchBar               from './SearchBar'; 
import { BackHome }            from 'Common/navigation'
import API                     from 'Common/utils/API'
import Auth                    from '../../../home/src/Pages/Auth/Auth'
/**
 * @namespace Developer_Marketplace
 * 
 * TODO: [] Be able to check who authenticated user viewing this page is.
 * * IMPORTANT: Only authenticated users with developer access should
 * * be able to make it to this point (maybe not?).
 * 
 * TODO: [] Ensure that URL is not pulled from Client's Config file.
 * * The URL must be for Strategic Machines' GitHub market repo regardless 
 * * of who's the authenticated user
 */

export default class ReposPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // repos represent skill-categories
      repos: [],
      // checks if data has been loaded
      loaded: false,
      search: '',
    }
   
    this.updateSearch = this.updateSearch.bind(this);
  };

  componentDidMount() {
    // Fetch repositories for given user  
    API.market.getRepos()
      .then(res => {
        // Save data to state
        this.setState({
          repos: res.data,
          loaded: true
        });
      })
      .catch(err => {
        let auth = new Auth();
        auth.login('/market');
      });
  };

  showReposCount() {
    // Determines proper grammar based on number of repos available
    return this.state.repos.length > 1 ?
      `${this.state.repos.length} repositories available`
      :
      `${this.state.repos.length} repository available`
  }

  renderPage() {
    // Check if data has been loaded into state
    // * Server ONLY returns repos with issues. *
    if(this.state.loaded) {
      // If there's repos, render them.
      if(this.state.repos.length > 0) {
        // Filter repos based on *search criteria*
        let filteredRepos = this.state.repos.filter(repo => (
          repo.name.toLowerCase().includes(this.state.search)
        ));
        let repos = filteredRepos.map(repo => <Repo key={repo.id} repo={repo} />);
        return repos;
      } else {
        // If there aren't repos to display, don't bother
        // with more operations and just display a message
        return (
          <p>
            Did not find repositories with issues for user <strong>{this.state.user}</strong>...
          </p>
        )
      }
    }
  }

  updateSearch(event) {
    // When state changes, render will be triggered.
    // results will be displayed according to search value
    this.setState({search: event.target.value});
  }

  render() {
    return (
      <div>
        <BackHome />
        {/* Repos count message will display after data has been loaded in state
        and ONLY if there's data to render */}
        {this.state.loaded && this.state.repos.length > 0 ? (
            <span id="repos-count" className="d-flex justify-content-center">
              {this.showReposCount()}
            </span>
          ) : null
        }

        <SearchBar
          value={this.state.search}
          updateSearch={this.updateSearch}
        />

        {/* List of Cards */}
        <div id="repos-list" >
          {this.renderPage()}
        </div>
      </div>
    );
  }
};