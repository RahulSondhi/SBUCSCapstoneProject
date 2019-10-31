import React, {Component} from 'react';
import GameTab from '../search/gameTab.js';
import { SVG, CounterStyle, IngredientStyle } from '../../constants/constants.js';
import Counter from '../../assets/counter.svg';
import Bottle from '../../assets/bottle.svg';
import './game.css';

class Game extends Component {
    render() {
        return (
          <div>
              <GameTab/>
              <h3>
                  Instructions
              </h3>
                <div className="ingredients">
                  <p>Ingredients</p>
                  <div className="ing">
                    <SVG src={Bottle} style={IngredientStyle} alt="Ingredient"/>
                    <SVG src={Bottle} style={IngredientStyle} alt="Ingredient"/>
                    <SVG src={Bottle} style={IngredientStyle} alt="Ingredient"/>
                    <SVG src={Bottle} style={IngredientStyle} alt="Ingredient"/>
                  </div>
                </div>
                <div className="tools">
                  <p>Tools</p>
                  <div className="ing">
                    <SVG src={Bottle} style={IngredientStyle} alt="Ingredient"/>
                    <SVG src={Bottle} style={IngredientStyle} alt="Ingredient"/>
                    <SVG src={Bottle} style={IngredientStyle} alt="Ingredient"/>
                    <SVG src={Bottle} style={IngredientStyle} alt="Ingredient"/>
                  </div>

              </div>
              <div className="counter">
              <SVG src={Counter} style={CounterStyle} alt="Counter"/>
              </div>
          </div>
        )
    }
}

export default Game;
