import React, {Component} from 'react';
import Tabs from '../../search/tabs.js';
import '../../menu/menu.css';
import './bargears.css'
import {CustomCreateButton, EntryOneField} from '../../../js/constants.js';

class BarGears extends Component {
    render() {
        return (
            <div>
                <Tabs/>
                <div className="grid-x">
                    <div className="cell small-4"></div>
                    <h1 className="myTitle caption cell small-4">
                        Bar Gear</h1>
                    <div className="cell small-4 createButtonHolder" id="uploadGear">
                        <CustomCreateButton redirect="/tipsy/barGears/gear" name="Upload A Gear +"/>
                    </div>
                </div>
                <div className="grid-x grid-margin-y box">
                    <EntryOneField objectName="Gear" redirect="/tipsy/barGears/gear"/>
                    <EntryOneField objectName="Gear" redirect="/tipsy/barGears/gear"/>
                    <EntryOneField objectName="Gear" redirect="/tipsy/barGears/gear"/>
                    <EntryOneField objectName="Gear" redirect="/tipsy/barGears/gear"/>
                    <EntryOneField objectName="Gear" redirect="/tipsy/barGears/gear"/>
                    <EntryOneField objectName="Gear" redirect="/tipsy/barGears/gear"/>
                </div>
            </div>
        )
    }
}

export default BarGears;
