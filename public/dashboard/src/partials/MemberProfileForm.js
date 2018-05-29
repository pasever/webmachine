import React from 'react';
import { Button, Input } from '../../../common/form';

export const MemberProfileForm = ({memberProfile, updateFormField}) => 
    <div>
        <Input
            value={ memberProfile.firstName }
            name="firstName"
            onChange={ updateFormField }
            displayName="First Name"
            type="text"
        />
        <Input
            value={ memberProfile.lastName }
            name="lastName"
            onChange={ updateFormField }
            displayName="Last Name"
            type="text"
        />
        <Input
            value={ memberProfile.email }
            name="email"
            onChange={ updateFormField }
            displayName="Email"
            type="email"
        />
        <Input
            value={ memberProfile.cell }
            name="cell"
            onChange={ updateFormField }
            displayName="Cell Phone Number"
            type="text"
        />
    </div>
