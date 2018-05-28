import React, { Component } from 'react';
import { FlexItem } from '../../../common/grid/FlexItem';

class UpdateMemberProfile extends Component {

  constructor(props) {
    super(props);
    this.state = { clientId: this.props.clientId }
  }

  render() { 
    return (
      <section>
        <h1>This is where you update your info for the Network you clicked</h1>
        <p>client Id: {this.state.clientId}</p>
        <button
          onClick={() => this.props.handleCallToUpdateProfile(false, '')}
        >
          Go back
        </button>
      </section>
     )
  }
}
 
export default UpdateMemberProfile;