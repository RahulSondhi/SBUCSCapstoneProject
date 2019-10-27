import React, {Component} from 'react';
import '../../index.css';
import {SVG, TipsyStyle, CustomButton} from '../../constants/constants.js';
import Tipsy from '../../assets/Tipsy.svg';
import './reset.css';

class Reset extends Component {
    render() {
        return (
            <div>
                <SVG src={Tipsy} style={TipsyStyle} alt="TipsyLogo"/>
                <h1>Forgot Password</h1>
                <h3>Please enter your email address to request a password reset email</h3>
                <h6>New Password:
                </h6>
                <input type="text" name="password" placeholder="Enter Password"/>
                <h6>Confirm Password:
                </h6>
                <input type="text" name="password" placeholder="Enter Password"/>
                <CustomButton redirect="/" name="Reset Password"/>
            </div>
        )
    }
}

export default Reset;