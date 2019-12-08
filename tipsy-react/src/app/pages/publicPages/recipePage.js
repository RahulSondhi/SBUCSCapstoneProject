import React, {Component} from 'react';
import {Redirect, NavLink} from 'react-router-dom';

import {ItemPreview, GetProfImg} from '../../util/constants';
import {getRecipeProfile} from '../../util/APIUtils';
import ErrorPage from '../../util/errorPage.js';

import Navbar from '../navbar/navbar.js';
import {Tabs} from 'antd';

const {TabPane} = Tabs;

class RecipePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipe: null,
            isLoading: true,
            settingClass: "hidden"
        }
        this.loadRecipeProfile = this
            .loadRecipeProfile
            .bind(this);
    }

    loadRecipeProfile(id) {
        this.setState({isLoading: true});

        getRecipeProfile(id).then(response => {
            this.setState({recipe: response, isLoading: false});

            if(
                this.props.currentUser.name === response.author.name ||
                this.props.currentUser.roles.includes("ADMIN")
            ){
                this.setState({
                    settingClass : " "
                });
            }

        }).catch(error => {
            this.setState({
                error:{
                    status: error.status,
                    message: error.message, 
                },
                isLoading: false
            });
        });
    }

    componentDidMount() {
        let try_name = this.props.match.params.id;
        const id = try_name;
        this.loadRecipeProfile(id);
    }

    componentDidUpdate(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.loadRecipeProfile(nextProps.match.params.id);
        }
    }
    render() {

        // Checking if data came in
        if (this.state.isLoading) {
            return null
        }

        // Checking response
        if (this.state.error) {
            return <ErrorPage
            status ={this.state.error.status}
            message = {this.state.error.message.message}
            history = {this.props.history}
            />
        }

        return (
            <div className="grid-x align-center-middle">
                <Navbar/>
                
                <div className="small-6 small-offset-3 grid-x align-center-middle cell">
                    <GetProfImg
                        className="small-3 cell"
                        pic={this.state.recipe.img}
                        alt={this.state.recipe.name}
                        type="recipe"/>
                </div>

                <div id="redirectRecipe" className="small-1 small-offset-2 cell grid-x align-center-middle">
                    <NavLink to={"/tipsy/recipe/"+this.props.match.params.id+"/config"} className={"cell grid-x align-center-middle "+this.state.settingClass}>
                        <GetProfImg className="small-3 cell" alt="Settings" type="settings"/>
                    </NavLink>
                    <div className="cell" style={{height:'3em'}}></div>
                    <NavLink to={"/tipsy/recipe/"+this.props.match.params.id+"/clone"} className={"cell grid-x align-center-middle"}>
                        <GetProfImg className="small-3 cell" alt="Clone" type="clone"/>
                    </NavLink>
                </div>

                <h1 id="recipePageTitle" className="caption small-10 cell">{this.state.recipe.name}</h1>

                <div className="small-12 medium-4 grid-x align-center-middle cell">

                    <h1 className="caption small-10 cell">Author:</h1>
                    <ItemPreview className="small-8 cell" items={[this.state.recipe.author]} type="user"/>

                    <h1 className="barPageDescTitle captionRed small-10 cell">Desc</h1>
                    <div className="small-10 grid-x grid-margin-x align-center-middle cell">
                        {this.state.recipe.description}
                    </div>
                </div>

                <div
                    id="rightBarSide"
                    className="small-12 medium-8 grid-x align-center-middle cell">
                    <h1 id="userPageBarTitle" className="captionRed small-10 cell">Steps</h1>
                    
                </div>
            </div>
        )
    }
}

export default RecipePage;
