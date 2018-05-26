//////////////////////////////////////////
//////     PLATFORM ENTRY POINT     //////
//////////////////////////////////////////

import React            from 'react';
import ReactDOM         from 'react-dom';
import './index.css';
import ClientComponent  from './ClientComponent';

ReactDOM.render(<ClientComponent />, document.getElementById('root'));

module.hot.accept();

/* 
    Hello Dan, if you see this you can delete this comment.
    Checking whether I can successfully push to your fork.
    - Juan 
 */