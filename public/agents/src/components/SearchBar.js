import React from 'react';

const SearchBar = ({ value, updateSearch }) => (
    <div className="input-group">
        <input 
            type="text" 
            className="form-control" 
            placeholder="Search..."
            value={value} 
            onChange={updateSearch}
        />
    </div>
  );

export default SearchBar;