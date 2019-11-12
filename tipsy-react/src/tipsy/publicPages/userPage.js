import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {RecipesPreview, BarsPreview, GetProfImg} from '../../main/constants';
import Navbar from '../navbar/navbar.js';
import {Tabs} from 'antd';
import {getUserProfile} from '../../util/APIUtils';

const {TabPane} = Tabs;

class UserPage extends Component {
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
            <div className="grid-x grid-x-margin align-center-middle">

                <Navbar/>
                <h1 id="userPageTitle" className="caption small-10 cell">{this.state.user.nickname}</h1>

                <div
                    id="leftProfileSide"
                    className="small-12 medium-4 grid-x align-center-middle cell">

                    <GetProfImg
                        className="small-4 cell"
                        pic={this.state.user.img}
                        alt={this.state.user.nickname}/>
                    <h1 id="userPageFullName" className="caption small-10 cell">{this.state.user.name}</h1>
                    <h1 id="userPageBarTitle" className="captionRed small-10 cell">Bars</h1>
                    <div
                        className="userPageBarScroll small-10 grid-x grid-margin-x align-center-middle cell">
                        <div
                            className="userPageBarContainer grid-x grid-margin-x align-center-middle cell">
                            <BarsPreview className="cell" bars={this.state.user.bars}/>
                        </div>
                    </div>
                </div>
                <div
                    id="rightProfileSide"
                    className="small-12 medium-8 grid-x align-center-middle cell">
                    <h1 id="userPageBarTitle" className="captionRed small-10 cell">Recipes History</h1>
                    <Tabs className="small-12 medium-10 cell" tabPosition="right">
                        <TabPane tab="Done" key="1">
                            <div className="grid-x grid-margin-x align-center-middle cell">
                                <RecipesPreview
                                    className="small-6 cell"
                                    recipes={this.state.user.recipesCompleted}/>
                            </div>
                        </TabPane>
                        <TabPane tab="Made" key="2">
                            <div className="grid-x grid-margin-x align-center-middle cell">
                                <RecipesPreview
                                    className="small-6 cell"
                                    recipes={this.state.user.recipesWritten}/>
                            </div>
                        </TabPane>
                        <TabPane tab="Doing" key="3">
                            <div className="grid-x grid-margin-x align-center-middle cell">
                                <RecipesPreview
                                    className="small-6 cell"
                                    recipes={this.state.user.recipesIncompleted}/>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
};

export default UserPage;