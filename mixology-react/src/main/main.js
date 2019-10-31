import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import '../foundation/foundation.min.css';
import Login from '../auth/login/login.js';
import Search from '../tipsy/search/search.js';
import Register from '../auth/register/register.js';
import MyBars from '../tipsy/user/mybars/mybar.js';
import MyRecipes from '../tipsy/user/myrecipes/myrecipe.js';
import Admin from '../tipsy/admin/admin.js';
import Forgot from '../auth/forgot/forgot.js';
import Confirm from '../auth/confirm/confirm.js';
import Reset from '../auth/reset/reset.js';
import Recipe from '../tipsy/menu/recipe/recipe';
import Bar from '../tipsy/menu/bar/bar';
import User from '../tipsy/user/user.js';
import Game from '../tipsy/game/game';
import CreateBar from '../tipsy/user/createbar/createbar'
import CreateRecipe from '../tipsy/user/createrecipe/createrecipe';
import BarGears from '../tipsy/user/bargears/bargears';
import Gear from '../tipsy/menu/gear/gear';

import history from './history.js';
import {getCurrentUser} from '../util/APIUtils.js';
import {ACCESS_TOKEN} from '../constants/constants.js';
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
        localStorage.removeItem(ACCESS_TOKEN);

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

    checkAuthenticated() {
        if (this.currentUser == null) {
            history.push("/login");
            window.location.reload();
        }
    }

    render() {
        return (
            <Router history={history}>
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

                    <Route path="/tipsy/search" render={(props) => <Search checkAuthenticated={this.checkAuthenticated} {...props}/>}/>
                    <Route path="/tipsy/myBars" exact render={(props) => <MyBars checkAuthenticated={this.checkAuthenticated} {...props}/>} className="tab"/>
                    <Route path="/tipsy/myBars/bar" render={(props) => <Bar checkAuthenticated={this.checkAuthenticated} {...props}/>}/>
                    <Route path="/tipsy/myRecipes" exact render={(props) => <MyRecipes checkAuthenticated={this.checkAuthenticated} {...props}/>} className="tab"/>
                    <Route path="/tipsy/myRecipes/recipe" render={(props) => <Recipe checkAuthenticated={this.checkAuthenticated} {...props}/>}/>
                    <Route path="/tipsy/barGears" exact render={(props) => <BarGears checkAuthenticated={this.checkAuthenticated} {...props}/>} className="tab"/>
                    <Route path="/tipsy/barGears/gear" render={(props) => <Gear checkAuthenticated={this.checkAuthenticated} {...props}/>}/>
                    <Route path="/tipsy/admin" exact render={(props) => <Admin checkAuthenticated={this.checkAuthenticated} {...props}/>} className="tab"/>
                    <Route path="/tipsy/admin/user" render={(props) => <User checkAuthenticated={this.checkAuthenticated} {...props}/>}/>
                    <Route path="/tipsy/game" render={(props) => <Game checkAuthenticated={this.checkAuthenticated} {...props}/>}/>
                    <Route path="/tipsy/createbar" render={(props) => <CreateBar checkAuthenticated={this.checkAuthenticated} {...props}/>}/>
                    <Route path="/tipsy/createRecipe" render={(props) => <CreateRecipe checkAuthenticated={this.checkAuthenticated} {...props}/>}/>
                </Switch>
            </Router>
        )
    }
}

export default Main;
