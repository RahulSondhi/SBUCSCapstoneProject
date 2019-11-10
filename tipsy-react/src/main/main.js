import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import history from './history';
// import { PropsRoute, PublicRoute, PrivateRoute } from
// 'react-router-with-props'; import {BrowserRouter as Router, Route, Switch}
// from 'react-router-dom'; Authentification Imports
import Login from '../auth/login.js';
import Logout from '../auth/logout.js';
import Register from '../auth/register.js';
import Forgot from '../auth/forgot.js';
import Confirm from '../auth/confirm.js';
import Reset from '../auth/reset.js';

// Public Page Imports
import EquipmentPage from '../tipsy/publicPages/equipmentPage.js';
import RecipePage from '../tipsy/publicPages/recipePage.js';
import BarPage from '../tipsy/publicPages/barPage.js';
import UserPage from '../tipsy/publicPages/userPage.js';

// User Page Imports
import AdminPage from '../tipsy/userPages/adminPage.js';
import UsersBarsPage from '../tipsy/userPages/usersBarsPage.js';
import UsersRecipesPage from '../tipsy/userPages/usersRecipesPage.js';
import CreateBarPage from '../tipsy/userPages/createBarPage.js'
import CreateRecipePage from '../tipsy/userPages/createRecipePage.js';
import BarEquipmentPage from '../tipsy/userPages/barEquipmentPage.js';
import SearchPage from '../tipsy/userPages/searchPage.js';

// Game Page Imports
import Game from '../tipsy/game.js';

import {getCurrentUser} from '../util/APIUtils.js';
import * as constant from '../js/constants.js';
import {notification} from 'antd';

import PrivateRoute from '../js/PrivateRoute.js';
import PublicRoute from '../js/PublicRoute.js';

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
    register
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

    handleLogout(notificationType = "success", description = "You're successfully logged out.") {
        localStorage.removeItem(constant.ACCESS_TOKEN);

        this.setState({currentUser: null, isAuthenticated: false});

        // this
        //     .props
        //     .history
        //     .push(redirectTo);

        history.push("/");
        window.location.reload();

        notification[notificationType]({message: 'Tipsy App', description: description});
    }

    handleLogin() {
        notification.success({message: 'Tipsy App', description: "You're successfully logged in."});
        this.loadCurrentUser();
        // We must redirect login history.push("/tipsy/search");
        // window.location.reload(); this.props.history.push("/tipsy/search");
    }

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <PublicRoute
                        exact
                        path={["/", "/login"]}
                        authed={this.state.isAuthenticated}
                        redirectTo="/tipsy/search"
                        component=
                        { (props) => <Login onLogin={this.handleLogin} {...props}/> }/>
                    <PublicRoute
                        exact
                        path="/forgot"
                        authed={this.state.isAuthenticated}
                        redirectTo="/tipsy/search"
                        component={Forgot}/>
                    <PublicRoute
                        exact
                        path="/confirm"
                        authed={this.state.isAuthenticated}
                        redirectTo="/tipsy/search"
                        component={Confirm}/>
                    <PublicRoute
                        exact
                        path="/reset"
                        authed={this.state.isAuthenticated}
                        redirectTo="/tipsy/search"
                        component={Reset}/>
                    <PublicRoute
                        exact
                        path="/register"
                        authed={this.state.isAuthenticated}
                        redirectTo="/tipsy/search"
                        component={Register}/>
                    <PrivateRoute 
                        exact path="/tipsy/search"
                        authed={this.state.isAuthenticated}
                        redirectTo="/login"
                        component={SearchPage}/>
                    <PrivateRoute 
                        exact path="/tipsy/myBars"
                        authed={this.state.isAuthenticated}
                        redirectTo="/login"
                        component={UsersBarsPage}/>
                    <PrivateRoute 
                        exact path="/tipsy/bar"
                        authed={this.state.isAuthenticated}
                        redirectTo="/login"  
                        component={BarPage}/>
                    <PrivateRoute 
                        exact path="/tipsy/myRecipes" 
                        authed={this.state.isAuthenticated}
                        redirectTo="/login" 
                        component={UsersRecipesPage}/>
                    <PrivateRoute 
                        exact path="/tipsy/recipe"
                        authed={this.state.isAuthenticated}
                        redirectTo="/login" 
                        component={RecipePage}/>
                    <PrivateRoute 
                        exact path="/tipsy/barEquipment" 
                        authed={this.state.isAuthenticated}
                        redirectTo="/login" 
                        component={BarEquipmentPage}/>
                    <PrivateRoute 
                        exact path="/tipsy/equipment" 
                        authed={this.state.isAuthenticated}
                        redirectTo="/login"
                        component={EquipmentPage}/>
                    <PrivateRoute 
                        exact path="/tipsy/admin"
                        authed={this.state.isAuthenticated}
                        redirectTo="/login"
                        component={AdminPage}/>
                    <PrivateRoute
                        path="/tipsy/user/:nickname"
                        authed={this.state.isAuthenticated}
                        redirectTo="/login"
                        component={(props) => <UserPage
                        isAuthenticated={this.state.isAuthenticated}
                        currentUser={this.state.currentUser}
                        {...props}/>}/>
                    <PrivateRoute 
                        exact path="/tipsy/game"
                        authed={this.state.isAuthenticated}
                        redirectTo="/login"
                        component={Game}/>
                    <PrivateRoute 
                        exact path="/tipsy/createbar"
                        authed={this.state.isAuthenticated}
                        redirectTo="/login"
                        component={CreateBarPage}/>
                    <PrivateRoute 
                        exact path="/tipsy/createRecipe" 
                        authed={this.state.isAuthenticated}
                        redirectTo="/login"
                        component={CreateRecipePage}/>
                    <Route
                        path="/logout"
                        component={(props) => <Logout onLogout={this.handleLogout} {...props}/>}/>
                </Switch>
            </Router>
        );
    }
}

export default Main;
