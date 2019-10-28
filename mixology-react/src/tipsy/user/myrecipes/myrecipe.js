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
                <h1 className="myTitle">
                    My Recipes</h1>
                <div className="grid-x">
                    <div className="cell small-2"></div>
                    <div className="grid-x cell small-6">
                        <CustomButton redirect="/tipsy/myRecipes" name="Owned"/>
                        <CustomButton redirect="/tipsy/myRecipes" name="Completed"/>
                        <CustomButton redirect="/tipsy/myRecipes" name="In Progress"/>
                    </div>
                    <div className="cell small-4">
                        <CustomButton redirect="/tipsy/createRecipe" name="Create A Recipe +"/>
                    </div>
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
