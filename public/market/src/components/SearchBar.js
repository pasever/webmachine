import React from 'react';

const SearchBar = ({value, updateSearch}) => (
  <div className="input-group mb-3" style={styles.searchBar}>
    <input type="text" className="form-control"
      aria-label="Default" aria-describedby="inputGroup-sizing-default"
      placeholder="Search..." value={value} onChange={updateSearch}
      style={{margin: '0 30px'}}
    />
  </div>
)

const styles = {
  searchBar: {
    width: '25rem',
    margin: '20px auto'
  }
};

export default SearchBar;