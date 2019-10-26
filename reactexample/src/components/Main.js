import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import { Menu, AccountMenu, BarMenu, RecipeMenu }from './Menu';
import Search from './Search'
import '../css/login.css';

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
                <img src="../assets/Tipsy.svg" />
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
            <img id="drinks" src="../assets/drinks.svg" />
        </div>
    )
}

const RegisterBox = () => {
    return (
        <div className="container">
        <div className="logo">
            <img src="../assets/Tipsy.svg" />
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
