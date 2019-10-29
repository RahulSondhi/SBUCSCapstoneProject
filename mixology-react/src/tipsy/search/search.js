import React, {Component} from 'react';
import Tabs from './tabs.js';
import SVG, {SearchBarStyle, DrinksStyle} from '../../constants/constants.js';
import './search.css';

export const SearchBar = (props) => (<input type="text" placeholder={props.placeholder} style={props.style}/>);

const SearchDrinksStyle = {
    width: "50%",
    height: "50%",
    "marginLeft": "auto",
    "marginRight": "auto",
    "display": "block",
    position: "relative"
}

export class Search extends Component {
    render() {
        return (
            <div>
                <Tabs/>
                <h1 className="myTitle">
                    Search
                </h1>
                <SearchBar placeholder="Enter Bar or Recipe" style={SearchBarStyle}/>
                <button type="submit" className="searchButton button cell small-4">
                    SEARCH
                </button>
            </div>
        )
    }
}

export default Search;
