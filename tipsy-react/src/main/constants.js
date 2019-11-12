import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import UserPic from '../assets/user.svg';

export const CustomButton = (props) => {
    return (
        <div>
            <Link to={props.redirect}>
                <button type="submit" className="button">
                    {props.name}
                </button>
            </Link>
        </div>
    )
}

export const CustomCreateButton = (props) => {
    return (
        <div>
            <Link to={props.redirect}>
                <button type="submit" className="createButton">
                    {props.name}
                </button>
            </Link>
        </div>
    )
}

export const Entry = (props) => {
    return (
        <div className="small-12 medium-6 large-3 entryDiv">
            <Link to={props.redirect}>
                <button type="submit" className="entry">
                    <br/>
                    <h3 style={props.titleStyle}>
                        {props.itemName}
                    </h3>
                    <img src={props.icon} style={props.style} id={props.id} alt={props.alt}/>
                    <br/>

                    <p className={props.textClass}>{props.ownerName}</p>
                </button>
            </Link>
        </div>
    )
}

export const SVG = (props) => {
    return (<img src={props.src} style={props.style} alt={props.alt}/>);
}

export const DrinksStyle = {
    width: "50%",
    height: "50%",
    "marginLeft": "auto",
    "marginRight": "auto",
    "display": "block"
}

export const CupBottleStyle = {
    width: "50em",
    height: "50em"
}

export const TipsyStyle = {
    width: "100%",
    height: "100%"
}

export const SmallTipsyStyle = {
    width: "12%",
    height: "12%"
}

export const CounterStyle = {
    height: "20em"
}

export const IngredientStyle = {
    height: "6em",
    margin: "0.5em"
}

export const ToolStyle = {
    width: "70%",
    height: "70%",
    "marginLeft": "auto",
    "marginRight": "auto",
    "marginTop": "auto",
    "display": "block"
}

export const BottleIconStyle = {
    width: "50%",
    height: "50%"
}

export const ProfileIconStyle = {
    width: "8%",
    height: "8%"
}

export const TitleStyle = {
    width: "80%",
    height: "20%"
}

// Neccessary Data

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
export const ACCESS_TOKEN = 'accessToken';

export const FIRSTNAME_MIN_LENGTH = 2;
export const FIRSTNAME_MAX_LENGTH = 50;

export const LASTNAME_MIN_LENGTH = 2;
export const LASTNAME_MAX_LENGTH = 50;

export const EMAIL_MAX_LENGTH = 62;

export const NICKNAME_MIN_LENGTH = 4;
export const NICKNAME_MAX_LENGTH = 32;

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 256;

export default SVG;

// Preview Components

export const GetBars = ({bars, className}) => (
    <Fragment>
        {bars.map(bar => (
           <GetBarPreview bar={bar} className={className}/>
        ))}
    </Fragment>
);

export const GetRecipes = ({recipes, className}) => (
    <Fragment>
        {recipes.map(recipe => (
            <GetRecipePreview recipe={recipe} className={className}/>
        ))}
    </Fragment>
);

class GetBarPreview extends Component {

    constructor(props) {
        super(props);

        this.bar = this.props.bar;
        this.className = this.props.className;
    }

    render() {

        if (this.bar.img === null || this.bar.img === "") {
            this.bar.img = UserPic
        }else{
            this.bar.img = "data:image/png;base64, " + this.props.bar.img
        }

        return (
            <Link to={"/tipsy/bar/" + this.bar.id} className={this.className} key={this.bar.id}>
                <div className="small-4 grid-x cell">
                    <img
                        src={this.bar.img}
                        className="small-10 cell"
                        alt={this.bar.name}></img>
                </div>
                <div className="small-8 grid-x cell">
                    <div className="userPageBarPreviewName cell">{this.bar.name}</div>
                    <div className="userPageBarPreviewOwner cell">Owner:
                        <span>{" "+this.bar.owner}</span>
                    </div>
                </div>
            </Link>
        )
    }
};

class GetRecipePreview extends Component {

    constructor(props) {
        super(props);


        this.recipe = this.props.recipe;
        this.className = this.props.className;
    }

    render() {

        if (this.recipe.img === null || this.recipe.img === "") {
            this.recipe.img = UserPic
        }else{
            this.recipe.img = "data:image/png;base64, " + this.props.recipe.img
        }

        return (
            <Link to={"/tipsy/recipe/ " + this.recipe.id} className={this.className} key={this.recipe.id}>
            <div className="small-4 grid-x cell">
                <img
                    src={this.recipe.img}
                    className="small-10 cell"
                    alt={this.recipe.name}></img>
            </div>
            <div className="small-8 grid-x cell">
                <div className="userPageRecipePreviewName cell">{this.recipe.name}</div>
                <div className="userPageRecipePreviewOwner cell">Author:
                    <span>{" "+this.recipe.author}</span>
                </div>
            </div>
        </Link>
        )
    }
};