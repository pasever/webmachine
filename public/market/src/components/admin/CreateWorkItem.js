import React, { Component } from 'react';
import axios from 'axios';
import Button from './Button';
import Modal from './Modal';

class CreateWorkitem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workitemTitle: '',
      workitemPrice: '',
      workitemDuration: '',
      workitemDescription: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.id]: e.target.value.trim()});
  }

  submitForm(e) {
    e.preventDefault();
    let confirm = window.confirm('Work Item will be created. Please confirm.');
    if(confirm) {
      console.log('work item created');
      console.log(this.state);
    };
  }

  render() {
    console.log(this.state)
    return (
      <div>
        {/* Triggers modal */}
        <Button />

        {/* Form for adding workitems */}
        <Modal
          handleChange={this.handleChange}
          submitForm={this.submitForm}
          {...this.props.modalData}
        />
      </div>
    )
  }
}
// const CreateWorkitem = ({ modalData }) => {
//   function submitForm(e) {
//     e.preventDefault();
//     console.log('form submission triggered');
//   }

//   return (
//     <div>
//       {/* Triggers modal */}
//       <Button />

//       {/* Form for adding workitems */}
//       <Modal
//         handleSubmit={submitForm}
//         {...modalData}
//       />
//     </div>
//   )
// }

export default CreateWorkitem;