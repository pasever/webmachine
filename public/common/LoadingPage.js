///////////////////////////////////////////////////////////////////////
////////////////////   Platform Loading Page   ////////////////////////
///////////////////////////////////////////////////////////////////////
// DGO

"use strict";

import React from "react";
import "./styles/loadingpage.css";

const LoadingPage = () => (
  <div className="loading-page-wrapper">
    <div class="three-cogs fa-3x">
      <i class="fa fa-cog fa-spin fa-2x fa-fw"></i>
      <i class="fa fa-cog fa-spin fa-1x fa-fw"></i>
      <i class="fa fa-cog fa-spin fa-1x fa-fw"></i>
    </div>
  </div>
);

export default LoadingPage;
