import React from 'react';

const FilterBy = ({ handleCriteriaChange, criteria }) => (
  <div className="btn-group d-flex justify-content-center"
    role="group" aria-label="Basic example"
    style={{marginBottom: '10px'}}
  >
    <button type="button" 
      onClick={() => handleCriteriaChange('open')}
      className={`btn btn-light ${criteria === 'open' ? 'active' : ''}`}
    >
      Open
    </button>
    <button type="button"
      onClick={() => handleCriteriaChange('active')}
      className={`btn btn-light ${criteria === 'active' ? 'active' : ''}`}
    >
      Assigned
    </button>
    <button type="button"
      onClick={() => handleCriteriaChange('closed')}
      className={`btn btn-light ${criteria === 'closed' ? 'active' : ''}`}
    >
      Closed
    </button>
  </div>
);

export default FilterBy;