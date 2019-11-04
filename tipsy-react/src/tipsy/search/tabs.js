import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './tabs.css';
import {Icon} from 'antd';

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
            <nav className="top-bar tabHolder tabs">
                {/* <SVG src={Tipsy} style={TipsyStyle} alt="TipsyLogo"/> */}
                <h1> TIPSY</h1>
                <div className="top-bar-right ">
                    <ul className="horizontal menu nested">
                        <Tab className="tab" link="/tipsy/search" name="Search"/>
                        <Tab className="tab" link="/tipsy/myBars" name="My Bars"/>
                        <Tab className="tab" link="/tipsy/myRecipes" name="My Recipes"/>
                        <Tab className="tab" link="/tipsy/barGears" name="Bar Gears"/>
                        <Tab className="tab" link="/" name={< Icon type = "user" />}/>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Tabs;
