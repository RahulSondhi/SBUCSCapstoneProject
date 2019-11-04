import React, {Component} from 'react';
import Tabs from '../../tipsy/search/tabs.js';
import './user.css';
import { SVG, ProfileIconStyle} from '../../js/constants.js';
import UserPic from '../../assets/user.svg';

class User extends Component {
    render() {
        return (
          <div className="grid-margin-y">
              <Tabs/>
              <h1 className="caption">UserName</h1>
              <SVG src={UserPic} style={ProfileIconStyle}/>

              <div className="grid-x grid-margin-x boxContainer">
                  <div className="cell small-4">
                  <h3> Bars </h3>
                  <div className="userBox">
                      <p>BarName1</p>
                      <p>BarName2</p>
                  </div>
                  </div>
                  <div className="cell small-4">
                      <h3> Recipes</h3>
                      <div className="userBox">
                      <p>RecipeName1</p>
                      <p>RecipeName2</p>
                      </div>
                  </div>
                  <div className="cell small-4">
                      <h3> Equipment</h3>
                      <div className="userBox">
                      <p>EquipmentName1</p>
                      <p>EquipmentName2</p>
                      </div>
                  </div>
              </div>
          </div>
        )
    }
}

export default User;
