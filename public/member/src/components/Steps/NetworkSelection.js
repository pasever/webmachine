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
    return <ul>

    </ul>
  }

  addToList() {}

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
                <ul className="list-group list-group-flush networks-results" style={{overflowY: 'scroll', maxHeight: '250px'}}>
                  {/*
                  * @TODO: onClick, add active class and add network identifier to an array of networksToJoin[]
                  */}
                  <li className="list-group-item network active">Cras justo odio</li>
                  <li className="list-group-item network">Dapibus ac facilisis in</li>
                  <li className="list-group-item network">Morbi leo risus</li>
                  <li className="list-group-item network active">Porta ac consectetur ac</li>
                  <li className="list-group-item network">Vestibulum at eros</li>
                  <li className="list-group-item network">Cras justo odio</li>
                  <li className="list-group-item network">Dapibus ac facilisis in</li>
                  <li className="list-group-item network">Morbi leo risus</li>
                  <li className="list-group-item network">Porta ac consectetur ac</li>
                  <li className="list-group-item network">Vestibulum at eros</li>
                </ul>
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