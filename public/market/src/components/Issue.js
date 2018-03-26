import React from 'react';
import { Link } from 'react-router-dom';
import Manage from './admin/buttons/Manage';

const Issue = ({issue}) => (
  <li id={issue.id} number={issue.number} className="issue">
    <div className='card text-center issue-card'> 
      <div className='card-body'>
        <h5 className='card-title issue-title'>{issue.title}</h5>
        <h6 className='card-subtitle mb-2 issue-price'>{`$${issue.price}`}</h6>
        {/* Display developer name if stage is active */}
        {issue.stage === 'active' ? (
          <p className='card-text issue-assignee'>
            Assigned to: {issue.assignee}
          </p> ): ('')}
        {/* Display claim button is stage is open */}
        {issue.stage === 'open' ? (
          <button
            type="button"
            className="btn btn-success"
            style={claim}
          >
            Claim
          </button> ) : ('')}
        <span className='card-text text-muted issue-due-date'> 
          Due on: <span>{issue.due_date}</span>
        </span>
      </div>
      <div className='card-footer text-center issue-card-footer'>
        <Link to={issue.html_url} target="_blank">
          View on GitHub
        </Link>
        <Manage />
      </div>
    </div>
  </li>
);

const claim = {
  display: 'block',
  padding: '5px',
  fontSize: '15px',
  width: '40%',
  margin: '0 auto',
  letterSpacing: '1.5px',
  fontFamily: 'monosapce'
}

export default Issue;

