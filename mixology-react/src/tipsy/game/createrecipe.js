import React, {Component} from 'react';
import Tabs from '../search/tabs.js';
import {LargeButton, IngredientStyle, SVG} from '../../constants/constants.js';
import {Input} from 'antd';
import {Link} from 'react-router-dom';
import Bottle from '../../assets/bottle.svg';
import './createrecipe.css';

class CreateRecipe extends Component {
    render() {
        return (
            <div>
                <Tabs/>
                <div className="grid-x">
                    <div className="cell small-4"></div>
                    <div className="grid-y cell small-4">
                        <h1 className="cell small-6">
                            Create/Edit Your Recipe
                        </h1>
                        <div className="cell small-6">
                            <Input
                                id="barName"
                                size="large"
                                name="barName"
                                type="barName"
                                placeholder="Enter Recipe Name"/>
                        </div>
                    </div>
                    <div className="cell small-4">
                        <LargeButton redirect="/tipsy/myBars/bar" name="Create Recipe+"/>
                    </div>
                </div>
                <div className="grid-x grid-margin-x containerBox">
                    <div className="ingredientsBox cell small-4">
                        <h3>
                            Ingredients
                        </h3>
                        <div className="grid-x ing">
                            <SVG src={Bottle} style={IngredientStyle} alt="Ingredient"/>
                            <SVG src={Bottle} style={IngredientStyle} alt="Ingredient"/>
                            <SVG src={Bottle} style={IngredientStyle} alt="Ingredient"/>
                            <SVG src={Bottle} style={IngredientStyle} alt="Ingredient"/>
                        </div>
                    </div>
                    <div className="grid-y grid-margin-y cell small-8">
                        <div className="cell small-1">
                            <h3>
                                Actions
                            </h3>
                        </div>
                        <div className="actionBox cell small-4">
                            <div className="grid-x actionContainer">
                                <div className="cell small-4">
                                    <SVG src={Bottle} style={IngredientStyle} alt="Ingredient"/>
                                </div>
                                <div className="cell small-4">
                                    <select className="button">
                                        <option value="stir">Stir</option>
                                        <option value="shake">Shake</option>
                                        <option value="mix">Mix</option>
                                        <option value="blend">Blend</option>
                                    </select>
                                </div>
                                <div className="cell small-4">
                                    <SVG src={Bottle} style={IngredientStyle} alt="Ingredient"/>
                                </div>
                            </div>
                        </div>
                        <div class="cell">
                            <Link to="/tipsy/myRecipes/addSteps">
                                <button type="submit" className="button addStepsButton">
                                    Add Steps
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default CreateRecipe;
