import React, {Component} from 'react';
import Tabs from '../../search/tabs';
import {CustomButton} from '../../../constants/constants';
import './recipe.css';

class Recipe extends Component {
    render() {
        return (
            <div>
                <Tabs/>
                <h1>
                    RecipeName
                </h1>
                <h3>Author: Name
                </h3>
                <CustomButton redirect="/tipsy/game" name="Play"/>
                <div className="grid-x grid-margin-x boxContainer">
                    <div className="cell small-6">
                    <h3> Ingredients </h3>
                    <div className="viewBox">
                        <p>IngredientName1</p>
                        <p>IngredientName2</p>
                    </div>
                    </div>
                    <div className="cell small-6">
                        <h3> Equipment</h3>
                        <div className="viewBox">
                        <p>EquipmentName1</p>
                        <p>EquipmentName2</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Recipe;
