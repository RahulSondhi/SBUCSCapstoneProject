import React, {Component} from 'react';
import {CustomButton, CustomCreateButton, Entry, BottleIconStyle} from '../../js/constants.js';
import Bottle from '../../assets/bottle.svg';
import Navbar from '../navbar/navbar.js';

class UsersRecipesPage extends Component {
    render() {
        return (
            <div className="grid-margin-y">
                <div className="">
                    <Navbar/>
                </div>
                <div className="grid-x">
                    <h1 className="myTitle cell caption small-12 medium-6 large-4 large-offset-4">
                        My Recipes</h1>
                    <div className="cell small-12 medium-6 large-4 createButtonHolder">
                        <CustomCreateButton redirect="/tipsy/createRecipe" name="Create A Recipe +"/>
                    </div>
                </div>

                <div className="grid-x align-center-middle">
                    <div className="tabButton">
                        <CustomButton redirect="/tipsy/myRecipes" name="Owned"/>
                    </div>
                    <div className="tabButton">
                        <CustomButton redirect="/tipsy/myRecipes" name="Completed"/>
                    </div>
                    <div className="tabButton">
                        <CustomButton redirect="/tipsy/myRecipes" name="In Progress"/>
                    </div>
                </div>
                <div className="grid-container grid-x full">
                    <div className="grid-x grid-margin-y box cell large-10 large-offset-1">
                        <Entry
                            icon={Bottle}
                            style={BottleIconStyle}
                            itemName="RecipeName"
                            ownerName="OwnerName"
                            redirect="/tipsy/myRecipes/recipe"/>
                        <Entry
                            icon={Bottle}
                            style={BottleIconStyle}
                            itemName="RecipeName"
                            ownerName="OwnerName"
                            redirect="/tipsy/myRecipes/recipe"/>
                        <Entry
                            icon={Bottle}
                            style={BottleIconStyle}
                            itemName="RecipeName"
                            ownerName="OwnerName"
                            redirect="/tipsy/myRecipes/recipe"/>
                        <Entry
                            icon={Bottle}
                            style={BottleIconStyle}
                            itemName="RecipeName"
                            ownerName="OwnerName"
                            redirect="/tipsy/myRecipes/recipe"/>
                        <Entry
                            icon={Bottle}
                            style={BottleIconStyle}
                            itemName="RecipeName"
                            ownerName="OwnerName"
                            redirect="/tipsy/myRecipes/recipe"/>
                        <Entry
                            icon={Bottle}
                            style={BottleIconStyle}
                            itemName="RecipeName"
                            ownerName="OwnerName"
                            redirect="/tipsy/myRecipes/recipe"/>
                        <Entry
                            icon={Bottle}
                            style={BottleIconStyle}
                            itemName="RecipeName"
                            ownerName="OwnerName"
                            redirect="/tipsy/myRecipes/recipe"/>
                    </div>
                    <div className="grid-x cell large-1"></div>
                </div>
            </div>
        )
    }
}

export default UsersRecipesPage;
