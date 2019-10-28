import React, {Component} from 'react';
import Tabs from '../../search/tabs.js';
import '../../menu/menu.css';
import './bargears.css'
import {CustomButton, GearEntry} from '../../../constants/constants.js';

class BarGears extends Component {
    render() {
        return (
            <div>
                <Tabs/>
                <h1 className="myBar">
                    My Gears</h1>
                <div id="uploadGear">
                    <CustomButton redirect="/tipsy/search" name="Upload A Gear +"/>
                </div>
                <div className="grid-x grid-margin-y box">
                    <GearEntry/>
                    <GearEntry/>
                    <GearEntry/>
                    <GearEntry/>
                    <GearEntry/>
                </div>
            </div>
        )
    }
}

export default BarGears;
