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
            <Link to='/'><li><a href="">Home</a></li></Link>
            <Link to='/products'><li><a href="">Products</a></li></Link>
            <Link to='/solutions'><li><a href="">Solutions</a></li></Link>
            <Link to='/market'><li><a href="">Market</a></li></Link>
          </div>
          </ul>
          <ul className="social-links rightUl">
          <div>
            <Link to='/agents'><li><a href="">Agents</a></li></Link>
            <Link to='/pricing'><li><a href="">Pricing</a></li></Link>
            <Link to='/about'><li><a href="">About</a></li></Link>
            <Link to='/blog'><li><a href="">Blog</a></li></Link>
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
         <div id="go-top"><a className="smoothscroll" title="Back to Top" href="#home"><i className="icon-up-open"></i></a></div>
      </div>
   </footer>
    );
  }
}

export default Footer;
