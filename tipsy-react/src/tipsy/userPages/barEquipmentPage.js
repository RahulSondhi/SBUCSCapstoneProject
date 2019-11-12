import React, {Component} from 'react';
import UserIcon from '../../assets/user.svg';
import {CustomCreateButton, Entry} from '../../main/constants';
import Navbar from '../navbar/navbar.js';

class BarEquipmentPage extends Component {
    render() {
        return (
            <div className="grid-margin-y">
                <Navbar/>
                <div className="grid-x cell">
                    <div className="cell small-4"></div>
                    <h1 className="myTitle caption cell small-4">
                        Bar Gear</h1>
                    <div className="cell small-4 createButtonHolder" id="uploadGear">
                        <CustomCreateButton redirect="/tipsy/barGears/gear" name="Upload A Gear +"/>
                    </div>
                </div>
                <div className="grid-container grid-x full">
                    <div className="grid-x grid-margin-y box cell large-10 large-offset-1">
                        <Entry
                            objectName="Gear"
                            icon={UserIcon}
                            id="user"
                            ownerName="User"
                            textClass="userCaption"
                            redirect="/tipsy/barGears/gear"/>
                        <Entry
                            objectName="Gear"
                            icon={UserIcon}
                            id="user"
                            ownerName="User"
                            textClass="userCaption"
                            redirect="/tipsy/barGears/gear"/>
                        <Entry
                            objectName="Gear"
                            icon={UserIcon}
                            id="user"
                            ownerName="User"
                            textClass="userCaption"
                            redirect="/tipsy/barGears/gear"/>
                        <Entry
                            objectName="Gear"
                            icon={UserIcon}
                            id="user"
                            ownerName="User"
                            textClass="userCaption"
                            redirect="/tipsy/barGears/gear"/>
                        <Entry
                            objectName="Gear"
                            icon={UserIcon}
                            id="user"
                            ownerName="User"
                            textClass="userCaption"
                            redirect="/tipsy/barGears/gear"/>
                        <Entry
                            objectName="Gear"
                            icon={UserIcon}
                            id="user"
                            ownerName="User"
                            textClass="userCaption"
                            redirect="/tipsy/barGears/gear"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default BarEquipmentPage;
