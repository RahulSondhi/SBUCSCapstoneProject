import React, {Component} from 'react';
import {Entry, CustomButton} from '../../js/constants.js';
import UserIcon from '../../assets/user.svg';
import Navbar from '../navbar/navbar.js';

class AdminPage extends Component {
    render() {
        return (
            <div className="grid-margin-y">
                <Navbar/>
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
                <div className="grid-container grid-x full">
                    <div className="grid-x grid-margin-y box cell large-10 large-offset-1">
                        <Entry
                            objectName="Gear"
                            icon={UserIcon}
                            id="user"
                            ownerName="User"
                            textClass="userCaption"
                            redirect="/tipsy/admin/user"/><Entry
                            objectName="Gear"
                            icon={UserIcon}
                            id="user"
                            ownerName="User"
                            textClass="userCaption"
                            redirect="/tipsy/admin/user"/><Entry
                            objectName="Gear"
                            icon={UserIcon}
                            id="user"
                            ownerName="User"
                            textClass="userCaption"
                            redirect="/tipsy/admin/user"/><Entry
                            objectName="Gear"
                            icon={UserIcon}
                            id="user"
                            ownerName="User"
                            textClass="userCaption"
                            redirect="/tipsy/admin/user"/><Entry
                            objectName="Gear"
                            icon={UserIcon}
                            id="user"
                            ownerName="User"
                            textClass="userCaption"
                            redirect="/tipsy/admin/user"/><Entry
                            objectName="Gear"
                            icon={UserIcon}
                            id="user"
                            ownerName="User"
                            textClass="userCaption"
                            redirect="/tipsy/admin/user"/>
                    </div>
                </div>
            </div>
        ); 
    }
}

export default AdminPage;
