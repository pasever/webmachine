
///////////////////////////////////////////////////////////////////////////
///     Content is the "Master Component" that renders the content of   /// 
///     any .md file whose path is passed into it through props.        ///
///     Content will:                                                   ///
///       1. fetch the content of the file with the specified path      ///
///       2. save the content into state                                ///
///       3. pass the content to <MarkdownRenderer />                   ///       
///                                                                     ///                                          
///     react-markdown-renderer is an npm package that uses React       ///
///     components to render content from markdown files.               ///
///////////////////////////////////////////////////////////////////////////


import React, { Component } from 'react';
import MarkdownRenderer from 'react-markdown-renderer';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  componentWillMount() {
    let file_path = this.props.mdfPath;
    fetch(file_path)
      .then(response => response.text())
      .then(content => {
        this.setState({ content })
      })
  }

  render() {
    return(
      <div>
        <MarkdownRenderer
          markdown={this.state.content}
        />
      </div>
    )
  }
}
