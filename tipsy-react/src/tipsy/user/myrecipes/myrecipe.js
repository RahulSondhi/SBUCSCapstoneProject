import React, {Component} from 'react';
import Tabs from '../../search/tabs.js';
import '../../menu/menu.css';
import './myrecipe.css'
import {CustomButton, CustomCreateButton, Entry, BottleIconStyle} from '../../../js/constants.js';
import Bottle from '../../../assets/bottle.svg';

class MyRecipes extends Component {
    render() {
        return (
            <div className="grid-margin-y">
                    <div className="">
                        <Tabs/>
                    </div>
                <div className="grid-x">
                    <h1 className="myTitle caption small-4 large-offset-4">
                        My Recipes</h1>
                    <div className="cell small-4 createButtonHolder">
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
                <div className="grid-x grid-margin-y box">
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
            </div>
        )
    }
}

export default MyRecipes;
