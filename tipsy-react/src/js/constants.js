import React from 'react';
import {Link} from 'react-router-dom';
import UserIcon from '../assets/user.svg';

export const LoginLabelStyle = {
    "float": "left"
}

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

export const EntryTwoFields = (props) => {
    return (
        <div className="small-3 cell">
            <div className="entry">
            <br/>
            <h3 style={props.titleStyle}>
                {props.itemName}
            </h3>
              <SVG src={props.icon} style={props.style} alt="User"/>
                <p>{props.ownerName}</p>
                <CustomButton redirect={props.redirect} name="View"/>
            </div>
        </div>
    )
}

export const EntryOneField = (props) => {
    return (
        <div className="small-3 cell">
            <div className="entry">
            <br/>
                <SVG src={UserIcon} style={UserStyle} alt="User"/>
                <p>
                    {props.objectName}
                </p>
                <CustomButton redirect={props.redirect} name="View"/>
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

export const CupBottleStyle = {
    width: "50em",
    height: "50em",
}

export const TipsyStyle = {
    width: "100%",
    height: "100%"
}

export const SmallTipsyStyle = {
    width: "20%",
    height: "20%"
}

export const UserStyle = {
    width: "30%",
    height: "30%",
}

export const CounterStyle = {
  height: "30em"
}

export const IngredientStyle = {
  height: "10em"
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
    width: "15%",
    height: "15%"
}

export const ProfileIconStyle = {
    width: "10%",
    height: "10%"
}

export const TitleStyle = {
    width: "80%",
    height: "20%",
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
