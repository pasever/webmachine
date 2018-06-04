import React, { Component }       from 'react';
import Input                      from '../FormElements/Input';
import API                        from '../../../../common/utils/API';

// Global reference to localStorage
let ls = window.localStorage;

/**
 * @prop {Function} this.props.changePage
 * Used to update page location in parent's state
 * 
 * @prop {Function} this.props.handleChange
 * Directly updates parent's state.
 * 
 * @prop {Array} this.props.networks
 * networks_to_join Array in parent's state.
 */

class NetworkSelection extends Component {
  /**
   * @property {Array} discoverableNetworks - networks fetched from DB
  */
  constructor(props) {
    super(props);
    this.state = {
      // retrieved from backend
      discoverableNetworks: []
    };

    this.toggleActiveClass = this.toggleActiveClass.bind(this);
    this.addNetworkToState = this.addNetworkToState.bind(this);
    this.removeNetworkFromState = this.removeNetworkFromState.bind(this);
  }

  /**
   * @description
   * Fetches Public Clients and 
   * saves them into state.
  */
  componentDidMount() {

    API.client.getPublicClients()
      .then(res => {
        let discoverableNetworks = res.data;
        this.setState({ discoverableNetworks });
      })
      .catch(err => {
        console.log(err);
      })

  }

  /** 
   * @method renderNetworks
   * @description
   * Renders discoverable networks as a list-group.
   * @returns {NodeList}
  */
  renderNetworks() {
    // Will eventually be array of networks pulled from DB
    let { discoverableNetworks } = this.state;

    // Return <ul> of discoverable networks.
    // Render one <li> for each discoverable network.
    return (
      <ul
        id='networks-results'
        className="list-group list-group-flush"
        style={{overflowY: 'scroll', maxHeight: '250px'}}
      >
        {discoverableNetworks.map((n, i) =>
          <li
            id={n._id} key={i+1}
            className="list-group-item network"
            onClick={this.toggleActiveClass}
          >
            {n.name}
          </li>)}
      </ul>
    )
  }

  /**
   * @method toggleActiveClass
   * @param {Object} e (click event)
   * @description
   * Adds or removes .active class to/from <li>.
   * If .active is added, network id is lifted to parent's state.
   * If .active is removed, network id is removed from parent's state.
  */
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

  /**
   * @method addNetworkToState
   * @param {String} net_id
   * @description
   * Gets called when .active class is added to <li>.
   * Adds network id to networks_to_join Array in parent's state
  */
  addNetworkToState(net_id) {
    let { networks } = this.props;
    networks = networks.concat(net_id);
    this.props.handleChange(networks);
  }

  /**
   * @method removeNetworkFromState
   * @param {String} net_id
   * @description
   * Gets called when .active class is removed from <li>.
   * Removes network id from networks_to_join Array in parent's state.
  */
  removeNetworkFromState(net_id) {
    let { networks } = this.props;
    let index = networks.indexOf(net_id);
    if (index > -1) {
      networks.splice(index, 1);
      this.props.handleChange(networks);
    }
  }

  render() {
    return (
      <div className="step1-network-selection"
        style={{textAlign: 'center', padding: '10px', position:'relative'}}
      >
        
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
          <a href='#' onClick={() => this.props.changePage('member-form')}>
            Go to the Member Registration Form (Next)
          </a>

        </footer>
      </div>
    )
  }
}



export default NetworkSelection;


// if('networksToJoin' in ls) {
//   let previouslySelectedNetworks = ls.getItem('networksToJoin').split(',');
//   let unselectedNetworks = window.document.getElementById('networks-results').getElementsByTagName('li');
//   let networksToJoin = [];
//   // Convert nodeList to Array
//   unselectedNetworks = Array.from(unselectedNetworks);

//   for (let i = 0; i < previouslySelectedNetworks.length; i++) {
//     for (let j = 0; j < unselectedNetworks.length; j++) {
//       if (previouslySelectedNetworks[i] === unselectedNetworks[j].id) {
//         unselectedNetworks[j].classList.add('active');
//         networksToJoin.push(unselectedNetworks[j].id)
//       }
//     }
//   }

//   this.props.handleChange(networksToJoin);
// }
