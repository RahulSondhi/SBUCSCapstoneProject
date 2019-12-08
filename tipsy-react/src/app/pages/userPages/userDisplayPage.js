import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'

import {ItemPreview} from '../../util/constants';
import {getUserProfile, getAllEquipment} from '../../util/APIUtils';
import ErrorPage from '../../util/errorPage.js';

import Navbar from '../navbar/navbar.js';

class UsersBarsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            type: this.props.type,
            isLoading: true,
            title: "",
            customButtonData: [],
            customButtonType: ""
        }

        this.loadUserProfile = this
            .loadUserProfile
            .bind(this);

        this.loadEquipment = this
            .loadEquipment
            .bind(this);
    }

    loadUserProfile(nickname) {
        this.setState({isLoading: true});

        getUserProfile(nickname).then(response => {
            if(this.state.type === "bar"){
                const title = response.name + "'s Bars";
                this.setState({
                    data: response.bars, 
                    isLoading: false, 
                    title: title, 
                    customButtonData: [{desc:"Create a Bar"}],
                    customButtonType: "createBar"
                });
            }else if(this.state.type === "recipe"){
                const title = response.name + "'s Recipes";
                const recipes = [].concat(response.recipesWritten, response.recipesIncompleted,response.recipesCompleted);
                this.setState({
                    data: recipes, 
                    isLoading: false, 
                    title: title, 
                    customButtonData: [{desc:"Create a Recipe"}],
                    customButtonType: "createRecipe"
                });
            }
        }).catch(error => {
            if (error.status === 404) {
                this.setState({notFound: true, isLoading: false});
            } else {
                this.setState({serverError: true, isLoading: false});
            }
        });
    }

    loadEquipment() {
        this.setState({isLoading: true});

        getAllEquipment().then(response => {
            
            this.setState({data: response, isLoading: false, title:"Bar Equipment"});
        }).catch(error => {
            this.setState({
                error:{
                    status: error.status,
                    message: error.message, 
                },
                isLoading: false
            });
        });
    }

    componentDidMount() {
        let try_name = this.props.currentUser.name;
        const name = try_name;

        if(this.state.type === "bar" || this.state.type === "recipe"){
            this.loadUserProfile(name);
        }else if(this.state.type === "equipment"){
            this.loadEquipment();
        }
    }

    render() {

        // Checking if data came in
        if (this.state.isLoading) {
            return null
        }

        // Checking response
        if (this.state.error) {
            return <ErrorPage
            status ={this.state.error.status}
            message = {this.state.error.message.message}
            history = {this.props.history}
            />
        }

        return (
            <div className="grid-x grid-x-margin align-center-middle">
                <Navbar/>

                <h1 id="userBarsPageTitle" className="caption small-10 cell">{this.state.title}</h1>

                <div className="grid-x align-center align-top small-10 cell">

                    <ItemPreview
                        className="small-6 medium-3 cell"
                        items={this.state.customButtonData}
                        type={this.state.customButtonType}/>

                    <ItemPreview
                        className="small-6 medium-3 cell"
                        items={this.state.data}
                        type={this.state.type}/>

                </div>
            </div>
        )
    }
}

export default UsersBarsPage;
