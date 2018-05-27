import React, { Component } from 'react';

export default class MemberProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    if('id_token' in localStorage) {
      let id_token = localStorage.getItem('id_token')
      this.setState({ id_token })
    }
  }

  render() {
    return (
      <div>
        <h1>Member Profile</h1>
        <p>{ this.state.id_token }</p>
      </div>
    )
  }
}