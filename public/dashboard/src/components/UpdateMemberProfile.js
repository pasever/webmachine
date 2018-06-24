import React, { Component }       from 'react';
import { FlexItem }               from '../../../common/grid/FlexItem';
import { Button, Input }          from '../../../common/form'
import { MemberProfileForm }      from '../partials';
import { Col }                    from '../../../common/grid';
import API                        from '../../../common/utils/API';
import URI                        from '../../../common/utils//URI';
import '../../../common/styles/animate.css';
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
      isLoading: true,
      memberProfile: {},
      updatedSuccess: false,
      updatedFailure: false,
      isSaving: false,
    }
    this.updateFormField = this.updateFormField.bind(this);
    this.handleNetworkRemoval = this.handleNetworkRemoval.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  componentDidMount() {
    API.member.getProfileData(this.state.clientId)
      .then(res => {
        // Extract profile data from response
        let memberProfile = res.data.profile;

        // Save profile data into state
        this.setState({ memberProfile, isLoading: false });
      })
      .catch(err => {
        // If err, log for now
        console.log(err);
      })
  }
  updateFormField = event => {
    
    const { name, value } = event.target;
    const { memberProfile } = this.state;
    memberProfile[name] = value;
    this.setState({ memberProfile, updatedSuccess: false });
    
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
  updateProfile = event => {
    event.preventDefault();
    this.setState({isSaving: true })
    const {clientId, memberProfile} = this.state;
    API.member.updateProfileData(clientId, memberProfile).then(resp => 
      this.setState({ updatedSuccess: true, updatedFailure: false, isSaving: false })
    ).catch(err => { 
      console.log(err);
      this.setState({ updatedSuccess: false, updatedFailure: true, isSaving: false })
    })
  }
  render() { 
    return (
      <section style={{position: 'relative'}} className="animated fadeIn">
        <h3>Update your information</h3>
        <h3>for {this.state.clientName}</h3>
        { this.state.updatedSuccess && ( <h5 className="badge badge-success">Profile Updated!</h5> )}
        { this.state.updatedFailure && ( <h5 className="badge badge-danger">An error occured</h5> )}
        { !this.state.isLoading ? (
          <form onSubmit={ this.updateProfile }>
            <div className="col-8 offset-2">
              <MemberProfileForm 
                memberProfile={this.state.memberProfile }
                updateFormField={this.updateFormField }
              />
            {this.state.isSaving ? (
              <i className="fa fa-gear fa-spin fa-2x margin-top-10" />
            ) : (
              <Button style="default" type="submit" text="Save Changes" />
            )}
            </div>
          </form>
        ) : (
          <p>Getting profile data <i className="fa fa-gear fa-spin"></i></p>
        )}

        <a
          href='#'
          onClick={() => this.props.handleCallToUpdateProfile(false, '')}
          style={{position: 'absolute', top: 0, left: 0}}
        >
          <i className='fa fa-arrow-left' />  Go back
        </a>

        <Button
          style='danger'
          onClick={this.handleNetworkRemoval}
          text="Leave network"
        />
         
        
      </section>
     )
  }
}
 
export default UpdateMemberProfile;