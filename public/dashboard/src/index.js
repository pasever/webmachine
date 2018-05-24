//////////////////////////////////////////
//////    DASHBOARD ENTRY POINT     //////
//////////////////////////////////////////

import React                from 'react';
import ReactDOM             from 'react-dom';
import DashboardComponent   from './DashboardComponent';

import './index.css';


ReactDOM.render(<DashboardComponent />, document.getElementById('root'));

module.hot.accept();