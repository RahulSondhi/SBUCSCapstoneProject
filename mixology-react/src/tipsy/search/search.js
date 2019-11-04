import React, {Component} from 'react';
import Tabs from './tabs.js';
import {SearchBarStyle } from '../../constants/constants.js';
import './search.css';

export const SearchBar = (props) => (<input type="text" placeholder={props.placeholder} style={props.style}/>);

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
