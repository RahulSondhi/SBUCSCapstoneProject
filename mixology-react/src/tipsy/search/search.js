import React, {Component} from 'react';
import Tabs from './tabs.js';
import SVG, { SearchBarStyle, DrinksStyle } from '../../constants/constants.js';
import Drinks from '../../assets/drinks.svg';
import './search.css';

export const SearchBar = (props) => (
    <input type="text" placeholder={props.placeholder} style={props.style}/>
);

const SearchDrinksStyle = {
    width: "50%",
    height: "50%",
    "marginLeft": "auto",
    "marginRight": "auto",
    "display": "block",
    "bottom": "-36.5vmin",
    position: "relative"
}

export class Search extends Component {
    render() {
        return (
            <div>
                <Tabs/>
                <h1 className="searchW">
                    Search</h1>
                <SearchBar placeholder="Enter Bar or Recipe" style={SearchBarStyle}/>
                <button type="submit" className="button">
                    SEARCH
                </button>
                <SVG src={Drinks} style={SearchDrinksStyle} alt="Drinks"/>
            </div>
        )
    }
}

export default Search;
