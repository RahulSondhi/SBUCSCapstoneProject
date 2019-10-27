import React, {Component} from 'react';
import { SVG, TipsyStyle, DrinksStyle } from '../../constants/constants.js';
import Tipsy from '../../assets/Tipsy.svg';
import Drinks from '../../assets/drinks.svg';

class Register extends Component {
    render() {
        return (
            <div className="container">
                <div className="logo">
                    <SVG src={Tipsy} style={TipsyStyle} alt="TipsyLogo"/>
                    <SVG src={Drinks} style={DrinksStyle} alt="DrinksLogo"/>
                </div>
            </div>
        )
    }
}

export default Register;