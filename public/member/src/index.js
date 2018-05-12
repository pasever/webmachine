
///////////////////////////////////
/////    Page Entry Point     /////
///////////////////////////////////

import React                  from 'react';
import ReactDOM               from 'react-dom';
import MemberRegistration     from './MemberRegistration';
// import './index.css';

ReactDOM.render(
  <MemberRegistration />,
  document.getElementById('root')
);

module.hot.accept();
