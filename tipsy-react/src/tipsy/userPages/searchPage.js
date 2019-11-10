import React, {Component} from 'react';
import { Input } from 'antd';
import Drinks from '../../assets/drinks.svg';
import Navbar from '../navbar/navbar.js';
const Search = Input.Search;

export class SearchPage extends Component {
    render() {
        return (
            <div className="grid-x align-center-middle">
                
                <Navbar/>

                {/* Title */}
                <h1 id="searchTitle" className="caption small-8 cell">
                    Search
                </h1>

                {/* Search Bar */}
                <Search className="searchbar medium-10 cell" placeholder="What are you looking for?" onSearch={value => console.log(value)} enterButton />
                
                {/* Drinks Footer */}
                <div id="searchDrinks" className="small-12 cell">
                    <img src={Drinks} alt="DrinksLogo"></img>
                </div>
                
            </div>
        )
    }
}

export default SearchPage;
