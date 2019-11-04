import React, {Component} from 'react';
import Tabs from '../search/tabs.js';
import {Entry, CustomButton} from '../../js/constants.js';
import './admin.css';

class Admin extends Component {
    render() {
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
                    <Entry objectName="User" redirect="/tipsy/admin/user"/>
                    <Entry objectName="User" redirect="/tipsy/admin/user"/>
                    <Entry objectName="User" redirect="/tipsy/admin/user"/>
                    <Entry objectName="User" redirect="/tipsy/admin/user"/>
                    <Entry objectName="User" redirect="/tipsy/admin/user"/>
                    <Entry objectName="User" redirect="/tipsy/admin/user"/>
                </div>
            </div>
        );
    }
}

export default Admin;
