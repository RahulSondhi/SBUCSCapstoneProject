import React, {Component} from 'react';
import Tabs from '../search/tabs.js';
import {UserEntry, CustomButton} from '../../constants/constants.js';
import './admin.css';

class Admin extends Component {
    render() {
        return (
            <div>
                <Tabs/>
                <div className="grid-x buttonHolder">
                    <div className="topButton">
                        <CustomButton name="Bar" redirect="/tipsy/admin"/>
                    </div>
                    <div className="topButton">
                        <CustomButton name="Recipe" redirect="/tipsy/admin"/>
                    </div>
                    <div className="topButton">
                        <CustomButton name="User" redirect="/tipsy/admin"/>
                    </div>
                    <div className="topButton">
                        <CustomButton name="Equipment" redirect="/tipsy/admin"/>
                    </div>
                </div>
                <div className="grid-x grid-margin-y box">
                    <UserEntry/>
                    <UserEntry/>
                    <UserEntry/>
                    <UserEntry/>
                    <UserEntry/>
                </div>
            </div>
        );
    }
}

export default Admin;
