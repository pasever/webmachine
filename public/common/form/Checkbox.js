/// deprecated

import React, {Component} from 'react';


export class Checkbox extends Component {
    state = {
        isChecked: this.props.initialCheck || false,
    }
    constructor(props) {
        super(props);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
    }

    toggleCheckbox() {
        const { isChecked } = this.state;
        //const { handleCheckboxChange, Label } = this.props;
        this.setState({ isChecked: !isChecked });
        //handleCheckboxChange(label);
    }

    render() {
        const { label } = this.props;
        const { isChecked } = this.state;
        return (
            
            <div className="input-group">
                <label>
                    <input type="checkbox" value={label} 
                        checked={isChecked} onChange={this.toggleCheckbox } />
                    { label }   
                </label>
            </div>
        );
    }
}