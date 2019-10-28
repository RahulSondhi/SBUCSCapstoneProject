import React, {Component} from 'react';
import Tabs from '../../search/tabs.js';
import '../../menu/menu.css';
import './myrecipe.css'
import {CustomButton, RecipeEntry} from '../../../constants/constants.js';

class MyRecipes extends Component {
    render() {
        return (
            <div>
                <Tabs/>
                <h1 className="myRecipe">
                    My Recipes</h1>
                <div id="createABar">
                    <CustomButton redirect="/tipsy/createRecipe" name="Create a Recipe"/>
                </div>
                <div className="grid-x grid-margin-y box">
                    <RecipeEntry/>
                    <RecipeEntry/>
                    <RecipeEntry/>
                    <RecipeEntry/>
                    <RecipeEntry/>
                </div>
            </div>
        )
    }
}

export default MyRecipes;
