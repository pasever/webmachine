import React from 'react';
import '../styles/flex.css';

/**
 * 
 * @prop children - Child components
 * @prop classes - allows the ability to add classes to the flexItem.  Usage: classes="class1 class2"
 */
export const FlexItem = ({ children, classes }) =>
    <div className={`flex-section ${ classes }`}>
        { children }
    </div>