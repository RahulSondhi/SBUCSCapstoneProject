import React, {Component} from 'react';
import {BrowserRouter , Route, Switch, Redirect} from 'react-router-dom'

// Authentification Imports
import Login from '../pages/auth/login.js';
import Logout from '../pages/auth/logout.js';
import Register from '../pages/auth/register.js';
import Forgot from '../pages/auth/forgot.js';
import Verify from '../pages/auth/verify.js'

// Public Page Imports
import EquipmentPage from '../pages/publicPages/equipmentPage.js';
import RecipePage from '../pages/publicPages/recipePage.js';
import BarPage from '../pages/publicPages/barPage.js';
import UserPage from '../pages/publicPages/userPage.js';

// User Page Imports
import UsersDisplaysPage from '../pages/userPages/userDisplayPage.js';
import ConfigBarPage from '../pages/userPages/configBarPage.js'
import ConfigRecipePage from '../pages/userPages/configRecipePage.js';
import SearchPage from '../pages/userPages/searchPage.js';
import ConfigUserPage from '../pages/userPages/configUserPage.js';
import ChangePasswordPage from '../pages/userPages/changePasswordPage.js';
import ErrorPage from '../pages/userPages/errorPage.js';

// Game Page Imports
import Game from '../pages/userPages/game';

class Routes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: this.props.state.currentUser,
            isAuthenticated: this.props.state.isAuthenticated
        };
    }

    render() {
        console.log("Children Authenticated: " + this.state.isAuthenticated);
        if (this.state.currentUser) 
            console.log("User: " + this.state.currentUser.name);
        return (
            <BrowserRouter>
                <Switch>

                    {/* Public */}

                    <PublicRoute
                        exact
                        path={["/", "/login"]}
                        authed={this.state.isAuthenticated}
                        redirectTo="/tipsy/"
                        component=
                        { (props) => <Login onLogin={this.props.onLogin} {...props}/> }/>
                    <PublicRoute
                        exact
                        path="/forgot"
                        authed={this.state.isAuthenticated}
                        redirectTo="/tipsy/"
                        component={Forgot}/>
                    <PublicRoute
                        exact
                        path="/confirm"
                        authed={this.state.isAuthenticated}
                        redirectTo="/tipsy/"
                        component={(props) => <Verify flow={"verifyConfirm"} {...props}/>}/>
                    <PublicRoute
                        exact
                        path="/reset"
                        authed={this.state.isAuthenticated}
                        redirectTo="/tipsy/"
                        component={(props) => <Verify flow={"verifyReset"} {...props}/>}/>
                    <PublicRoute
                        exact
                        path="/register"
                        authed={this.state.isAuthenticated}
                        redirectTo="/tipsy/"
                        component={Register}/>
                    <Route
                        exact
                        path="/newEmail"
                        component={(props) => <Verify flow={"verifyNewEmail"} onLogout={this.props.onLogout} {...props}/>}/> 
                        
                        
                    {/* Private  */}

                    <PrivateRoute
                        exact
                        path={["/tipsy/","/tipsy/search"]}
                        authed={this.state.isAuthenticated}
                        redirectTo="/"
                        component={(props) => <SearchPage currentUser={this.state.currentUser} {...props}/>}/>
                    
                    <PrivateRoute
                        exact
                        path="/tipsy/createbar"
                        authed={this.state.isAuthenticated}
                        redirectTo="/"
                        component={(props) => <ConfigBarPage
                        isCreating={true}
                        currentUser={this.state.currentUser}
                        {...props}/>}/>
                    <PrivateRoute
                        exact
                        path="/tipsy/myBars"
                        authed={this.state.isAuthenticated}
                        redirectTo="/"
                        component={(props) => <UsersDisplaysPage type="bar" currentUser={this.state.currentUser} {...props}/>}/>
                    <PrivateRoute
                        exact
                        path="/tipsy/bar/:id/config"
                        authed={this.state.isAuthenticated}
                        redirectTo="/"
                        component={(props) => <ConfigBarPage
                        isCreating={false}
                        currentUser={this.state.currentUser}
                        {...props}/>}/>
                    <PrivateRoute
                        exact
                        path="/tipsy/bar/:id"
                        authed={this.state.isAuthenticated}
                        redirectTo="/"
                        component={(props) => <BarPage currentUser={this.state.currentUser} {...props}/>}/>
                    

                    <PrivateRoute
                        exact
                        path="/tipsy/createRecipe"
                        authed={this.state.isAuthenticated}
                        redirectTo="/"
                        component={(props) => <ConfigRecipePage
                            isCreating={true}
                            currentUser={this.state.currentUser}
                            {...props}/>}/>
                    <PrivateRoute
                        exact
                        path="/tipsy/myRecipes"
                        authed={this.state.isAuthenticated}
                        redirectTo="/"
                        component={(props) => <UsersDisplaysPage
                        type="recipe"
                        currentUser={this.state.currentUser}
                        {...props}/>}/>
                    <PrivateRoute
                        exact
                        path="/tipsy/recipe/:id/config"
                        authed={this.state.isAuthenticated}
                        redirectTo="/"
                        component={(props) => <ConfigRecipePage
                            isCreating={false}
                            currentUser={this.state.currentUser}
                            {...props}/>}/>
                    <PrivateRoute
                        exact
                        path="/tipsy/recipe/:id"
                        authed={this.state.isAuthenticated}
                        redirectTo="/"
                        component={(props) => <RecipePage currentUser={this.state.currentUser} {...props}/>}/>
                    
                    
                    <PrivateRoute
                        exact
                        path="/tipsy/barEquipment"
                        authed={this.state.isAuthenticated}
                        redirectTo="/"
                        component={(props) => <UsersDisplaysPage
                        type="equipment"
                        currentUser={this.state.currentUser}
                        {...props}/>}/>
                    <PrivateRoute
                        exact
                        path="/tipsy/equipment/:id"
                        authed={this.state.isAuthenticated}
                        redirectTo="/"
                        component={(props) => <EquipmentPage currentUser={this.state.currentUser} {...props}/>}/>
                    

                    <PrivateRoute
                        exact
                        path="/tipsy/user/:id/config"
                        authed={this.state.isAuthenticated}
                        redirectTo="/"
                        component={(props) => <ConfigUserPage currentUser={this.state.currentUser} {...props}/>}/>
                    <PrivateRoute
                        exact
                        path="/tipsy/user/stg/changePassword"
                        authed={this.state.isAuthenticated}
                        redirectTo="/"
                        component={(props) => <ChangePasswordPage currentUser={this.state.currentUser} {...props}/>}/>
                    <PrivateRoute
                        exact
                        path={["/tipsy/user/:id"]}
                        authed={this.state.isAuthenticated}
                        redirectTo="/"
                        component={(props) => <UserPage currentUser={this.state.currentUser} {...props}/>}/>
                    

                    <PrivateRoute
                        exact
                        path="/tipsy/game"
                        authed={this.state.isAuthenticated}
                        redirectTo="/"
                        component={(props) => <Game currentUser={this.state.currentUser} {...props}/>}/>

                  
                    <Route
                        path="/logout"
                        component={(props) => <Logout onLogout={this.props.onLogout} {...props}/>}/>
                    <Route path="/tipsy/error" component={ErrorPage}/>
                
                
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Routes;

const PrivateRoute = ({
    component,
    authed,
    redirectTo,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={props => {
            return authed
                ? (renderMergedProps(component, props, rest))
                : (<Redirect
                    to={{
                    pathname: redirectTo,
                    state: {
                        from: props.location
                    }
                }}/>);
        }}/>
    );
};

const PublicRoute = ({
    component,
    authed,
    redirectTo,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={routeProps => {
            return authed
                ? (<Redirect
                    to={{
                    pathname: redirectTo,
                    state: {
                        from: routeProps.location
                    }
                }}/>)
                : (renderMergedProps(component, routeProps, rest));
        }}/>
    );
};

const renderMergedProps = (component, ...rest) => {
    const theProps = Object.assign({}, ...rest);
    return React.createElement(component, theProps);
};
