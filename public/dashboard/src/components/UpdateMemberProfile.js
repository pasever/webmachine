import React, { Component } from 'react';
import { FlexItem } from '../../../common/grid/FlexItem';

/**
 * @name UpdateMemberProfile
 * @prop {Function} handleCallToUpdateProfile
 *  @param {Boolean} shouldUpdate
 *  @param {String}  clientId
 * 
 * @description
 * This component fetches the logged in member's data
 * from the respective Client's Member Collection.
 * It then allows the Member to update their info
 * if they wish to do so.
 * @author JCG 
 */

class UpdateMemberProfile extends Component {

  constructor(props) {
    super(props);
    this.state = { clientId: this.props.clientId }
  }

  componentDidMount() {
    
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