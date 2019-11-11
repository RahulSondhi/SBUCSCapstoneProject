import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {SVG, ProfileIconStyle} from '../../js/constants.js';
import UserPic from '../../assets/user.svg';
import Navbar from '../navbar/navbar.js';
import { getUserProfile } from '../../util/APIUtils';

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false
        }
        this.loadUserProfile = this.loadUserProfile.bind(this);
    }

    loadUserProfile(nickname) {
        this.setState({
            isLoading: true
        });

        getUserProfile(nickname)
        .then(response => {
            console.log(response); //Bryan | Delete Later
            this.setState({
                user: response,
                isLoading: false
            });
        }).catch(error => {
            console.log(error); //Bryan | Delete Later
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });        
            }
        });        
    }
      
    componentDidMount() {
        let try_name = "";
        if(this.props.match.params.nickname === "me")
            try_name = this.props.currentUser.nickname;
        else
            try_name = this.props.match.params.nickname;
        const nickname = try_name;
        this.loadUserProfile(nickname);
    }

    componentDidUpdate(nextProps) {
        if(this.props.match.params.nickname !== nextProps.match.params.nickname) {
            this.loadUserProfile(nextProps.match.params.nickname);
        }        
    }


    render() {
        return (
            <div className="grid-margin-y">
                <Navbar/>
                <h1 className="caption">nickname</h1>
                <SVG src={UserPic} style={ProfileIconStyle}/>

                <div className="grid-x grid-margin-x boxContainer">
                    <div className="cell small-4">
                        <h4>
                            Bars
                        </h4>
                        <div className="userBox">
                            <Link to="/tipsy/myBars/bar" className="userBoxEntry">BarName1</Link>
                            <Link to="/tipsy/myBars/bar" className="userBoxEntry">BarName2</Link>
                        </div>
                    </div>
                    <div className="cell small-4">
                        <h4>
                            Recipes</h4>
                        <div className="userBox">
                            <Link to="/tipsy/myRecipes/recipe" className="userBoxEntry">RecipeName1</Link>
                            <Link to="/tipsy/myRecipes/recipe" className="userBoxEntry">RecipeName2</Link>
                        </div>
                    </div>
                    <div className="cell small-4">
                        <h4>
                            Equipment</h4>
                        <div className="userBox">
                            <Link to="/tipsy/barGears/gear" className="userBoxEntry">GearName1</Link>
                            <Link to="/tipsy/barGears/gear" className="userBoxEntry">GearName2</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserPage;
