import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Footer extends Component {
  render() {
    return (
        <footer>
      <div className="row">
         <div className="leftFooter">
            <ul className="social-links leftUl">
            <div>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/products'>Products</Link></li>
            <li><Link to='/solutions'>Solutions</Link></li>
            <li><Link to='/market'>Market</Link></li>
          </div>
          </ul>
          <ul className="social-links rightUl">
          <div>
            <li><Link to='/agents'>Agents</Link></li>
            <li><Link to='/pricing'>Pricing</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/blog'>Blog</Link></li>
          </div>
            </ul>
         </div>
         <div className="rightFooter">
            <ul className="copyright">
                <li>Strategic Machines</li>
                <br/>
               <li>&copy; Copyright 2018 Strategic Machines</li>
            </ul>
         </div>
      </div>
   </footer>
    );
  }
}

export default Footer;
