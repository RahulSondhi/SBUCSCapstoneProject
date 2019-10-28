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
                <div className="grid-x">
                    <div className="cell small-4"></div>
                    <div className="cell small-4">
                        <h1 className="myTitle">
                            My Bars
                        </h1>
                    </div>
                    <div className="cell small-4">
                        <CustomButton redirect="/tipsy/createBar" name="Create A Bar +"/>
                    </div>
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
