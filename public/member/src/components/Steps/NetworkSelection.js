import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from '../FormElements/Input';

class NetworkSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      networksToJoin: []
    }

    this.addToList = this.addToList.bind(this);
  }

  renderNetworks() {
    // Will eventually be array of networks pulled from DB
    let networks = [1,2,3,4,5,6,7];

    {/*
    * @TODO: onClick, add active class and add network identifier to an array of networksToJoin[]
    */}
    return (
      <ul
        className="list-group list-group-flush networks-results"
        style={{overflowY: 'scroll', maxHeight: '250px'}}
      >
        {networks.map((n, i) =>
          <li
            id={`networdId${i+1}`} key={i+1}
            className="list-group-item network"
            onClick={() => console.log('click')}
          >
            {`Network ${n}`}
          </li>)}
      </ul>
    )
  }

  // Triggered on <li> click.
  // If active class NOT present, adds network id to state
  addNetworkToState() {}

  // Triggered on <li> click.
  // If active class present, adds network id to state
  removeNetworkFromState() {}

  render() {
    return (
      <div className="step1-network-selection" style={{textAlign: 'center', padding: '10px', position:'relative'}} >
        
        <header>

          <h4 className="form-title">First Step</h4>
          <h3 className="title">Browse available public networks</h3>
          <h5 className='subtitle'>Select one or a few you might want to join</h5> 

        </header>

        
        <nav>

          <div className="row">
            <div className="col-md-6 offset-3">
              <Input type='text' id='search-networks' placeholder='Search for a Network'/>
            </div>
          </div>

        </nav>
        

        <main>

          <section id='searchable-networks'>
          
            <div className="row m-4">
              <div className="col-md-8 offset-md-2 col-sm-12">
                {this.renderNetworks()}
              </div>
            </div>

          </section>

        </main>

        <footer>

          {/* Should only display after one or more networks selected */}
          <Link to='/member-form'> Go to the Member Registration Form (Next) </Link>

        </footer>
      </div>
    )
  }
}



export default NetworkSelection;

{/* <Link to='/member-form' className='align-item-center' style={{position: 'absolute', right: -20}}>
<button type='button' className='btn btn-dark' style={{borderRadius: '50%'}}> -> </button>
</Link> */}