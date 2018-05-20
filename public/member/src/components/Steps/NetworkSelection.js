import React, { Component }       from 'react';
import Input                      from '../FormElements/Input';
import API                        from '../../../../common/utils/API';

// Global reference to localStorage
let ls = window.localStorage;

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
      // retrieved from backend
      discoverableNetworks: []
    };

    this.toggleActiveClass = this.toggleActiveClass.bind(this);
    this.addNetworkToState = this.addNetworkToState.bind(this);
    this.removeNetworkFromState = this.removeNetworkFromState.bind(this);
  }

  // Check if records of previously selected networksToJoin exists in localStorage.
  // If so, pull records and iterate over list of available networks.
  // For every item in the list that matches a previously selected network,
  // add .active class to it AND push it to array named networksToJoin[]. 
  // Once iteration is over, set networksToJoin into state again (state is lost
  // once user navigates to the next page and this component unmounts)
  /** @todo implement same functionality in member-form */
  componentDidMount() {

    API.getPublicClients()
      .then(res => {
        let discoverableNetworks = res.data;
        this.setState({ discoverableNetworks });
      })
      .catch(err => {
        console.log(err);
      })

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
    let { networks } = this.props;
    networks = networks.concat(net_id);
    this.props.handleChange(networks);
  }

  /** @method */
  // Gets called if active class is present.
  // Removes network id from state.
  /** @param netword_id */
  removeNetworkFromState(net_id) {
    let { networks } = this.props;
    let index = networks.indexOf(net_id);
    if (index > -1) {
      networks.splice(index, 1);
      this.props.handleChange(networks);
    }
  }

  /** @method */
   // If component will unmount, save state into localStorage
  componentWillUnmount() {
    ls.setItem('networksToJoin', this.props.networks);
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
          <a href='#' onClick={() => this.props.changePage('member-form')}>
            Go to the Member Registration Form (Next)
          </a>

        </footer>
      </div>
    )
  }
}



export default NetworkSelection;
