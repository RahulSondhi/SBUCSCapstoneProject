import React, {Component} from 'react';
import Tabs from '../../search/tabs';
import './recipe.css';
import { CustomButton } from '../../../constants/constants.js';


class Recipe extends Component {
    render() {
        this.props.checkAuthenticated();
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
                        <h2>
                            Ingredients
                        </h2>
                        <div className="viewBox">
                            <p>IngredientName1</p>
                            <p>IngredientName2</p>
                        </div>
                    </div>
                    <div className="cell small-6">
                        <h2>
                            Equipment</h2>
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
