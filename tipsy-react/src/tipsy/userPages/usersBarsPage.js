import React, {Component} from 'react';
import {CustomCreateButton, Entry, BottleIconStyle} from '../../js/constants.js';
import Bottle from '../../assets/bottle.svg';
import Navbar from '../navbar/navbar.js';

class UsersBarsPage extends Component {
    render() {
        return (
            <div className="grid-container-fluid grid-margin-y">
                <Navbar/>
                <div className="grid-x cell">
                    <div className="cell small-12 medium-6 large-4 large-offset-4">
                        <h1 className="myTitle caption">
                            My Bars
                        </h1>
                    </div>
                    <div className="cell small-12 medium-6 large-4 createButtonHolder">
                        <CustomCreateButton redirect="/tipsy/createBar" name="Create A Bar +"/>
                    </div>
                </div>
                <div className="grid-container grid-x full">
                    <div className="grid-x box cell large-10 large-offset-1">
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
                    <div className="grid-x cell large-1"></div>
                </div>
            </div>
        )
    }
}

export default UsersBarsPage;
