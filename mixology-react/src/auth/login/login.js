import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div className="container">
                <div className="logo">
                    <SVG src={Tipsy} style={TipsyStyle} alt="TipsyLogo"/>
                </div>
                <form method="post">
                    <div className="sign-in-form">
                        <h3>Login your account.</h3>
                        <div>
                            <p>Invalid username or password.</p>
                        </div>
                        <div>
                            <p>You have been logged out.</p>
                        </div>
                        <br/>
                        <label htmlFor="username">Email</label>:
                        <input
                            type="username"
                            id="username"
                            name="username"
                            autoFocus="autofocus"
                            placeholder="Enter Email"/>
                        <br/><br/>
                        <label htmlFor="password">Password</label>:
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter Password"/>
                        <br/><br/>
                        <CustomButton name="Login" redirect="/bar"/>
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