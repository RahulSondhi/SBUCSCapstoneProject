import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

// Authentification Imports
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
import SettingsPage from '../tipsy/userPages/settingsPage.js';
import ErrorPage from '../tipsy/userPages/errorPage.js';

// Game Page Imports
import Game from '../tipsy/game.js';

// import {PrivateRoute,PublicRoute} from './PrivateRoute';
// import PublicRoute from './PublicRoute';

class Routes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: this.props.state.currentUser,
            isAuthenticated: this.props.state.isAuthenticated
        };
    }


    render() {
        console.log("Children Authenticated: "+this.state.isAuthenticated);
        if(this.state.currentUser) 
            console.log("User: "+this.state.currentUser.nickname);
        return (
            <Router>
                <Switch>
                    {/* Public */}
                    <PublicRoute
                        exact
                        path={["/", "/login"]}
                        authed={this.state.isAuthenticated}
                        redirectTo="/tipsy/search"
                        component=
                        { (props) => <Login onLogin={this.props.onLogin} {...props}/> }/>
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
                        
                    {/* Private  */}
                    <PrivateRoute
                        exact
                        path="/tipsy/search"
                        authed={this.state.isAuthenticated}
                        redirectTo="/login"
                        component={SearchPage}/>
                    <PrivateRoute
                        exact
                        path="/tipsy/myBars"
                        authed={this.state.isAuthenticated}
                        redirectTo="/login"
                        component={(props) => <UsersBarsPage currentUser={this.state.currentUser} {...props}/>}/>
                    <PrivateRoute
                        exact
                        path="/tipsy/bar/:id"
                        authed={this.state.isAuthenticated}
                        redirectTo="/login"
                        component={BarPage}/>
                    <PrivateRoute
                        exact
                        path="/tipsy/myRecipes"
                        authed={this.state.isAuthenticated}
                        redirectTo="/login"
                        component={(props) => <UsersRecipesPage currentUser={this.state.currentUser} {...props}/>}/>
                    <PrivateRoute
                        exact
                        path="/tipsy/recipe/:id"
                        authed={this.state.isAuthenticated}
                        redirectTo="/login"
                        component={RecipePage}/>
                    <PrivateRoute
                        exact
                        path="/tipsy/barEquipment"
                        authed={this.state.isAuthenticated}
                        redirectTo="/login"
                        component={BarEquipmentPage}/>
                    <PrivateRoute
                        exact
                        path="/tipsy/equipment"
                        authed={this.state.isAuthenticated}
                        redirectTo="/login"
                        component={EquipmentPage}/>
                    <PrivateRoute
                        exact
                        path="/tipsy/admin"
                        authed={this.state.isAuthenticated}
                        redirectTo="/login"
                        component={(props) => <AdminPage currentUser={this.state.currentUser} {...props}/>}/>
                    <PrivateRoute
                        exact
                        path = "/tipsy/user/stg"
                        authed={this.state.isAuthenticated}
                        redirectTo="/login"
                        component={(props) => <SettingsPage currentUser={this.state.currentUser} {...props}/>} />
                    <PrivateRoute
                        exact
                        path={["/tipsy/user/:nickname"]}
                        authed={this.state.isAuthenticated}
                        redirectTo="/login"
                        component={(props) => <UserPage currentUser={this.state.currentUser} {...props}/>}/>
                    <PrivateRoute
                        exact
                        path="/tipsy/game"
                        authed={this.state.isAuthenticated}
                        redirectTo="/login"
                        component={(props) => <Game currentUser={this.state.currentUser} {...props}/>}/>
                    <PrivateRoute
                        exact
                        path="/tipsy/createbar"
                        authed={this.state.isAuthenticated}
                        redirectTo="/login"
                        component={(props) => <CreateBarPage currentUser={this.state.currentUser} {...props}/>}/>
                    <PrivateRoute
                        exact
                        path="/tipsy/createRecipe"
                        authed={this.state.isAuthenticated}
                        redirectTo="/login"
                        component={(props) => <CreateRecipePage currentUser={this.state.currentUser} {...props}/>}/>
                    <Route
                        path="/logout"
                        component={(props) => <Logout onLogout={this.props.onLogout} {...props}/>}/>
                    <Route path="/tipsy/error" component={ErrorPage}/>
                </Switch>
            </Router>
        );
    }
}

export default Routes;

const PrivateRoute = ({ component, authed, redirectTo, ...rest }) => {
    return (
        <Route {...rest} render={ props => {
            return authed ? (
                renderMergedProps(component, props, rest)
            ) : (
                <Redirect to={{
                    pathname: redirectTo,
                    state: { from: props.location }
                }}/>
            );
        }}/>
    );
};

const PublicRoute = ({ component, authed, redirectTo, ...rest }) => {
    return (
        <Route {...rest} render={ routeProps => {
            return authed ? (
                <Redirect to={{
                    pathname: redirectTo,
                    state: { from: routeProps.location }
                }}/>
            ) : (
                renderMergedProps(component, routeProps, rest)
            );
        }}/>
    );
};

const renderMergedProps = (component, ...rest) => {
    const theProps = Object.assign({}, ...rest);
    return React.createElement(component, theProps);
};
