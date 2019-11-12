import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

import UserPic from '../assets/defaultIcons/user.svg';
import BarPic from '../assets/defaultIcons/user.svg';
import RecipePic from '../assets/defaultIcons/user.svg';

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

export const SVG = (props) => {
    return (<img src={props.src} style={props.style} alt={props.alt}/>);
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

// Profile Components

export class GetProfImg extends Component {

    constructor(props) {
        super(props);

        this.image = this.props.pic;
        this.type = this.props.type;
        this.className = this.props.className;
        this.alt = this.props.alt;
    }

    render() {

        if (this.image === null || this.image === "") {
            if (this.type == "bar") {
                this.image = BarPic
            } else if (this.type == "recipe") {
                this.image = RecipePic
            } else if (this.type == "user") {
                this.image = UserPic
            } else {
                this.image = UserPic
            }
        }else{
            this.image = "data:image/png;base64, " + this.props.pic
        }

        return (<img src={this.image} className={this.className} alt={this.alt}/>)
    }
};

// Preview Components

export const BarsPreview = ({bars, className}) => (
    <Fragment>
        {bars.map(bar => (<GetBar
            bar={bar}
            className={"previewBar grid-x align-center-middle " + className}/>))}
    </Fragment>
);

export const RecipesPreview = ({recipes, className}) => (
    <Fragment>
        {recipes.map(recipe => (<GetRecipe
            recipe={recipe}
            className={"previewRecipe grid-x align-center-middle " + className}/>))}
    </Fragment>
);

export const UsersPreview = ({users, className}) => (
    <Fragment>
        {users.map(user => (<GetUser
            user={user}
            className={"previewUser grid-x align-center-middle " + className}/>))}
    </Fragment>
);

class GetBar extends Component {

    constructor(props) {
        super(props);

        this.bar = this.props.bar;
        this.className = this.props.className;
    }

    render() {
        return (
            <Link
                to={"/tipsy/bar/" + this.bar.id}
                className={this.className}
                key={this.bar.id}>
                <div className="small-4 grid-x cell">
                    <GetProfImg
                        className="small-10 cell"
                        pic={this.bar.img}
                        alt={this.bar.name}/>
                </div>
                <div className="small-8 grid-x cell">
                    <div className="previewBarName cell">{this.bar.name}</div>
                    <div className="previewBarOwner cell">Owner:
                        <span>{" " + this.bar.owner}</span>
                    </div>
                </div>
            </Link>
        )
    }
};

class GetRecipe extends Component {

    constructor(props) {
        super(props);

        this.recipe = this.props.recipe;
        this.className = this.props.className;
    }

    render() {
        return (
            <Link
                to={"/tipsy/recipe/" + this.recipe.id}
                className={this.className}
                key={this.recipe.id}>
                <div className="small-4 grid-x cell">
                <GetProfImg
                        className="small-10 cell"
                        pic={this.recipe.img}
                        alt={this.recipe.name}/>
                </div>
                <div className="small-8 grid-x cell">
                    <div className="previewRecipeName cell">{this.recipe.name}</div>
                    <div className="previewRecipeAuthor cell">Author:
                        <span>{" " + this.recipe.author}</span>
                    </div>
                </div>
            </Link>
        )
    }
};

class GetUser extends Component {

    constructor(props) {
        super(props);

        this.user = this.props.user;
        this.className = this.props.className;
    }

    render() {
        return (
            <Link
                to={"/tipsy/user/" + this.user.nickname}
                className={this.className}
                key={this.user.nickname}>
                <div className="small-4 grid-x cell">
                <GetProfImg
                        className="small-10 cell"
                        pic={this.user.img}
                        alt={this.user.nickname}/>
                </div>
                <div className="small-8 grid-x cell">
                    <div className="previewRecipeName cell">{this.user.nickname}</div>
                </div>
            </Link>
        )
    }
};