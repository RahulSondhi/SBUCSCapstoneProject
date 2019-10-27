import React, {Component} from 'react';
import Tabs from '../../search/tabs.js';
import '../menu.css';
import { CustomButton } from '../../../constants/constants.js';

class Bar extends Component {
    render() {
        return (
            <div>
                <Tabs/>
                <h1> My Bar</h1>
                <CustomButton redirect="/tipsy/createBar" name="Create Bar"/>
                <div class="grid-x grid-margin-y">
                    <div class="small-3 cell">
                        <div class="entry">BarName</div>
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

export default Bar;