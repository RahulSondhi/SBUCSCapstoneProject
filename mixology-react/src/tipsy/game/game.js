import React, {Component} from 'react';
import GameTab from '../search/gameTab.js';
import { SVG, CounterStyle, CustomButton } from '../../constants/constants.js';
import Counter from '../../assets/counter.svg';
import './game.css';

class Game extends Component {
    render() {
        return (
          <div>
              <GameTab/>
              <h1>
                  BarName
              </h1>
              <div className="counter">
              <SVG src={Counter} style={CounterStyle} alt="Counter"/>
              </div>
          </div>
        )
    }
}

export default Game;
