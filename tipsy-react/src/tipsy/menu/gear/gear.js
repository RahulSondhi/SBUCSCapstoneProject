import React, {Component} from 'react';
import Tabs from '../../search/tabs';
import './gear.css';
import { SVG, ToolStyle } from '../../../js/constants.js';
import Spoon from '../../../assets/spoon.svg';


class Gear extends Component {
    render() {
        return (
            <div className="grid-margin-y">
                <Tabs/>
                <h1 className="caption">
                    GearName
                </h1>
                <h4>Owner: Name
                </h4>
                <div className="grid-x grid-margin-x boxContainer">
                    <div className="cell small-6">
                        <SVG src={Spoon} style={ToolStyle} alt="Ingredient"/>
                    </div>
                    <div className="cell small-6">
                        <h4>
                            Usage</h4>
                        <div className="gearBox">
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
