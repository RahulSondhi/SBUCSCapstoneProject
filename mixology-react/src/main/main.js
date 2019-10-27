import React, {Component} from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import '../foundation/foundation.min.css';
import Login from '../auth/login/login.js';
import Search from '../tipsy/search/search.js';
import Register from '../auth/register/register.js';
import Bar from '../tipsy/menu/bar/bar.js';
import Recipe from '../tipsy/menu/recipe/recipe.js';
import Admin from '../tipsy/admin/admin.js';

class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/search" component={Search}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/bar" component={Bar} className="tab"/>
                    <Route path="/recipe" component={Recipe} className="tab"/>
                    <Route path="/admin" component={Admin} className="tab"/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Main;