import React, {Component} from 'react';
import { SVG, ToolStyle } from '../../main/constants';
import Spoon from '../../assets/spoon.svg';
import Navbar from '../navbar/navbar.js';

class EquipmentPage extends Component {
    render() {
        return (
            <div className="grid-margin-y">
                <Navbar/>
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

export default EquipmentPage;
