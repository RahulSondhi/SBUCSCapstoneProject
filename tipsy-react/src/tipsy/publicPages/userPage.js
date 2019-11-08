import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {SVG, ProfileIconStyle} from '../../js/constants.js';
import UserPic from '../../assets/user.svg';
import Navbar from '../navbar/navbar.js';

class UserPage extends Component {
    render() {
        return (
            <div className="grid-margin-y">
                <Navbar/>
                <h1 className="caption">UserName</h1>
                <SVG src={UserPic} style={ProfileIconStyle}/>

                <div className="grid-x grid-margin-x boxContainer">
                    <div className="cell small-4">
                        <h4>
                            Bars
                        </h4>
                        <div className="userBox">
                            <Link to="/tipsy/myBars/bar" className="userBoxEntry">BarName1</Link>
                            <Link to="/tipsy/myBars/bar" className="userBoxEntry">BarName2</Link>
                        </div>
                    </div>
                    <div className="cell small-4">
                        <h4>
                            Recipes</h4>
                        <div className="userBox">
                            <Link to="/tipsy/myRecipes/recipe" className="userBoxEntry">RecipeName1</Link>
                            <Link to="/tipsy/myRecipes/recipe" className="userBoxEntry">RecipeName2</Link>
                        </div>
                    </div>
                    <div className="cell small-4">
                        <h4>
                            Equipment</h4>
                        <div className="userBox">
                            <Link to="/tipsy/barGears/gear" className="userBoxEntry">GearName1</Link>
                            <Link to="/tipsy/barGears/gear" className="userBoxEntry">GearName2</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserPage;
