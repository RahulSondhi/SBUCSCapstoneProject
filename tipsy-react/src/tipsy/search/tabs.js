import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './tabs.css';

const Tab = (props) => {
    return (
        <div>
            <Link to={props.link} className="tab link">
                <li>
                    {props.name}
                </li>
            </Link>
        </div>
    )
};

class Tabs extends Component {
    render() {
        return (
            <nav className="top-bar tabHolder">
                {/* <SVG src={Tipsy} style={TipsyStyle} alt="TipsyLogo"/> */}
                <h1> TIPSY</h1>
                <div className="top-bar-right">
                    <ul className="horizontal menu nested">
                        <Tab link="/tipsy/search" name="Search"/>
                        <Tab link="/tipsy/myBars" name="My Bars"/>
                        <Tab link="/tipsy/myRecipes" name="My Recipes"/>
                        <Tab link="/tipsy/barGears" name="Bar Gears"/>
                        <Tab link="/tipsy/admin" name="Admin"/>
                        <Tab link="/" name="Logout"/>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Tabs;
