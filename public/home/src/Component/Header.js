import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Log from './Log'

class Header extends Component {
  render() {
    if(this.props.data){
        var name = this.props.data.name;
        var occupation = this.props.data.occupation;
        var description = this.props.data.description;
        var city = this.props.data.address.city;
        var networks = this.props.data.social.map(function(network){
          return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
        });
    }
    return (
      <header id="home">
      <div>
      <nav id="nav-wrap">
         <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
	       <a className="mobile-btn" href="" title="Hide navigation">Hide navigation</a>

         <ul id="nav" className="nav">
            <Link to='/'><li className="current"><a className="smoothscroll" href="#home">Home</a></li></Link>
            <Link to='/products' ><li><a className="smoothscroll" href="#about">Products</a></li></Link>
	          <Link to='/solution'><li><a className="smoothscroll" href="#resume">Solution</a></li></Link>
            <Link to='/market'><li><a className="smoothscroll" href="#portfolio">Market</a></li></Link>
            {/*
            <button onclick="myFunction()" class="dropbtn">Dropdown</button>
            <div id="myDropdown" class="dropdown-content">
              <Link to='/marketitems'><li><a className="smoothscroll" href="#portfolio">Work Items</a></li></Link>
              <Link to='/marketmywork'><li><a className="smoothscroll" href="#portfolio">Work Items</a></li></Link>
              <Link to='/marketdocs'><li><a className="smoothscroll" href="#portfolio">Work Items</a></li></Link>
            </div>
            */}
            <Link to='/agents'><li><a className="smoothscroll" href="#testimonials">Agents</a></li></Link>
            <Link to='/pricing'><li><a className="smoothscroll" href="#contact">Pricing</a></li></Link>
            <Link to='/registration'><li><a className="smoothscroll" href="#contact">Member Registration</a></li></Link>
            <Link to='/blog'><li><a className="smoothscroll" href="#contact">Blog</a></li></Link>
            <Link to='/login'><li><a className="smoothscroll" href="#contact">Login</a></li></Link>
            <Link to='/about'><li><a className="smoothscroll" href="#contact">About</a></li></Link>
         </ul>
      </nav>
      </div>
      </header>      

   
    );
  }
}

export default Header;
