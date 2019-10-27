import React, {Component} from 'react';
import Tabs from '../search/tabs.js';
import { UserEntry } from '../../constants/constants.js';

class Admin extends Component {
    render() {
        return (
            <div>
                <Tabs/>
                <h1 className="myBar">
                    My Recipes</h1>
                <div id="createABar">
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