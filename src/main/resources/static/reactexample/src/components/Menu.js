import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { BarMenu, RecipeMenu, AccountMenu, LoginMenu } from './MenuPages';
import Tabs from './Tabs';
import '../css/menu.css';

class Menu extends Component {
    render() {
        return (
            <BrowserRouter>
                <Tabs/>
                <Switch>
                    <Route path="/bar" component={BarMenu} className="tab"/>
                    <Route path="/recipe" component={RecipeMenu} className="tab"/>
                    <Route path="/account" component={AccountMenu} className="tab"/>
                    <Route path="/login" component={LoginMenu} className="tab"/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Menu;