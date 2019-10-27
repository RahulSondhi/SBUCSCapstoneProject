import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { SVG, TipsyStyle } from '../../constants/constants.js';
import Tipsy from '../../assets/Tipsy.svg';
import './tabs.css';

const Tab = (props) => {
    return (
        <div>
            <Link to={props.link} className="tab">
                <li>
                    <p>
                        {props.name}
                    </p>
                </li>
            </Link>
        </div>
    )
};

class Tabs extends Component {
    render() {
        return (
            <div className="top-bar">
                <SVG src={Tipsy} style={TipsyStyle} alt="TipsyLogo"/>
                <div className="top-bar-right">
                    <ul className="vertical medium-horizontal menu">
                        <Tab link="/tipsy/search" name="Search"/>
                        <Tab link="/tipsy/myBars" name="My Bars"/>
                        <Tab link="/tipsy/myRecipes" name="My Recipes"/>
                        <Tab link="/tipsy/admin" name="Admin"/>
                        <Tab link="/" name="Logout"/>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Tabs;