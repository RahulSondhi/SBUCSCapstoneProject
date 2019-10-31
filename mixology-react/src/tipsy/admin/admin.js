import React, {Component} from 'react';
import Tabs from '../search/tabs.js';
import {EntryOneField, CustomButton} from '../../constants/constants.js';
import './admin.css';

class Admin extends Component {
    render() {
        this.props.checkAuthenticated();
        return (
            <div>
                <Tabs/>
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
                    <EntryOneField objectName="User"/>
                    <EntryOneField objectName="User"/>
                    <EntryOneField objectName="User"/>
                    <EntryOneField objectName="User"/>
                    <EntryOneField objectName="User"/>
                    <EntryOneField objectName="User"/>
                </div>
            </div>
        );
    }
}

export default Admin;
