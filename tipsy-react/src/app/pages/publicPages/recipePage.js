import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {ItemPreview, GetProfImg, LINK_BASE} from '../../util/constants';
import {getRecipeProfile, initGame} from '../../util/APIUtils';
import ErrorPage from '../../util/errorPage.js';

import Navbar from '../navbar/navbar.js';
import {StepPreview} from '../userPages/dynamicSteps';

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

    play() {
        const id = this.props.match.params.id;
        initGame(id).then(response => {
            this
                .props
                .history
                .push({
                    pathname: LINK_BASE+'/app/game/' + response.message + ''
                })
        }).catch(error => {
            this.setState({
                error: {
                    status: error.status,
                    message: error.message
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
                    return {name: el.name, img: el.img, equipmentType: el.equipmentType.type}
                });

            var equipmentProducts = response
                .equipmentProducts
                .map(function (el) {
                    return {name: el.name, img: el.img, equipmentType: el.equipmentType.type, tags: el.tags}
                });

            var steps = response
                .steps
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

            if (response.published === true) {
                playClass = ""
            } else {
                playClass = "hidden"
            }

            this.setState({
                recipe: {
                    author: response.author,
                    description: response.description,
                    equipmentProducts: equipmentProducts,
                    equipmentsAvailable: equipmentsAvailable,
                    img: response.img,
                    name: response.name,
                    published: response.published,
                    steps: steps
                },
                isLoading: false,
                playClass: playClass
            });

            if (this.props.currentUser.name === response.author.name || this.props.currentUser.roles.includes("ADMIN")) {
                this.setState({settingClass: " "});
            }

        }).catch(error => {
            this.setState({
                error: {
                    status: error.status,
                    message: error.message
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
                status
                ={this.state.error.status}
                message={this.state.error.message.message}
                history={this.props.history}/>
        }

        return (
            <div className="grid-x grid-x-margin align-center-middle pageContainer">
                <Navbar/>

                <div className="grid-x align-center align-top cell page">

                    <div className="small-2 grid-x grid-margin-x align-center-middle cell publicOwnerInfo">
                        <ItemPreview
                            className="small-9 cell"
                            items={[this.state.recipe.author]}
                            type="user"/>
                        <h1 className="caption cell">Author</h1>
                    </div>

                    <div className="small-6 small-offset-1 grid-x align-center-middle cell publicProfImg">
                        <GetProfImg
                            className="small-2 cell"
                            pic={this.state.recipe.img}
                            alt={this.state.recipe.name}
                            type="recipe"/>
                        <h1 id="recipePageTitle" className="caption cell">{this.state.recipe.name}</h1>
                    </div>

                    <div
                        id="redirectRecipe"
                        className="small-2 small-offset-1 cell grid-x align-center-middle"
                        style={{marginTop: "1%"}}>
                        <Link
                            to={"/app/recipe/" + this.props.match.params.id + "/config"}
                            className={"small-4 cell grid-x align-center-middle " + this.state.settingClass}>
                            <GetProfImg className="small-10 cell" alt="Settings" type="settings"/>
                        </Link>

                        <Link
                            to={"/app/recipe/" + this.props.match.params.id + "/clone"}
                            className={"small-4 small-offset-2 cell grid-x align-center-middle"}>
                            <GetProfImg className="small-10 cell" alt="Clone" type="clone"/>
                        </Link>

                        <div
                            className="cell"
                            style={{
                            height: '3em'
                        }}></div>

                        <div
                            className={"cell grid-x align-center-middle " + this.state.playClass}
                            onClick={this.play}>
                            <GetProfImg className="small-4 cell" alt="Play" type="play"/>
                        </div>
                    </div>

                    <div className="small-12 medium-4 grid-x align-self-top cell leftPublicSide">

                        <div className="small-10 grid-x grid-margin-x align-center-middle align-self-top cell">
                            <h1 className="publicPageDescTitle captionRed small-10 cell">Description</h1>
                            <p className="cell">{this.state.recipe.description}</p>
                        </div>

                    </div>

                    <div className="small-12 medium-8 grid-x align-self-top align-center cell rightPublicSide">
                        <h1 id="userPageBarTitle" className="captionRed small-11 cell">Steps</h1>
                        <div className="small-11 cell align-center">
                            <StepPreview
                                className="cell"
                                items={this.state.recipe.steps}
                                product={this.state.recipe.equipmentProducts}
                                equipment={this.state.recipe.equipmentsAvailable}/>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default RecipePage;
