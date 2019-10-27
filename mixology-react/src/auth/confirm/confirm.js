import React, {Component} from 'react';
import '../../index.css';
import {SVG, SmallTipsyStyle, TipsyStyle, CustomButton} from '../../constants/constants.js';
import Tipsy from '../../assets/Tipsy.svg';
import './confirm.css';

class Forgot extends Component {
    render() {
        return (
            <div>
                <SVG src={Tipsy} style={TipsyStyle} alt="TipsyLogo"/>
                <h1>Confirmation</h1>
                <h3>You have successfully registered with
                    <SVG src={Tipsy} style={SmallTipsyStyle} alt="TipsyLogo"/></h3>
                <h4>You can now login with your email
                </h4>
                <br/>
                <CustomButton redirect="/" name="Login"/>
            </div>
        )
    }
}

export default Forgot;