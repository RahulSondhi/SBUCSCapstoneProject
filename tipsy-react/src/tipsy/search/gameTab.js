import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './gameTab.css';

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
                {/* <SVG src={Tipsy} style={TipsyStyle} alt="TipsyLogo"/> */}
                <h1> TIPSY</h1>
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
