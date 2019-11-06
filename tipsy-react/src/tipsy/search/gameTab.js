import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './gameTab.css';
import {SmallTipsyStyle, SVG} from '../../js/constants.js';
import Tipsy from '../../assets/Tipsy.png';

const GameTab = (props) => {
    return (
        <div>
            <Link to={props.link} className="tab">
                <li>
                    {props.name}
                </li>
            </Link>
        </div>
    )
};

class GameTabs extends Component {
    render() {
        return (
            <nav className="top-bar">
                <SVG src={Tipsy} style={SmallTipsyStyle} alt="TipsyLogo"/>
                <div className="top-bar-right">
                    <ul className="horizontal menu nested">
                        <GameTab link="" name="Instruction"/>
                        <GameTab link="/tipsy/myRecipes/recipe" name="Save"/>
                        <GameTab link="/tipsy/myRecipes" name="Quit"/>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default GameTabs;
