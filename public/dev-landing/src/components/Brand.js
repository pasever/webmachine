import React from 'react';
import { Link } from 'react-router-dom';

const Brand = () => (
  <nav id="brand">
    <div id="logo">
      <Link to="/">
        <i className="fas fa-cogs"></i> Strategic Machines
      </Link>
    </div>
  </nav>
);

export default Brand;