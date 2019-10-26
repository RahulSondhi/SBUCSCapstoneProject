import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import {AccountMenu, BarMenu, RecipeMenu} from './Menu';
import Tipsy from '../assets/Tipsy.svg';
import Search from './Search'
import '../css/login.css';
import Drinks from "../assets/drinks.svg"; // Path to your icons.svg
import PropTypes from 'prop-types';

const Icon = ({name, color, size}) => (
    <svg className={`icon icon-${name}`} fill={color} width={size} height={size}>
        <use xlinkHref={`${Drinks}#icon-${name}`}/>
    </svg>
);

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number
};

const CustomButton = (props) => {
    return (
        <div>
            <Link to={props.redirect}>
                <button type="submit" className="button">
                    {props.name}
                </button>
            </Link>
        </div>
    )
}

const SVG = (props) => {
    return (
        <div>
            <img
                src={props.src}
                height="50%"
                width="50%"
                style={props.style}
                alt={props.alt}/>
        </div>
    );
}

const DrinksStyle = {
    width: "50%",
    height: "50%",
    "margin-left": "auto",
    "margin-right": "auto",
    "display": "block"
}

const TipsyStyle = {
    width: "50%",
    height: "50%"
}

const LoginBox = () => {
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

const RegisterBox = () => {
    return (
        <div className="container">
            <div className="logo">
                <SVG src={Tipsy} style={TipsyStyle} alt="TipsyLogo"/>
                <SVG src={Drinks} style={DrinksStyle} alt="DrinksLogo"/>
            </div>
        </div>
    )
}

class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={LoginBox}/>
                    <Route path="/search" component={Search}/>
                    <Route path="/register" component={RegisterBox}/>
                    <Route path="/bar" component={BarMenu} className="tab"/>
                    <Route path="/recipe" component={RecipeMenu} className="tab"/>
                    <Route path="/account" component={AccountMenu} className="tab"/>
                </Switch>
            </BrowserRouter>
        )
    }

}

export default Main;
