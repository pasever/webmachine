/// deprecated

import React, {Component} from 'react';


export const Checkbox = ({ label, checked, onChange}) =>             
        <div className="input-group">
            <label>
                <input type="checkbox" value={label} 
                    checked={ checked} onChange={ onChange } />
                { label }   
            </label>
        </div>
