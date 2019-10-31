import React, {Component} from 'react';
import Tabs from '../../search/tabs';
import './gear.css';
import { SVG, ToolStyle } from '../../../constants/constants.js';
import Bottle from '../../../assets/bottle.svg';


class Gear extends Component {
    render() {
        this.props.checkAuthenticated();
        return (
            <div>
                <Tabs/>
                <h1>
                    GearName
                </h1>
                <h3>Owner: Name
                </h3>
                <div className="grid-x grid-margin-x boxContainer">
                    <div className="cell small-6">
                        <SVG src={Bottle} style={ToolStyle} alt="Ingredient"/>
                    </div>
                    <div className="cell small-6">
                        <h2>
                            Usage</h2>
                        <div className="viewBox">
                            <p>Stir</p>
                            <p>Shake</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Gear;
