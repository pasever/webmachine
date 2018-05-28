import React, { Component }       from 'react';
import { FlexItem }               from '../../../common/grid/FlexItem';
import API                        from '../../../common/utils/API';

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
    this.state = {
      clientId: this.props.clientId
    }
  }

  componentDidMount() {
    API.member.getProfileData(this.state.clientId)
      .then(profile => {
        // Extract profile data from response
        let memberProfile = profile.data;

        // Save profile data into state
        this.setState({ memberProfile });
      })
      .catch(err => {
        // If err, log for now
        console.log(err);
      })
  }

  render() { 
    return (
      <section>
        <h1>This is where you update your info for the Network you clicked</h1>
        <p>client Id: {this.state.clientId}</p>

        {typeof this.state.memberProfile == 'object' ? (
          this.state.memberProfile
        ) : (
          <p>No profile data found</p>
        )}

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