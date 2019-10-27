import React from 'react';
import {Link} from 'react-router-dom';
import {login} from '../util/APIUtils.js';

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

export const LoginButton = (props) => {
    return (
        <div>
            <button type="submit" className="button" onClick={(e) => login(e)}>
                Log in
            </button>
        </div>
    )
}

export const BarEntry = () => {
    return (
        <div className="small-3 cell">
            <div className="entry">
                <p>
                    BarName
                </p>
                <p>
                    OwnerName</p>
                <CustomButton redirect="/tipsy/bar" name="View"/>
            </div>
        </div>
    )
}

export const RecipeEntry = () => {
    return (
        <div className="small-3 cell">
            <div className="entry">
                <p>
                    RecipeName
                </p>
                <p>
                    OwnerName</p>
                <CustomButton redirect="/tipsy/recipe" name="View"/>
            </div>
        </div>
    )
}

export const UserEntry = () => {
    return (
        <div className="small-3 cell">
            <div className="entry">
                <p>
                    UserName
                </p>
                <CustomButton redirect="/tipsy/user" name="View"/>
            </div>
        </div>
    )
}

export const SVG = (props) => {
    return (
        <div>
            <img src={props.src} style={props.style} alt={props.alt}/>
        </div>
    );
}

export const DrinksStyle = {
    width: "50%",
    height: "50%",
    "marginLeft": "auto",
    "marginRight": "auto",
    "display": "block"
}

export const TipsyStyle = {
    width: "100%",
    height: "100%"
}

export const SearchBarStyle = {
    width: "50%",
    height: "5vmin",
    "color": "white",
    "background-color": "gray",
    "marginLeft": "auto",
    "marginRight": "auto"
}

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