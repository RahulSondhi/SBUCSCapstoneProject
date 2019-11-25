import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom'
import Navbar from '../navbar/navbar.js';

import {ItemPreview, GetProfImg} from '../../main/constants';

import {getUserProfile, getAllEquipment} from '../../util/APIUtils';

class UsersBarsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            type: this.props.type,
            isLoading: true,
            title: "",
            customFirstButton: "div"
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
                this.setState({data: response.bars, isLoading: false, title: title, customFirstButton:addBarButton});
            }else if(this.state.type === "recipe"){
                const title = response.name + "'s Recipes";
                const recipes = [].concat(response.recipesWritten, response.recipesIncompleted,response.recipesCompleted);
                this.setState({data: recipes, isLoading: false, title: title, customFirstButton:addRecipeButton});
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
            if (error.status === 404) {
                this.setState({notFound: true, isLoading: false});
            } else {
                this.setState({serverError: true, isLoading: false});
            }
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
        if (this.state.notFound === true || this.state.serverError === true) {
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

        return (
            <div className="grid-x grid-x-margin align-center-middle">
                <Navbar/>

                <h1 id="userBarsPageTitle" className="caption small-10 cell">{this.state.title}</h1>

                <div className="grid-x align-center align-top small-10 cell">

                    <this.state.customFirstButton />

                    <ItemPreview
                        className="small-6 medium-3 cell"
                        items={this.state.data}
                        type={this.state.type}/>

                </div>
            </div>
        )
    }
}

class addBarButton extends Component{
    render(){
        return(
        <Link
            to="/tipsy/createbar"
            className="previewItem grid-x align-center-middle small-6 medium-3 cell"
            key="add">
            <div className="small-4 grid-x cell">
                <GetProfImg type="add" className="small-10 cell" pic="" alt="Add A Bar"/>
            </div>
            <div className="small-8 grid-x cell">
                <div className="previewName cell">Add A Bar</div>
            </div>
        </Link>);
    }
}

class addRecipeButton extends Component{
    render(){
        return(
            <Link
            to="/tipsy/createRecipe"
            className="previewItem grid-x align-center-middle small-6 medium-3 cell"
            key="add">
            <div className="small-4 grid-x cell">
                <GetProfImg type="add" className="small-10 cell" pic="" alt="Add A Bar"/>
            </div>
            <div className="small-8 grid-x cell">
                <div className="previewName cell">Add A Recipe</div>
            </div>
        </Link>);
    }
}

export default UsersBarsPage;
