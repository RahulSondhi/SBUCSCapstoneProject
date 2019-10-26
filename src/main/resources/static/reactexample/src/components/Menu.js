import React, {Component} from 'react';
import {Switch} from "react-router-dom";
import Tabs from './Tabs';
import '../css/menu.css';
import '../../public/styles.css';

export const AccountMenu = () => (
    <div className="topContainer">
        <Tabs/>
        <div className="tabs"></div>
        {/* <-- bar tab --> */}
        <div className="box" id="accountBox">
            <div className="entry">
                <div className="bar-progress">
                    <div className="text-section textLeft">
                        <p className="text-info">
                            BarName
                        </p>
                        <p className="text-info">
                            OwnerName
                        </p>
                    </div>
                    <div className="text-section textRight">
                        <p className="text-info" id="progress">
                            40%
                        </p>
                        <p className="text-info">
                            Date
                        </p>
                    </div>
                </div>
                <div className="button" id="make">
                    Make
                </div>
                <div className="button" id="view">
                    View
                </div>
            </div>
            <button className="addBar button">+</button>
        </div>

    </div>
);

export const BarMenu = () => (
    <div className="topContainer">
        <Tabs/>
        <div className="tabs"></div>
        {/* <-- bar tab --> */}
        <div className="box" id="barBox">
            <div className="entry">
                <div className="bar-progress">
                    <div className="text-section textLeft">
                        <p className="text-info">
                            BarName
                        </p>
                        <p className="text-info">
                            OwnerName
                        </p>
                    </div>
                    <div className="text-section textRight">
                        <p className="text-info" id="progress">
                            40%
                        </p>
                        <p className="text-info">
                            Date
                        </p>
                    </div>
                </div>
                <div className="button" id="make">
                    Make
                </div>
                <div className="button" id="view">
                    View
                </div>
            </div>
            <button className="addBar button">+</button>
        </div>

    </div>
);

export const RecipeMenu = () => (
    <div className="topContainer">
        <Tabs/>
        <div className="tabs"></div>
        {/* <-- bar tab --> */}
        <div className="box" id="recipeBox">
            <div className="entry">
                <div className="bar-progress">
                    <div className="text-section textLeft">
                        <p className="text-info">
                            BarName
                        </p>
                        <p className="text-info">
                            OwnerName
                        </p>
                    </div>
                    <div className="text-section textRight">
                        <p className="text-info" id="progress">
                            40%
                        </p>
                        <p className="text-info">
                            Date
                        </p>
                    </div>
                </div>
                <div className="button" id="make">
                    Make
                </div>
                <div className="button" id="view">
                    View
                </div>
            </div>
            <button className="addBar button">+</button>
        </div>

    </div>
);

class Menu extends Component {
    render() {
        return (
            <div>

                <Tabs/>
                <Switch></Switch>
            </div>
        )
    }
}

export default Menu;