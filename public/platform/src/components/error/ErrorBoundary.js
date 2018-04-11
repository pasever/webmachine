///////////////////////////////////////////////////////////////////////
//////////////////      ErrorBoundary Page        /////////////////////
///////////////////////////////////////////////////////////////////////
// DGO


/// USAGE - 
/// Assists with rendering errors.   See: https://reactjs.org/docs/error-boundaries.html
/// Wrap components in the <ErrorBoundary></ErrorBoundary>  TAG
/// Can wire up to APPLICATIONS error handling as well.

import React, {Component} from 'react';


class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
        console.log(error, info);
    }

    render() {
        if(this.state.hasError) {
            return <h1>There was an error rendering the application...</h1>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;