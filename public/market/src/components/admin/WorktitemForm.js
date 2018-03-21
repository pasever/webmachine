import React from 'react';

const WorkitemForm = ({ handleChange }) => (
  <form>
    <div className="form-row">
      <div className="form-group col-md-6">
        <label htmlFor="workitemTitle">Title</label>
        <input onChange={handleChange} type="text" className="form-control" id="workitemTitle" />
      </div>
      <div className="form-group col-md-3">
        <label htmlFor="workitemPrice">Price</label>
        <input onChange={handleChange} type="number" className="form-control" id="workitemPrice" />
      </div>
      <div className="form-group col-md-3">
        <label htmlFor="workitemDuration">Duration</label>
        <input onChange={handleChange} type="number" className="form-control" id="workitemDuration"
          placeholder="days"
        />
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="workitemDescription">Description</label>
      <textarea
        onChange={handleChange} 
        className="form-control"
        id="workitemDescription"
        style={{overflow: 'auto', resize: 'none'}}
        placeholder="optional"
      ></textarea>
    </div>
  </form>
);

export default WorkitemForm;