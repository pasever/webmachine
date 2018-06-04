import React from 'react';
import { Select } from '../../../../common/form';

/** 
 * @prop { Array } members - an array of members to display
 * @prop { Function } handleTempSelect - handles the selection of
*/
export const MembersWhiteList = ({ members, selectClick, itemClick }) => 
    <Select id="membersWhiteList" 
        options={ members } 
        selectClick={ selectClick } 
        itemClick={ itemClick }
        size={`${ members.length > 10 ? 10 : members.length }`} />