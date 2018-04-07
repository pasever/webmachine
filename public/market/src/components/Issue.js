import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Manage from './admin/buttons/Manage';

function calculateDate(duration) {
  let dateFormat = 'MMMM D, YYYY, h:mm:ss a';
  // Calculate due date by adding X days to today's date.
  let dueDate = moment().add(duration, 'days').format(dateFormat);
  // Set due time at 11:59:00 PM
  dueDate = new Date(dueDate).setHours(23, 59, 0);
  // Format final dueDate
  dueDate = moment(dueDate).format(dateFormat);
  return String('If assigned today, due on \n' + dueDate);
}

const Issue = ({ issue, modalHandler }) => (
  <li id={issue.id} number={issue.number} className="issue">
    <div className='card text-center issue-card'> 
      <div className='card-body issue-card-body'>
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
          {/* Due on: <span>{issue.due_date}</span> */}
          Due 
          <span data-toggle='tooltip' data-placement='bottom' title={calculateDate(issue.duration)}> {issue.duration} {+issue.duration > 1 ? 'days' : 'day'} </span>after assignment date
        </span>
        <Link to={issue.html_url} target="_blank">
          <i className="fab fa-github github-icon"></i>
        </Link>
      </div>
      <div className='card-footer text-center issue-card-footer'>
        <Manage
          modalHandler={modalHandler} 
          wiNumber={issue.number}
        />
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

