import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import Navbar from '../navbar/navbar.js';

import {BarsPreview} from '../../main/constants';
import {Tabs} from 'antd';

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
        let try_name = "";
        if (this.props.match.params.nickname === "me") 
            try_name = this.props.currentUser.nickname;
        else 
            try_name = this.props.match.params.nickname;
        const nickname = try_name;
        this.loadUserProfile(nickname);
    }

    componentDidUpdate(nextProps) {
        if (this.props.match.params.nickname !== nextProps.match.params.nickname) {
            this.loadUserProfile(nextProps.match.params.nickname);
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
            <div className="grid-container-fluid grid-margin-y">
                <Navbar/>
                
            </div>
        )
    }
}

export default UsersBarsPage;
