import React, {Component} from 'react';
import Tabs from '../../search/tabs.js';
import '../../menu/menu.css';
import './mybar.css'
import {CustomCreateButton, EntryTwoFields, BottleIconStyle} from '../../../js/constants.js';
import Bottle from '../../../assets/bottle.svg';

class MyBar extends Component {
    render() {
        return (
            <div className="grid-container-fluid grid-y">
                <Tabs/>
                <div className="grid-x">
                    <div className="cell small-4"></div>
                    <div className="cell small-4">
                        <h1 className="myTitle caption">
                            My Bars
                        </h1>
                    </div>
                    <div className="cell small-4 createButtonHolder">
                        <CustomCreateButton redirect="/tipsy/createBar" name="Create A Bar +"/>
                    </div>
                </div>
                <div className="grid-x grid-margin-y box">
                    <EntryTwoFields
                        itemName="BarName"
                        icon={Bottle}
                        style={BottleIconStyle}
                        ownerName="OwnerName"
                        redirect="/tipsy/myBars/bar"/>
                    <EntryTwoFields
                        itemName="BarName"
                        icon={Bottle}
                        style={BottleIconStyle}
                        ownerName="OwnerName"
                        redirect="/tipsy/myBars/bar"/>
                    <EntryTwoFields
                        itemName="BarName"
                        icon={Bottle}
                        style={BottleIconStyle}
                        ownerName="OwnerName"
                        redirect="/tipsy/myBars/bar"/>
                    <EntryTwoFields
                        itemName="BarName"
                        icon={Bottle}
                        style={BottleIconStyle}
                        ownerName="OwnerName"
                        redirect="/tipsy/myBars/bar"/>
                    <EntryTwoFields
                        itemName="BarName"
                        icon={Bottle}
                        style={BottleIconStyle}
                        ownerName="OwnerName"
                        redirect="/tipsy/myBars/bar"/>
                    <EntryTwoFields
                        itemName="BarName"
                        icon={Bottle}
                        style={BottleIconStyle}
                        ownerName="OwnerName"
                        redirect="/tipsy/myBars/bar"/>
                </div>
            </div>
        )
    }
}

export default MyBar;
