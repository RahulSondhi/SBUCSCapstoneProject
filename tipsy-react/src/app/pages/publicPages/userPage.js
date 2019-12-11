import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import {ItemPreview, GetProfImg} from '../../util/constants';
import {getUserProfile} from '../../util/APIUtils';
import ErrorPage from '../../util/errorPage.js';

import Navbar from '../navbar/navbar.js';
import {Tabs} from 'antd';

const {TabPane} = Tabs;

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: true,
            settingClass: "hidden",
            currentUser: false
        }
        this.loadUserProfile = this
            .loadUserProfile
            .bind(this);
    }

    loadUserProfile(name) {
        this.setState({isLoading: true});

        getUserProfile(name).then(response => {

            var settingClass = this.state.settingClass;
            var currentUser = this.state.currentUser;
            var key = this.state.key;

            if (this.props.currentUser.name === response.name || this.props.currentUser.roles.includes("ADMIN")) {
                
                settingClass = " ";

                if(this.props.currentUser.name === response.name){
                    currentUser = true;
                }
            }

            this.setState({user: response, isLoading: false, settingClass: settingClass, currentUser: currentUser});
        }).catch(error => {
            this.setState({
                error: {
                    status: error.status,
                    message: error.message
                },
                isLoading: false
            });
        });
    }

    componentDidMount() {
        let try_name = "";
        if (this.props.match.params.id === "me") 
            try_name = this.props.currentUser.name;
        else 
            try_name = this.props.match.params.id;
        const name = try_name;
        this.loadUserProfile(name);
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
        if (this.state.error) {
            return <ErrorPage
                status
                ={this.state.error.status}
                message={this.state.error.message.message}
                history={this.props.history}/>
        }

        return (
            <div className="grid-x grid-x-margin align-center-middle pageContainer">
                <Navbar/>

                <div className="grid-x align-center align-top cell page">
                    <div className="small-6 small-offset-3 grid-x align-center-middle cell publicUserProfImg">
                        <GetProfImg
                                    className="small-2 cell"
                                    pic={this.state.user.img}
                                    alt={this.state.user.name}
                                    type="user"/>
                        <h1 id="userPageTitle" className="caption grid-x align-center-middle cell ">
                            {this.state.user.name}
                            <div className="cell"/>
                            {"("+this.state.user.fullName+")"}
                        </h1>
                    </div>

                    <div
                        id="redirectUser"
                        className="small-2 small-offset-1 cell grid-x align-center-middle">
                        <NavLink
                            to={"/tipsy/user/" + this.state.user.name + "/config"}
                            className={"cell grid-x align-center-middle " + this.state.settingClass}>
                            <GetProfImg className="small-offset-8 small-3 cell" alt="Settings" type="settings"/>
                        </NavLink>
                    </div>

                    <div
                        className="small-12 medium-4 grid-x align-center-middle cell leftUserPublicSide">

                        <h1 id="userPageBarTitle" className="captionRed small-10 cell">Bars</h1>
                        <div className="userPageBarContainer small-12 grid-x grid-margin-x align-center align-top cell">
                            <ItemPreview className="small-5 cell" items={this.state.user.bars} type="bar"/>
                        </div>

                    </div>
                    <div className="small-12 medium-8 grid-x align-center-middle rightUserPublicSide cell">
                        <h1 id="userPageBarTitle" className="captionRed small-10 cell">Recipes History</h1>
                        <Tabs className="small-12 publicTabs cell" tabPosition="right">
                        <TabPane tab="Making" disabled={!this.state.currentUser} key="4">
                                <div className="grid-x grid-margin-x align-center-middle cell">
                                    <ItemPreview
                                        className="small-4 medium-3 cell"
                                        items={this.state.user.recipesWritten.filter(equip => 
                                            { 
                                                return equip.published === false
                    
                                            })}
                                        type="recipe"/>
                                </div>
                            </TabPane>
                            <TabPane tab="Doing" key="0">
                                <div className="grid-x grid-margin-x align-center-middle cell">
                                    <ItemPreview
                                        className="small-4 medium-3 cell"
                                        items={this.state.user.recipesIncompleted}
                                        type="recipe"/>
                                </div>
                            </TabPane>
                            <TabPane tab="Done" key="1">
                                <div className="grid-x grid-margin-x align-center-middle cell">
                                    <ItemPreview
                                        className="small-4 medium-3 cell"
                                        items={this.state.user.recipesCompleted}
                                        type="recipe"/>
                                </div>
                            </TabPane>
                            <TabPane tab="Published" key="2">
                                <div className="grid-x grid-margin-x align-center-middle cell">
                                    <ItemPreview
                                        className="small-4 medium-3 cell"
                                        items={this.state.user.recipesWritten.filter(equip => 
                                            { 
                                                return equip.published === true
                    
                                            })}
                                        type="recipe"/>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
};

export default UserPage;