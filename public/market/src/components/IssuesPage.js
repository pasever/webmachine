

// Displays all issues of a given repository
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios                  from 'axios';
import Issue                  from './Issue';
import Navigation             from './Navigation';
import FilterBy               from './IssuesFilterBy';
import SearchBar              from './SearchBar';
import CreateWorkItem         from './admin/CreateWorkItem';
import config                 from '../../../../config/';
const { issues_url }          = config.init().githubrepo;

export default class IssuesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.match.params.user,
      repo: this.props.match.params.repo,
      loaded: false,
      criteria: 'open',
      search: '',
      issues: []
    }
    // Bind `this` to these methods so they can access state
    this.renderPage = this.renderPage.bind(this);
    this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  componentDidMount() {
    let repo = this.state.repo;
    let endpoint = `${issues_url}/${repo}`;
    // Fetch issues for repo and save them into state
    axios.get(endpoint)
    .then(res => {
      this.setState({
        issues: res.data,
        loaded: true
      })
    });
  }

  showIssuesCount() {
    // Determines proper grammar based on number of repos available
    return this.state.issues.length > 1 ?
      `${this.state.issues.length} work items available`
      :
      `${this.state.issues.length} work item available`
  }

  renderPage() {
    let issues;
    // Filter issues based on *search criteria*
    let filteredIssues = this.state.issues.filter(issue => (
      issue.title.toLowerCase().includes(this.state.search)
    ));
    // Create issue components based on current *filtering criteria*.
    if (this.state.criteria === 'open') {
        issues = filteredIssues.filter(issue => issue.stage === 'open');
        issues = issues.map(issue => <Issue key={issue.number} issue={issue} />)
    } else if (this.state.criteria === 'active') {
        issues = filteredIssues.filter(issue => issue.stage === 'active');
        issues = issues.map(issue => <Issue key={issue.number} issue={issue} />)
    } else if (this.state.criteria === 'closed') {
        issues = filteredIssues.filter(issue => issue.stage === 'closed');
        issues = issues.map(issue => <Issue key={issue.number} issue={issue} />)
    }
    // If there's issues to display, render them. Otherwise, render message.
    return issues.length > 0 ? issues : <p>No {this.state.criteria} issues found</p>;
  };

  handleCriteriaChange(criteria) {
    this.setState({criteria: criteria});
  }

  updateSearch(event) {
    this.setState({search: event.target.value});
  }

  render() {
    return (
      <div>
        <Navigation
          currentLocation={this.state.repo}
        />
        
        {/* Work item count message will display after data has been fetched
        and ONLY if there's data to render
        {this.state.loaded && this.state.issues.length > 0 ? (
          <span id="issues-count" className="d-flex justify-content-center">
            {this.showIssuesCount()}
          </span>
          ) : null
        } */}

        <FilterBy
          criteria={this.state.criteria}
          handleCriteriaChange={this.handleCriteriaChange}
        />
        <SearchBar
          value={this.state.search}
          updateSearch={this.updateSearch}
        />
        <CreateWorkItem
          modalData={{
            issueNumber: this.state.issues.length + 1,
            user: this.state.user,
            repo: this.state.repo
          }}
        />
        <ul id="issue-list" className="">
          {this.state.loaded ? this.renderPage() : null}
        </ul>
      </div>
    );
  }
};