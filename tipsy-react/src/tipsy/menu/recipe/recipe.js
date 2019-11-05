import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Tabs from '../../search/tabs';
import './recipe.css';
import {CustomCreateButton} from '../../../js/constants.js';

class Recipe extends Component {
    render() {
        return (
            <div className="grid-margin-y grid-container-fluid">
                <Tabs/>
                <div className="grid-x cell">
                    <div className="grid-y cell small-4 large-offset-4">
                        <h1 className="cell small-6 caption">
                            RecipeName
                        </h1>
                        <h3 className="cell small-6">Author: Name
                        </h3>
                    </div>
                    <div className="cell small-3">
                        <CustomCreateButton redirect="/tipsy/game" name="Play"/>
                    </div>
                </div>
                <div className="grid-x grid-margin-x boxContainer">
                    <div className="cell small-6">
                        <h2>
                            Ingredients
                        </h2>
                        <div className="recipeBox">
                            <p>IngredientName1</p>
                            <p>IngredientName2</p>
                        </div>
                    </div>
                    <div className="cell small-6">
                        <h2>
                            Equipment</h2>
                        <div className="recipeBox">
                            <Link to="/tipsy/barGears/gear" className="userBoxEntry">GearName1</Link>
                            <Link to="/tipsy/barGears/gear" className="userBoxEntry">GearName2</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Recipe;
