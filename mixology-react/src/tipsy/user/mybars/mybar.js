import React, {Component} from 'react';
import Tabs from '../../search/tabs.js';
import '../../menu/menu.css';
import './mybar.css'
import {CustomButton, BarEntry} from '../../../constants/constants.js';

class MyBar extends Component {
    render() {
        return (
            <div>
                <Tabs/>
                <h1 className="myBar">
                    My Bars</h1>
                <div id="createABar">
                    <CustomButton redirect="/tipsy/createBar" name="Create a Bar"/>
                </div>
                <div className="grid-x grid-margin-y box">
                    <BarEntry/>
                    <BarEntry/>
                    <BarEntry/>
                    <BarEntry/>
                    <BarEntry/>
                </div>
            </div>
        )
    }
}

export default MyBar;