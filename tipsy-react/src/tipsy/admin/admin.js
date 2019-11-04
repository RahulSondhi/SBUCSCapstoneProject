import React, {Component} from 'react';
import Tabs from '../search/tabs.js';
import {Entry, CustomButton} from '../../js/constants.js';
import './admin.css';
import UserIcon from '../../assets/user.svg';

class Admin extends Component {
    render() {
        return (
            <div className="grid-margin-y">
                <Tabs/>
                <h1 className="myTitle caption">
                    Admin
                </h1>
                <div className="grid-x buttonHolder">
                    <div className="tabButton">
                        <CustomButton name="Bar" redirect="/tipsy/admin"/>
                    </div>
                    <div className="tabButton">
                        <CustomButton name="Recipe" redirect="/tipsy/admin"/>
                    </div>
                    <div className="tabButton">
                        <CustomButton name="User" redirect="/tipsy/admin"/>
                    </div>
                    <div className="tabButton">
                        <CustomButton name="Equipment" redirect="/tipsy/admin"/>
                    </div>
                </div>
                <div className="grid-x grid-margin-y box">
                    <Entry
                        objectName="Gear"
                        icon={UserIcon}
                        id="user"
                        ownerName="User"
                        textClass="userCaption"
                        redirect="/tipsy/barGears/gear"/><Entry
                        objectName="Gear"
                        icon={UserIcon}
                        id="user"
                        ownerName="User"
                        textClass="userCaption"
                        redirect="/tipsy/barGears/gear"/><Entry
                        objectName="Gear"
                        icon={UserIcon}
                        id="user"
                        ownerName="User"
                        textClass="userCaption"
                        redirect="/tipsy/barGears/gear"/><Entry
                        objectName="Gear"
                        icon={UserIcon}
                        id="user"
                        ownerName="User"
                        textClass="userCaption"
                        redirect="/tipsy/barGears/gear"/><Entry
                        objectName="Gear"
                        icon={UserIcon}
                        id="user"
                        ownerName="User"
                        textClass="userCaption"
                        redirect="/tipsy/barGears/gear"/><Entry
                        objectName="Gear"
                        icon={UserIcon}
                        id="user"
                        ownerName="User"
                        textClass="userCaption"
                        redirect="/tipsy/barGears/gear"/>
                </div>
            </div>
        );
    }
}

export default Admin;
