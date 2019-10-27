import React, {Component} from 'react';
import '../../index.css';
import {SVG, TipsyStyle, CustomButton} from '../../constants/constants.js';
import Tipsy from '../../assets/Tipsy.svg';
import './forgot.css';
class Forgot extends Component {
    render() {
        return (
            <div>
                <SVG src={Tipsy} style={TipsyStyle} alt="TipsyLogo"/>
                <h1>Forgot Password</h1>
                <h3>Please enter your email address to request a password reset email</h3>
                <h6>Email:
                </h6>
                <input type="text" name="email" placeholder="Enter Email"/>
                <CustomButton redirect="/" name="Send"/>
            </div>
        )
    }
}

export default Forgot;