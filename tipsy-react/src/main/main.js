import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// Authentification Imports
import Login from '../auth/login.js';
import Register from '../auth/register.js';
import Forgot from '../auth/forgot.js';
import Confirm from '../auth/confirm.js';
import Reset from '../auth/reset.js';

// Public Page Imports
import GearPage from '../tipsy/publicPages/gearPage.js';
import RecipePage from '../tipsy/publicPages/recipePage.js';
import BarPage from '../tipsy/publicPages/barPage.js';
import UserPage from '../tipsy/publicPages/userPage.js';

// User Page Imports
import AdminPage from '../tipsy/userPages/adminPage.js';
import UsersBarsPage from '../tipsy/userPages/usersBarsPage.js';
import UsersRecipesPage from '../tipsy/userPages/usersRecipesPage.js';
import CreateBarPage from '../tipsy/userPages/createBarPage.js'
import CreateRecipePage from '../tipsy/userPages/createRecipePage.js';
import BarGearsPage from '../tipsy/userPages/barGearsPage.js';
import SearchPage from '../tipsy/userPages/searchPage.js';

// Game Page Imports
import Game from '../tipsy/game.js';

import history from './history.js';
import {getCurrentUser} from '../util/APIUtils.js';
import * as constant from '../js/constants.js';
import {notification} from 'antd';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false
        }
        this.handleLogout = this
            .handleLogout
            .bind(this);
        this.loadCurrentUser = this
            .loadCurrentUser
            .bind(this);
        this.handleLogin = this
            .handleLogin
            .bind(this);
    }

    componentDidMount() {
        this.loadCurrentUser();
    }

    loadCurrentUser() {
        this.setState({isLoading: true});
        getCurrentUser().then(response => {
            this.setState({currentUser: response, isAuthenticated: true, isLoading: false});
        }).catch(error => {
            this.setState({isLoading: false});
        });
    }

    handleLogout(redirectTo = "/", notificationType = "success", description = "You're successfully logged out.") {
        localStorage.removeItem(constant.ACCESS_TOKEN);

        this.setState({currentUser: null, isAuthenticated: false});

        this
            .props
            .history
            .push(redirectTo);

        notification[notificationType]({message: 'Polling App', description: description});
    }

    handleLogin() {
        notification.success({message: 'Polling App', description: "You're successfully logged in."});
        this.loadCurrentUser();
        //We must redirect login
        console.log(history);
        history.push("/tipsy/search");
        window.location.reload();
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route
                        path="/" exact
                        render={(props) => <Login onLogin={this.handleLogin} {...props}/>}/>
                    <Route
                        path="/login"
                        render={(props) => <Login onLogin={this.handleLogin} {...props}/>}/>
                    <Route path="/forgot" component={Forgot}/>
                    <Route path="/confirm" component={Confirm}/>
                    <Route path="/reset" component={Reset}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/tipsy/search" component={SearchPage}/>
                    <Route path="/tipsy/myBars" exact component={UsersBarsPage} className="tab"/>
                    <Route path="/tipsy/myBars/bar" component={BarPage}/>
                    <Route path="/tipsy/myRecipes" exact component={UsersRecipesPage} className="tab"/>
                    <Route path="/tipsy/myRecipes/recipe" component={RecipePage}/>
                    <Route path="/tipsy/barGears" exact component={BarGearsPage} className="tab"/>
                    <Route path="/tipsy/barGears/gear" component={GearPage}/>
                    <Route path="/tipsy/admin" exact component={AdminPage} className="tab"/>
                    <Route path="/tipsy/admin/user" component={UserPage}/>
                    <Route path="/tipsy/game" component={Game}/>
                    <Route path="/tipsy/createbar" component={CreateBarPage}/>
                    <Route path="/tipsy/createRecipe" component={CreateRecipePage}/>
                </Switch>
            </Router>
        )
    }
}

export default Main;
