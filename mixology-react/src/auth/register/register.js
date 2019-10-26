import React, {Component} from 'react';

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