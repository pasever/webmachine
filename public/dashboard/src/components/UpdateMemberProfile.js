import React, { Component }       from 'react';
import { FlexItem }               from '../../../common/grid/FlexItem';
import Button                     from '../../../common/form/Button'
import API                        from '../../../common/utils/API';
import URI                        from '../../../common/utils//URI';

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
 * for that network
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

    this.handleNetworkRemoval = this.handleNetworkRemoval.bind(this);
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

  handleNetworkRemoval() {
    let { clientName } = this.state;
    let confirmation = confirm(`Are you sure you want to leave ${clientName}'s network?`);

    if (confirmation) {
      let { clientId } = this.state;

      API.member.removeFromNetwork(clientId)
      .then(res => {
        URI.redirect('/dashboard');
      })
      .catch(err => {
        console.log(err);
      })
    }
    
  }

  render() { 
    return (
      <section style={{position: 'relative'}}>
        <h3>Update your information</h3>
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

        <a
          href='#'
          onClick={() => this.props.handleCallToUpdateProfile(false, '')}
          style={{position: 'absolute', top: 0, left: 0}}
        >
          <i className='fa fa-arrow-left' />  Go back
        </a>

        <button
          className='btn  btn-small btn-danger'
          onClick={this.handleNetworkRemoval}
        >
          Leave network
        </button>
      </section>
     )
  }
}
 
export default UpdateMemberProfile;