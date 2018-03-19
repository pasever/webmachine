
//////////////////////////////////////////
//////     Documentation Page     ///////
////////////////////////////////////////

import React from 'react';
import Brand from './Brand';
import Sidebar from './Sidebar';
import { Route } from "react-router-dom";
// Routes for dynamically rendering documentation content
import content_routes from '../docs/content-routes';

const Docs = () => (
  <div id="documentation">
    <Brand />
    <Sidebar />

    <main id="content">
      {content_routes.map((route, index) => (
        // Render <Route>s with different paths, 
        // each pointing to a different file/component.
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      ))}
    </main>
  </div>
);

export default Docs;
