import React, {Component} from 'react';
import {Route, Switch, BrowserRouter} from "react-router-dom";
import Tabs from './Tabs';
import '../css/menu.css';
import '../../public/styles.css';

const AccountMenu = () => (
    <div className="topContainer">
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

const BarMenu = () => (
    <div className="topContainer">
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

const RecipeMenu = () => (
    <div className="topContainer">
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

const LoginMenu = () => (
    <div>
        REE
    </div>
)

class Menu extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Tabs/>
                    <Switch>
                        <Route path="/bar" component={BarMenu} className="tab"/>
                        <Route path="/recipe" component={RecipeMenu} className="tab"/>
                        <Route path="/account" component={AccountMenu} className="tab"/>
                        <Route path="/login" component={LoginMenu} className="tab"/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default Menu;