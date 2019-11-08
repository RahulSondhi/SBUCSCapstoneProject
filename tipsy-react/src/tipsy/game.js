import React, {Component} from 'react';
import GameNavbar from './navbar/gameNavbar.js';
import { SVG, CounterStyle, IngredientStyle } from '../js/constants.js';
import Counter from '../assets/counter.svg';
import Bottle from '../assets/bottle.svg';

class Game extends Component {
    render() {
        return (
          <div>
              <GameNavbar/>
              <h3>
                  Instructions
              </h3>
                <div className="ingredients">
                  <p>Ingredients</p>
                  <div className="ing">
                    <div className="ingName">
                        <SVG src={Bottle} style={IngredientStyle} alt="Ingredient"/>
                        <p>name</p>
                    </div>
                    <div className="ingName">
                        <SVG src={Bottle} style={IngredientStyle} alt="Ingredient"/>
                        <p>name</p>
                    </div>
                    <div className="ingName">
                        <SVG src={Bottle} style={IngredientStyle} alt="Ingredient"/>
                        <p>name</p>
                    </div>
                    <div className="ingName">
                        <SVG src={Bottle} style={IngredientStyle} alt="Ingredient"/>
                        <p>name</p>
                    </div>
                  </div>
                </div>
                <div className="tools">
                  <p>Tools</p>
                  <div className="ing">
                    <div className="ingName">
                        <SVG src={Bottle} style={IngredientStyle} alt="Ingredient"/>
                        <p>name</p>
                    </div>
                    <div className="ingName">
                        <SVG src={Bottle} style={IngredientStyle} alt="Ingredient"/>
                        <p>name</p>
                    </div>
                    <div className="ingName">
                        <SVG src={Bottle} style={IngredientStyle} alt="Ingredient"/>
                        <p>name</p>
                    </div>
                    <div className="ingName">
                        <SVG src={Bottle} style={IngredientStyle} alt="Ingredient"/>
                        <p>name</p>
                    </div>
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
