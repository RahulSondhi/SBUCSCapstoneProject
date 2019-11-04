import React, {Component} from 'react';
import Tabs from '../../search/tabs.js';
import '../../menu/menu.css';
import './mybar.css'
import {CustomCreateButton, Entry, BottleIconStyle} from '../../../js/constants.js';
import Bottle from '../../../assets/bottle.svg';

class MyBar extends Component {
    render() {
        return (
            <div className="grid-container-fluid grid-margin-y">
                <Tabs/>
                <div className="grid-x cell">
                    <div className="cell small-4 large-offset-4">
                        <h1 className="myTitle caption">
                            My Bars
                        </h1>
                    </div>
                    <div className="cell small-4 createButtonHolder">
                        <CustomCreateButton redirect="/tipsy/createBar" name="Create A Bar +"/>
                    </div>
                </div>
                <div className="grid-x grid-margin-y box cell">
                    <Entry
                        itemName="BarName"
                        icon={Bottle}
                        style={BottleIconStyle}
                        ownerName="OwnerName"
                        redirect="/tipsy/myBars/bar"
                        alt="Bottle"/>
                    <Entry
                        itemName="BarName"
                        icon={Bottle}
                        style={BottleIconStyle}
                        ownerName="OwnerName"
                        redirect="/tipsy/myBars/bar"/>
                    <Entry
                        itemName="BarName"
                        icon={Bottle}
                        style={BottleIconStyle}
                        ownerName="OwnerName"
                        redirect="/tipsy/myBars/bar"/>
                    <Entry
                        itemName="BarName"
                        icon={Bottle}
                        style={BottleIconStyle}
                        ownerName="OwnerName"
                        redirect="/tipsy/myBars/bar"/>
                    <Entry
                        itemName="BarName"
                        icon={Bottle}
                        style={BottleIconStyle}
                        ownerName="OwnerName"
                        redirect="/tipsy/myBars/bar"/>
                    <Entry
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
