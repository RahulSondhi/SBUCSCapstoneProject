import React, {Component} from 'react';
import Tabs from '../../search/tabs.js';
import '../../menu/menu.css';
import './myrecipe.css'
import {CustomButton, EntryTwoFields, BottleIconStyle} from '../../../constants/constants.js';
import Bottle from '../../../assets/bottle.svg';

class MyRecipes extends Component {
    render() {
        return (
            <div>
                <Tabs/>
                <h1 className="myTitle">
                    My Recipes</h1>
                <div className="grid-x">
                    <div className="cell small-2"></div>
                    <div className="grid-x cell small-6">
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
                    <div className="cell small-4 createButton">
                        <CustomButton redirect="/tipsy/createRecipe" name="Create A Recipe +"/>
                    </div>
                </div>
                <div className="grid-x grid-margin-y box">
                    <EntryTwoFields
                        icon={Bottle}
                        style={BottleIconStyle}
                        itemName="RecipeName"
                        ownerName="OwnerName"
                        redirect="/tipsy/myRecipes/recipe"/>
                    <EntryTwoFields
                        icon={Bottle}
                        style={BottleIconStyle}
                        itemName="RecipeName"
                        ownerName="OwnerName"
                        redirect="/tipsy/myRecipes/recipe"/>
                    <EntryTwoFields
                        icon={Bottle}
                        style={BottleIconStyle}
                        itemName="RecipeName"
                        ownerName="OwnerName"
                        redirect="/tipsy/myRecipes/recipe"/>
                    <EntryTwoFields
                        icon={Bottle}
                        style={BottleIconStyle}
                        itemName="RecipeName"
                        ownerName="OwnerName"
                        redirect="/tipsy/myRecipes/recipe"/>
                    <EntryTwoFields
                        icon={Bottle}
                        style={BottleIconStyle}
                        itemName="RecipeName"
                        ownerName="OwnerName"
                        redirect="/tipsy/myRecipes/recipe"/>
                    <EntryTwoFields
                        icon={Bottle}
                        style={BottleIconStyle}
                        itemName="RecipeName"
                        ownerName="OwnerName"
                        redirect="/tipsy/myRecipes/recipe"/>
                    <EntryTwoFields
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
