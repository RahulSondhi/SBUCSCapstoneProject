import React, {Component} from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import '../foundation/foundation.min.css';
import Login from '../auth/login/login.js';
import Search from '../tipsy/search/search.js';
import Register from '../auth/register/register.js';
import MyBars from '../tipsy/user/mybars/mybar.js';
import MyRecipes from '../tipsy/user/myrecipes/myrecipe.js';
import Admin from '../tipsy/admin/admin.js';

class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/tipsy/search" component={Search}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/tipsy/myBars" component={MyBars} className="tab"/>
                    <Route path="/tipsy/myRecipes" component={MyRecipes} className="tab"/>
                    <Route path="/tipsy/admin" component={Admin} className="tab"/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Main;