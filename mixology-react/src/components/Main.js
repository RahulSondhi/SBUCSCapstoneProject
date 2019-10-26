import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import { Menu, AccountMenu, BarMenu, RecipeMenu }from './Menu';
import Search from './Search'
import '../css/login.css';
import Drinks from "../assets/drinks.svg"; // Path to your icons.svg
import PropTypes from 'prop-types';

const Icon = ({ name, color, size }) => (
  <svg className={`icon icon-${name}`} fill={color} width={size} height={size}>
    <use xlinkHref={`${Drinks}#icon-${name}`} />
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

const LoginBox = () => {
    return (
        <div className="container">
            <div className="logo">
              <svg xmlns="http://www.w3.org/2000/svg" width="40vw" viewBox="0 0 1885 465">
                <g id="Tipsy" transform="translate(0 -265)">
                  <text id="TIPSY-2" data-name="TIPSY" transform="translate(0 265)" fill="#fff" fontSize="400" fontFamily="ArialMT, Arial" letterSpacing="0.35em"><tspan x="84.57" y="362">TIPSY</tspan></text>
                  <line id="Line_1" data-name="Line 1" x2="120" transform="translate(1604.5 612.5)" fill="none" stroke="#fff" strokeWidth="30"/>
                  <path id="Polygon_1" data-name="Polygon 1" d="M49.5,0,99,79H0Z" transform="translate(1716.085 459.571) rotate(180)" fill="maroon"/>
                </g>
              </svg>
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
                    <input type="password" id="password" name="password" placeholder="Enter Password"/>
                    <br /><br />
                    <div className="footer">
                        <input type="submit" name="register-submit" className="button" value="Register" />
                        <input type="submit" name="login-submit" className="button" value="Log In" />
                    </div>
                </div>
            </form>
        </div>
    )
}

const RegisterBox = () => {
    return (
        <div className="container">
        <div className="logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="40vw" viewBox="0 0 1885 465">
            <g id="Tipsy" transform="translate(0 -265)">
              <text id="TIPSY-2" data-name="TIPSY" transform="translate(0 265)" fill="#fff" fontSize="400" fontFamily="ArialMT, Arial" letterSpacing="0.35em"><tspan x="84.57" y="362">TIPSY</tspan></text>
              <line id="Line_1" data-name="Line 1" x2="120" transform="translate(1604.5 612.5)" fill="none" stroke="#fff" strokeWidth="30"/>
              <path id="Polygon_1" data-name="Polygon 1" d="M49.5,0,99,79H0Z" transform="translate(1716.085 459.571) rotate(180)" fill="maroon"/>
            </g>
          </svg>
        </div>
        <form method="post">
            <div className="sign-in-form">
                <h3>Register your account.</h3>
                <label htmlFor="username">First Name:</label>
                <input type="username" id="username" name="username" autoFocus="autofocus" placeholder="Enter First Name" />
                <br /><br />
                <label htmlFor="username">Last Name:</label>
                <input type="username" id="username" name="username" autoFocus="autofocus" placeholder="Enter Last Name" />
                <br /><br />
                <label htmlFor="username">Email:</label>
                <input type="username" id="username" name="username" autoFocus="autofocus" placeholder="Enter Email" />
                <br /><br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter Password" />
                <br /><br />
                <label htmlFor="password">Confirm Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter Password" />
                <br /><br />
                <div className="footer">
                    <input type="submit" name="register-submit" class="button" value="Register" />
                </div>
            </div>
        </form>
        <img id="drinks" src="assets/drinks.svg" />
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
