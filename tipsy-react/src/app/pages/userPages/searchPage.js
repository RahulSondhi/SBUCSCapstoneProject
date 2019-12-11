import React, {Component} from 'react';

import Drinks from '../../assets/drinks.svg';
import Navbar from '../navbar/navbar.js';

import {ItemPreview} from '../../util/constants';
import {search} from '../../util/APIUtils';
import ErrorPage from '../../util/errorPage.js';

import queryString from 'query-string';
import { Input, Select } from 'antd';
const { Option } = Select;

export class SearchPage extends Component {

    id = 0;

    constructor(props) {
        super(props);

        this.state = {
            results: [],
            isLoading: true,
            type: "recipe",
            defaultType: "recipe",
            query: null,
            searchingClass: " ",
            searchClass: "hidden",
            searching: false,
            id: this.id
        }

        this.searching = this
            .searching
            .bind(this);

        this.updateType = this
            .updateType
            .bind(this);
        
        this.loadSearch = this
            .loadSearch
            .bind(this);
        
        this.exitSearch = this
            .exitSearch
            .bind(this);

    }

    updateType(val){
        this.setState({
            defaultType: val
        })
    }

    componentDidMount() {
        
        const values = queryString.parse(this.props.location.search)
        if(values.type !== undefined && values.query !== undefined ){
            this.setState({
                type: values.type,
                defaultType: values.type,
                query: values.query,
                id: this.id + 1
            });
            this.loadSearch(values.type,values.query);
        }else{
            this.setState({
                searchingClass: " ",
                searchClass: "hidden",
                isLoading: false
            });
        }

    }

    loadSearch = (type,query) => {
        
        this.id += 1;
        if(["user","bar","equipment","recipe"].includes(type)){
            search(type,query).then(response => {
                this.setState({
                    type: type,
                    query: query,
                    results: response,
                    isLoading: false,
                    searchingClass: "hidden",
                    searchClass: " ",
                    searching: true,
                    id: this.id
                });
            }).catch(error => {
                this.setState({
                    error:{
                        status: error.status,
                        message: error.message, 
                    },
                    results: [{name:"No "+type+" called '"+ query +"' found!"}],
                    type: "error",
                    isLoading: false,
                    searchingClass: "hidden",
                    searchClass: " ",
                    searching: true,
                    id: this.id
                });
            });
        } else  {
            this.props.history.push({
                pathname: '/tipsy/search',
                search: ""
            })
            window.location.reload();
        }

    }

    exitSearch = () => {
        this.setState({
            results: [],
            type: "",
            searchingClass: " ",
            searchClass: "hidden",
            searching: false,
            id: this.id,
        });
    }

    searching(e){

        this.props.history.push({
            pathname: '/Tipsy/app/search',
            search: '?type='+this.state.defaultType+"&query="+e.target.value
        })

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.location !== this.props.location){
            const values = queryString.parse(nextProps.location.search)
            if(values.type !== undefined && values.query !== undefined ){
                this.loadSearch(values.type,values.query);
            }
        }
    }

    render() {

        const selectBefore = (
            <Select defaultValue={this.state.defaultType} onChange={this.updateType}>
                <Option value="bar">Bars Name</Option>
                <Option value="recipe">Recipe Name</Option>
                <Option value="user">Users Name</Option>
                <Option value="equipment">Equipment Name</Option>
            </Select> 
        );

        // Checking if data came in
        if (this.state.isLoading) {
            return null
        }

        // Checking response
        if (this.state.error) {
            if(this.state.error.status >= 500){
                return <ErrorPage
                status ={this.state.error.status}
                message = {this.state.error.message.message}
                history = {this.props.history}
                />
            }
        }

        const values = queryString.parse(this.props.location.search)

        if(values.query === undefined && this.state.searching === true){
            this.exitSearch();
        }

        return (
            <div className="grid-x align-center-middle pageContainer">
                
                <Navbar/>

                <div className="grid-x align-top align-center cell page">
                    {/* Title */}
                    <div id="searchTitle" className={"caption small-8 cell "+this.state.searchingClass}>
                        Search
                    </div>

                    {/* Search Bar */}
                    <Input addonBefore={selectBefore} className="searchbar small-10 cell" placeholder="What are you looking for?" onPressEnter={(e) => this.searching(e)} />
                    
                    {/* Drinks Footer */}
                    <div id="searchDrinks" className={"align-self-bottom small-12 cell "+this.state.searchingClass}>
                        <img src={Drinks} alt="DrinksLogo"></img>
                    </div>

                    <ItemPreview
                        className= {"small-6 medium-3 cell "+this.state.searchClass}
                        items={this.state.results}
                        type={this.state.type}/>
                </div>

            </div>
        )

    }
}

export default SearchPage;
