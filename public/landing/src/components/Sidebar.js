
/////////////////////////////////////
/////     Sidebar Component     /////
/////////////////////////////////////

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <aside id="sidebar">
    <ul>
      <li>
        <Link to="/docs">
          What is Strategic Machines
        </Link>
      </li>
      <li>
        <Link to="/docs/why-contribute">
          Why contribute
        </Link>
      </li>
      <li>
        <Link to="/docs/how-to-contribute">
          How to contribute
        </Link>
      </li>
    </ul>
  </aside>
);

export default Sidebar;