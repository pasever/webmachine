import React, { Component }       from 'react';
import { Link }                   from 'react-router-dom';
import Input                      from '../FormElements/Input';

class NetworkSelection extends Component {
  /**
   * @property {Array} discoverableNetworks - networks fetched from DB
   * @todo fetch discoverable networks from DB
   * @property {Array} networksToJoin - list of unique identifiers
   * 
   */
  constructor(props) {
    super(props);
    this.state = {
      discoverableNetworks: [1,2,3,4,5,6,7],
      networksToJoin: []
    };

    // bindings
    this.toggleActiveClass = this.toggleActiveClass.bind(this);
    this.addNetworkToState = this.addNetworkToState.bind(this);
  }

  /** @method */
  // Renders discoverable networks as a list-group.
  renderNetworks() {
    // Will eventually be array of networks pulled from DB
    let { discoverableNetworks } = this.state;

    // Return <ul> of discoverable networks.
    // Render one <li> for each discoverable network.
    return (
      <ul
        className="list-group list-group-flush networks-results"
        style={{overflowY: 'scroll', maxHeight: '250px'}}
      >
        {discoverableNetworks.map((n, i) =>
          <li
            id={`networkId${i+1}`} key={i+1}
            className="list-group-item network"
            onClick={this.toggleActiveClass}
          >
            {`Network ${n}`}
          </li>)}
      </ul>
    )
  }

  /** @method */
  // Adds or removes .active class to <li>.network.
  // If it adds .active, it also adds it to state.
  // If it removes .active, it also removes it from state.
  /** @param click_event */
  toggleActiveClass(e) {
    let elem = e.target;

    if (!elem.classList.contains('active')) {
      elem.classList.add('active');
      this.addNetworkToState(elem.id);
    } else {
      elem.classList.remove('active');
      this.removeNetworkFromState(elem.id);
    }
  }

  /** @method */
  // Gets called if active class is NOT present.
  // Adds network id to state.
  /** @param netword_id */
  addNetworkToState(net_id) {
    let { networksToJoin } = this.state;
    networksToJoin = networksToJoin.concat(net_id);
    this.setState({ networksToJoin  });
  }

  /** @method */
  // Gets called if active class is present.
  // Removes network id to state.
  /** @param netword_id */
  removeNetworkFromState(net_id) {
    let { networksToJoin } = this.state;
    let index = networksToJoin.indexOf(net_id);
    if (index > -1) {
      networksToJoin.splice(index, 1);
      this.setState({ networksToJoin })
    }
  }

   /** @method */
  // Lifts state up to Highest Order Component.
  // Does NOT lift state if networksToJoin is empty
  handlePageAdvance() {
    // this.props.liftState('lifting state from child NetworkSelection')
  }


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

          <section id='discoverable-networks'>
          
            <div className="row m-4">
              <div className="col-md-8 offset-md-2 col-sm-12">
                {this.renderNetworks()}
              </div>
            </div>

          </section>

        </main>

        <footer>

          {/* Should only display after one or more networks selected */}
          <Link to='/member-form' onClick={this.handlePageAdvance}> Go to the Member Registration Form (Next) </Link>

        </footer>
      </div>
    )
  }
}



export default NetworkSelection;

{/* <Link to='/member-form' className='align-item-center' style={{position: 'absolute', right: -20}}>
<button type='button' className='btn btn-dark' style={{borderRadius: '50%'}}> -> </button>
</Link> */}