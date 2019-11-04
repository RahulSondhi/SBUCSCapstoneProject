import React, {Component} from 'react';
import Tabs from './tabs.js';
import Drinks from '../../assets/drinks.svg';
import './search.css';

export class Search extends Component {
    render() {
        return (
            <div className="grid-padding-y">
                <Tabs/>
                <h1 className="myTitle cell small-1 caption">
                    Search
                </h1>
                <div className="cell small-2">
                    <input
                        type="text"
                        className="search searchBar"
                        placeholder="Search"/>
                </div>
                <div className="cell small-2">
                    <input type="submit" className="button" value="SEARCH"/>
                </div>
                <div className="cell small-5"></div>
                <div className="cell small-2">
                    <img src={Drinks} className="drinks" alt="Drinks"/>
                </div>
            </div>
        )
    }
}

export default Search;