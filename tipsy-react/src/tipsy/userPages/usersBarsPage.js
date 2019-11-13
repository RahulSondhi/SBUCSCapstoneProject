import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom'
import Navbar from '../navbar/navbar.js';

import {ItemPreview, GetProfImg} from '../../main/constants';

import {getUserProfile} from '../../util/APIUtils';

class UsersBarsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: true
        }
        this.loadUserProfile = this
            .loadUserProfile
            .bind(this);
    }

    loadUserProfile(nickname) {
        this.setState({isLoading: true});

        getUserProfile(nickname).then(response => {
            this.setState({user: response, isLoading: false});
        }).catch(error => {
            if (error.status === 404) {
                this.setState({notFound: true, isLoading: false});
            } else {
                this.setState({serverError: true, isLoading: false});
            }
        });
    }

    componentDidMount() {
        let try_name = this.props.currentUser.nickname;
        const nickname = try_name;
        this.loadUserProfile(nickname);
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

                <h1 id="userBarsPageTitle" className="caption small-10 cell">{this.state.user.nickname + "'s Bars"}</h1>

                <div className="grid-x align-center-middle cell">

                    <Link to="/tipsy/createbar" className="previewItem grid-x align-center-middle small-6 medium-3 cell" key="add">
                        <div className="small-4 grid-x cell">
                            <GetProfImg type="add" className="small-10 cell" pic="" alt="Add A Bar"/>
                        </div>
                        <div className="small-8 grid-x cell">
                            <div className="previewName cell">Add A Bar</div>
                        </div>
                    </Link>

                    <ItemPreview className="small-6 medium-3 cell" items={this.state.user.bars} type="bar"/>
                </div>
            </div>
        )
    }
}

export default UsersBarsPage;
