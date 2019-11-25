import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'

import { Input, Select } from 'antd';
import Drinks from '../../assets/drinks.svg';
import Navbar from '../navbar/navbar.js';

import {ItemPreview} from '../../main/constants';

import {search} from '../../util/APIUtils'
import queryString from 'query-string'

const { Option } = Select;

export class SearchPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            isLoading: true,
            type: "recipe",
            flow: "search",
            query: null 
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

    }

    updateType(val){
        this.setState({
            type: val
        })
    }

    componentDidMount() {
        
        const values = queryString.parse(this.props.location.search)

        if(this.props.results === true){
            this.loadSearch(values.type,values.query,"searched");
        }else{
            this.setState({isLoading: false});
        }

    }

    loadSearch = (type,query,status) => {
        if(type === "user"){
            
            search(type,query).then(response => {
                this.setState({
                    data: response,
                    type: type,
                    query: query,
                    isLoading: false,
                    flow: status
                    });
            }).catch(error => {
                if (error.status === 404) {
                    this.setState({
                        data: [],
                        type: type,
                        query: query,
                        isLoading: false,
                        flow: status
                        });
                } else {
                    this.setState({serverError: true, isLoading: false});
                }
            });

        } else {
            this.setState({isLoading: false, notFound:true});
        }
    }

    searching(e){
        console.log("kill me")
        this.loadSearch(this.state.type,e.target.value,"searching");

    }

    render() {

        const selectBefore = (
            <Select defaultValue="recipe" onChange={this.updateType}>
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
        if (this.state.serverError === true) {
            return <Redirect
                to={{
                pathname: "/tipsy/error",
                state: {
                    from: this.props.location,
                    notFound: this.state.notFound,
                    serverError: this.state.serverError
                }
            }}/>
        }

        console.log(this.state.flow)

        if(this.state.flow === "search"){
            return (
                <div className="grid-x align-center-middle">
                    
                    <Navbar/>

                    {/* Title */}
                    <h1 id="searchTitle" className={"caption small-8 cell"}>
                        Search
                    </h1>

                    {/* Search Bar */}
                    <Input addonBefore={selectBefore} className="searchbar medium-10 cell" placeholder="What are you looking for?" onPressEnter={(e) => this.searching(e)} />
                    
                    {/* Drinks Footer */}
                    <div id="searchDrinks" className={"small-12 cell"}>
                        <img src={Drinks} alt="DrinksLogo"></img>
                    </div>
                    
                </div>
            )
        }else if (this.state.flow === "searching") {
            
            return <Redirect push
                to={{
                pathname: "/tipsy/results?type="+this.state.type+"&query="+this.state.query,
                state: {
                    from: this.props.location
                }
            }}/>


        } else {

            console.log(this.state)
            return (
                <div className="grid-x align-center-middle">
                    
                    <Navbar/>

                    {/* Title */}
                    <h1 id="searchTitle" className={"caption small-8 cell"}>
                        Search
                    </h1>

                    {/* <ItemPreview
                        className="small-6 medium-3 cell"
                        items={this.state.data}
                        type={this.state.type}/> */}
                    
                </div>
            )
        }
    }
}

export default SearchPage;
