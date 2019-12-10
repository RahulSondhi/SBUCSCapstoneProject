import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {ItemPreview, GetProfImg} from '../../util/constants';
import {getRecipeProfile, initGame} from '../../util/APIUtils';
import ErrorPage from '../../util/errorPage.js';

import Navbar from '../navbar/navbar.js';
import { Button, Icon } from 'antd';
import { StepPreview } from '../userPages/dynamicSteps';

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
        this.play = this
            .play
            .bind(this);
    }

    play(){
        const id = this.props.match.params.id;
        initGame(id).then(response => {
            this.props.history.push({
                pathname: '/tipsy/game/' + response.message + ''
            })
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

    loadRecipeProfile(id) {
        this.setState({isLoading: true});

        getRecipeProfile(id).then(response => {

            var equipmentsAvailable = response
            .equipmentsAvailable
            .map(function (el) {
                return {
                    name: el.name,
                    img: el.img,
                    equipmentType: el.equipmentType.type
                }
            });

            var equipmentProducts = response
            .equipmentProducts
            .map(function (el) {
                return {
                    name: el.name,
                    img: el.img,
                    equipmentType: el.equipmentType.type,
                    tags: el.tags
                }
            });

            var steps = response.steps
            .map(function (el) {
                return {
                    action: el.action,
                    equipmentDoing: el.equipmentDoing,
                    equipmentProduct: el.equipmentProduct,
                    equipmentToDo: el.equipmentToDo,
                    unit: el.unit.name,
                    value: el.value
                }
            });

            var playClass;

            if(response.published === true){
                playClass = ""
            }else{
                playClass = "hidden"
            }

            this.setState({
                recipe:{
                    author: response.author,
                    description: response.description,
                    equipmentProducts: equipmentProducts,
                    equipmentsAvailable: equipmentsAvailable,
                    img: response.img,
                    name: response.name,
                    published: response.published,
                    steps: steps}, 
                isLoading: false,
                playClass: playClass
            });

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

        console.log(this.state)

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

                <div id="redirectRecipe" className="small-2 small-offset-1 cell grid-x align-center-middle">
                    <Link to={"/tipsy/recipe/"+this.props.match.params.id+"/config"} className={"small-4 cell grid-x align-center-middle "+this.state.settingClass}>
                        <GetProfImg className="small-10 cell" alt="Settings" type="settings"/>
                    </Link>
                    
                    <Link to={"/tipsy/recipe/"+this.props.match.params.id+"/clone"} className={"small-4 small-offset-2 cell grid-x align-center-middle"}>
                        <GetProfImg className="small-10 cell" alt="Clone" type="clone"/>
                    </Link>

                    <div className="cell" style={{height:'3em'}}></div>

                    <div className={"cell grid-x align-center-middle "+this.state.playClass} onClick={this.play}>
                        <GetProfImg className="small-4 cell" alt="Play" type="play"/>
                    </div>
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

                    
                    <StepPreview
                        className="small-6 cell"
                        items={this.state.recipe.steps}
                        product={this.state.recipe.equipmentProducts}
                        equipment={this.state.recipe.equipmentsAvailable}/>
                    
                </div>
            </div>
        )
    }
}

export default RecipePage;
