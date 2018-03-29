import React, { Component } from 'react';


class Jumbotron extends Component {
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
        <header>
        <section className="row banner" id="jumbo">
         <div className="banner-text">
            <h1 className="responsive-headline"> We are {name} .</h1>
            <h3> <span>{occupation} </span> <br></br> {description}</h3>
            <hr />
            <ul className="social">
                {networks}
            </ul>
            <aside>
            <p className="scrolldown">
               <span className="smoothscroll button" id="getStarted" href="#about"><b>Get Started</b></span>
            </p>
            </aside>
         </div>
        </section>   
        </header> 
    );
  }
}

export default Jumbotron;