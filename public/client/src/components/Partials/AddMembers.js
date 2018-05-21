import React from 'react';
import ReactFileReader from 'react-file-reader';
import {ErrorDisplay} from '../../../../common/error';
import { Input, Button } from '../../../../common/form';

/*
  REQUIRED PROPS:
    handleChange: func - Handles the change of the Input box
    handleAddMember: func - Handles when the user clicks the "add member" button
    handleFiles: handles when the user decides to upload a CSV file
    emailOrPhone: email or phone number in the input
    errors: errors object
    text: page text
*/
export const AddMembers = ({ handleChange, handleAddMember, handleFiles, emailOrPhone, errors, text}) => 
    <div>
        <Input displayName="Email / Phone"
            type="text" value={ emailOrPhone } 
            onChange={ handleChange } name="current" />
            { errors.emailOrPhone && (
                <ErrorDisplay text={errors.emailOrPhone } />
            )}
        <Button style="success" 
            name="add-button" 
            text="Add Member" 
            type="submit" onClick={ handleAddMember} />            
        {text.upload && ( <h5>{ text.upload }</h5>)}
        <ReactFileReader handleFiles={ handleFiles} fileTypes={ '.csv '}>
            <Button text="Upload" />
        </ReactFileReader>
        { errors.fileError && ( 
            <ErrorDisplay text={ errors.fileError} />
        )}
</div>
