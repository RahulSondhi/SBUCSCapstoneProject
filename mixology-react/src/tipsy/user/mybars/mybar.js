import React, {Component} from 'react';
import Tabs from '../../search/tabs.js';
import '../../menu/menu.css';
import {CustomButton} from '../../../constants/constants.js';

class MyBar extends Component {
    render() {
        return (
            <div>
                <Tabs/>
                <h1>
                    My Bar</h1>
                <CustomButton redirect="/tipsy/createBar" name="Create Bar"/>
                <div class="grid-x grid-margin-y box">
                    <div class="small-3 cell">
                        <div class="entry">BarName
                            <CustomButton redirect="/tipsy/bar" name="View"/>
                        </div>
                    </div>
                    <div class="small-3 cell">
                        <div class="entry">
                            BarName
                        </div>
                    </div>
                    <div class="small-3 cell">
                        <div class="entry">
                            BarName
                        </div>
                    </div>
                    <div class="small-3 cell">
                        <div class="entry">
                            BarName
                        </div>
                    </div>
                    <div class="small-3 cell">
                        <div class="entry">
                            BarName
                        </div>
                    </div>
                    <div class="small-3 cell">
                        <div class="entry">
                            BarName
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default MyBar;