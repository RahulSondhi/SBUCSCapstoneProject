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
                Tipsy
            </div>
            <form method="post">
                <div className="sign-in-form">
                    <h2>Login your account.</h2>
                    <div>
                        <div>Invalid username or password.</div>
                    </div>
                    <div>
                        <div>You have been logged out.</div>
                    </div>
                    <br/>
                    <label htmlFor="username">Username</label>:
                    <input
                        type="username"
                        id="username"
                        name="username"
                        autoFocus="autofocus"
                        placeholder="Username"/>
                    <br/><br/>
                    <label htmlFor="password">Password</label>:
                    <input type="password" id="password" name="password" placeholder="Password"/>
                    <br/><br/>
                    <CustomButton name="Log in" redirect="/search"/>
                    <CustomButton name="Register" redirect="/register"/>
                </div>
            </form>
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
                    <Route path="/register" component={Menu}/>
                    <Route path="/bar" component={BarMenu} className="tab"/>
                    <Route path="/recipe" component={RecipeMenu} className="tab"/>
                    <Route path="/account" component={AccountMenu} className="tab"/>
                </Switch>
            </BrowserRouter>
        )
    }

}

export default Main;