import React, {Component} from 'react';
import Tabs from './Tabs';
import { BrowserRouter } from "react-router-dom";
import '../../public/styles.css';

export const SearchBar = (props) => (
    <input type="text" placeholder={props.placeholder}/>
);

class Search extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Tabs/>
                    <SearchBar placeholder="Bars"/>
                    <p> OR </p>
                    <SearchBar placeholder="Recipes"/>
                    <button type="submit" className="button"> SEARCH </button>
                </BrowserRouter>
            </div>
        )
    }
}

export default Search;