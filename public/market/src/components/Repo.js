
///////////////////////////////////
/////   Repo Card Component   /////
///////////////////////////////////

import React      from 'react';
import { Link }   from 'react-router-dom';

const Repo = ({repo}) => (
  <li id={repo.id}>
    <div className="card text-center repo-card">
      <div className="card-body repo-card-body">

        <Link to={repo.html_url} target="_blank" className='repo-title'>
          <h5 className="card-title">{repo.name}</h5>
        </Link>
        <h6 className="card-subtitle mb-2 text-muted repo-card-wi-count">
          {/* Active Workitems: {repo.open_issues_count} */}
          <i className="fas fa-clipboard-list"></i> {repo.open_issues_count}
        </h6>
        <p className="card-text">{repo.description}</p>

      </div>
      <div className="card-footer repo-card-footer">

        <Link to={`/${repo.owner.login}/${repo.name}/issues`}
            className="card-link repo-view-issues"
          >
          {/* View Work Items */}
          <i className="far fa-folder-open"></i>
        </Link>

      </div>
    </div>
  </li>

);

export default Repo;
