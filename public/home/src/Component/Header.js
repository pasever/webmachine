import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from '../Pages/Auth/History'


class Header extends Component {

  componentWillMount() {
    console.log("Props Auth: " + this.props.auth)
  }
  

goTo(route) {
  this.props.history.replace(`/${route}`)
}

login() {
  this.props.auth.login();
}

logout() {
  this.props.auth.logout();
}

  render() {
    const { isAuthenticated } = this.props.auth;

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
            <Link to='/about'><li><a className="smoothscroll" href="#contact">About</a></li></Link>
            <Link to='/blog'><li><a className="smoothscroll" href="#contact">Blog</a></li></Link>
            |
            {
                !isAuthenticated() && (
                  <li><a className="smoothscroll" href="#" onClick={this.login.bind(this)}>Log In</a></li>
                  )
              }
              {
                isAuthenticated() && (
                  <li><a className="smoothscroll" href="#" onClick={this.logout.bind(this)}>Log Out</a></li>
                  )
              }
            <Link to='/registration'><li><a className="smoothscroll" href="#contact">Sign Up</a></li></Link>
            
         </ul>
      </nav>
      </div>
      </header>      

   
    );
  }
}

export default Header;
