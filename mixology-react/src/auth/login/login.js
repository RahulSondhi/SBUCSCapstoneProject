import React, {Component} from 'react';
import {SVG, TipsyStyle, DrinksStyle, CustomButton} from '../../constants/constants.js';
import Tipsy from '../../assets/Tipsy.svg';
import Drinks from '../../assets/drinks.svg';
import './login.css';
import '../../index.css';

class Login extends Component {
    render() {
        return (
            <div className="container">
                <div className="logo">
                    <SVG src={Tipsy} style={TipsyStyle} alt="TipsyLogo"/>
                </div>
                <form method="post">
                    <div className="sign-in-form">
                        <h3>Log into your account.</h3>
                        <div>
                            <p>Invalid username or password.</p>
                        </div>
                        <div>
                            <p>You have been logged out.</p>
                        </div>
                        <br/>
                        <label htmlFor="username">Email:</label>
                        <input
                            type="username"
                            id="username"
                            name="username"
                            autoFocus="autofocus"
                            placeholder="Enter Email"/>
                        <br/><br/>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter Password"/>
                        <br/><br/>
                        <CustomButton name="Login" redirect="/search"/>
                        <CustomButton name="Register" redirect="/register"/>
                        <div className="footer"></div>
                    </div>
                </form>
                <SVG src={Drinks} style={DrinksStyle} alt="DrinksLogo"/>
            </div>
        )
    }
}

export default Login;