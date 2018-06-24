
///////////////////////////////////////////////////////
///   Displays all issues of a given repository    ///
///               as workitem cards               ///
////////////////////////////////////////////////////

import React, { Component } from 'react';
import axios                  from 'axios';
import Issue                  from './Issue';
import Navigation             from './Navigation';
import FilterBy               from './IssuesFilterBy';
import SearchBar              from './SearchBar';
import AdminLayer             from './admin/AdminLayer';
import API                    from 'Common/utils/API';

export default class IssuesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.match.params.user,
      repo: this.props.match.params.repo,
      loaded: false,
      criteria: 'open',
      search: '',
      issues: [],
      modal: {
        triggeredBy: '',
        getIssue: '',
        issue: ''
      }
    }
    // Bind `this` to these methods so they can access state
    this.renderPage = this.renderPage.bind(this);
    this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.handleModalTrigger = this.handleModalTrigger.bind(this);
    this.setIssue = this.setIssue.bind(this);
    this.getIssue = this.setIssue.bind(this);
  }

  componentDidMount() {
    // Construct API endpoint from which to fetch issues.
    let repo = this.state.repo;
    // Fetch issues for repo and save them into state
    API.market.getIssues(repo)
    .then(res => {
      this.setState({
        issues: res.data.length > 0 ? res.data : [],
        loaded: true,
        nextIssue: res.data.length + 1
      })
    });
  }

  showIssuesCount() {
    // Determines proper grammar based on number of repos available
    return this.state.issues.length > 1 ?
      `${this.state.issues.length} workitems available`
      :
      `${this.state.issues.length} workitem available`
  }

  renderPage() {
    let issues;
    // Filter issues based on *search criteria* (search bar at top of page)
    let filteredIssues = this.state.issues.filter(issue => (
      issue.title.toLowerCase().includes(this.state.search)
    ));
    // Filter issues based on current *filtering criteria* (tabs at top of page).
    if (this.state.criteria === 'open') {
        issues = filteredIssues.filter(issue => issue.stage === 'open');
        issues = issues.map(issue => <Issue key={issue.number} issue={issue} modalHandler={this.handleModalTrigger} />)
    } else if (this.state.criteria === 'active') {
        issues = filteredIssues.filter(issue => issue.stage === 'active');
        issues = issues.map(issue => <Issue key={issue.number} issue={issue} modalHandler={this.handleModalTrigger} />)
    } else if (this.state.criteria === 'closed') {
        issues = filteredIssues.filter(issue => issue.stage === 'closed');
        issues = issues.map(issue => <Issue key={issue.number} issue={issue} modalHandler={this.handleModalTrigger} />)
    }
    // If there's issues to display, render them. Otherwise, render message.
    return issues.length > 0 ? issues : <p id='no-wi-found-alert'>No {this.state.criteria} workitems found</p>;
  };

  // Handles changes to Work Item Stage tabs at top of page.
  // Open | Assigned | Closed
  handleCriteriaChange(criteria) {
    this.setState({criteria: criteria});
  }

  // Handles changes in search bar.
  updateSearch(event) {
    this.setState({search: event.target.value});
  }

  // takes triggredBy string (tb) and optional issue number (n)
  handleModalTrigger(tb, n) {
    // If n is undefined, no issue number was passed
    // and so modal was triggered by create button
    if(n === undefined) {
      this.setState({ modal: { triggeredBy: tb }});
    } else {
      let modal = this.state.modal;
      modal.triggeredBy = tb, modal.getIssue = n;
      // Handles finding and setting of correct
      // issue into state.
      this.setIssue(modal);
    }
  }

  setIssue(modal) {
    // Each work item card has an edit button, and an issue number
    // attached to it. Here we are iterating through the issues stored
    // in state in search for the issue whose issue number matches the issue
    // number of the workitem card we are trying to edit.
    let issue = this.state.issues.filter(issue => issue.number === this.state.modal.getIssue)[0];
    // Once the issue (an object) has been found, we attach it to the modal 
    // object in state so we can then pass it down to the modal component.
    // In this way, the modal can pass it to the EditWorkitem component (a form)
    // whenever it gets triggered.
    modal.issue = issue;
    this.setState({ modal });
  }

  // Returns the issue to be edited.
  // Passed as prop to child component.
  getIssue() {
   return this.state.modal.issue;
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

        {/* Open | Assigned | Closed */}
        <FilterBy
          criteria={this.state.criteria}
          handleCriteriaChange={this.handleCriteriaChange}
        />

        <SearchBar
          value={this.state.search}
          updateSearch={this.updateSearch}
        />

        {/*Administrative "layer" to be rendered conditionally
          based on authorization priviledges.*/}
          {this.state.loaded ? (
            <AdminLayer
            modalData={{
              issueNumber: this.state.nextIssue,
              user: this.state.user,
              repo: this.state.repo,
              triggeredBy: this.state.modal.triggeredBy,
              issue: this.state.modal.issue,
              repo: this.state.repo,
              url: this.props.match.url
            }}
            modalHandler={this.handleModalTrigger}
          />
          ) : null}

        {/* Render workitem cards only after issues have been
            loaded into state to avoid seeing "No workitems found"
            message for a split second upon initial component mount. */}
        <div id="issue-list" className="container">
          {this.state.loaded ? this.renderPage() : null}
        </div>
      </div>
      
    );
  }
};
