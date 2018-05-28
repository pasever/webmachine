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
      clientId: this.props.clientId,
      clientName: this.props.clientName,
      memberProfile: {}
    }
  }

  componentDidMount() {
    API.member.getProfileData(this.state.clientId)
      .then(res => {
        // Extract profile data from response
        let memberProfile = res.data.profile;

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
        <h2>Update your profile information</h2>
        <h3>for {this.state.clientName}</h3>

        {this.state.memberProfile ? (
          <div>
            <p>First Name: {this.state.memberProfile.firstName}</p>
            <p>Last Name: {this.state.memberProfile.lastName}</p>
            <p>Cell: {this.state.memberProfile.cell}</p>
            <p>Email: {this.state.memberProfile.email}</p>
          </div>
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