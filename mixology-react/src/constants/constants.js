import React from 'react';
import { Link } from 'react-router-dom';

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

export const SVG = (props) => {
    return (
        <div>
            <img
                src={props.src}
                height="50%"
                width="50%"
                style={props.style}
                alt={props.alt}/>
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
    width: "50%",
    height: "50%"
}

export default SVG;