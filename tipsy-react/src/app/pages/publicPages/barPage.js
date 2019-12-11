import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import {getBarProfile} from '../../util/APIUtils';
import {ItemPreview, GetProfImg} from '../../util/constants';
import ErrorPage from '../../util/errorPage.js';

import Navbar from '../navbar/navbar.js';
import {Tabs} from 'antd';

const {TabPane} = Tabs;

class BarPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bar: null,
            isLoading: true,
            settingClass: "hidden"
        }
        this.loadBarProfile = this
            .loadBarProfile
            .bind(this);
    }

    componentDidMount() {
        let try_name = this.props.match.params.id;
        const id = try_name;
        this.loadBarProfile(id);
    }

    loadBarProfile(id) {
        this.setState({isLoading: true});

        getBarProfile(id).then(response => {
            this.setState({bar: response, isLoading: false});

            if (this.props.currentUser.name === response.owner.name || this.props.currentUser.roles.includes("ADMIN") || response.managers.some(item => item.name === this.props.currentUser.name)) {
                this.setState({settingClass: " "});
            }

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

    componentDidUpdate(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.loadBarProfile(nextProps.match.params.id);
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

                <div className="small-2 grid-x grid-margin-x align-center-middle cell publicOwnerInfo">
                        <ItemPreview
                            className="small-9 cell"
                            items={[this.state.bar.owner]}
                            type="user"/>
                        <h1 className="caption cell">Owner</h1>
                    </div>

                    <div className="small-6 small-offset-1 grid-x align-center-middle cell publicProfImg">
                        <GetProfImg
                            className="small-2 cell"
                            pic={this.state.bar.img}
                            alt={this.state.bar.name}
                            type="bar"/>
                        <h1 id="barPageTitle" className="caption cell">{this.state.bar.name}</h1>
                    </div>

                    <div
                        id="redirectBar"
                        className="small-2 small-offset-1 cell grid-x align-center-middle">
                        <NavLink
                            to={"/app/bar/" + this.props.match.params.id + "/config"}
                            className={"cell grid-x align-center-middle " + this.state.settingClass}>
                            <GetProfImg className="small-3 small-offset-8 cell" alt="Settings" type="settings"/>
                        </NavLink>
                    </div>

                    <div className="small-12 medium-4 grid-x align-self-top cell leftPublicSide">

                        <div className="small-10 grid-x grid-margin-x align-center-middle align-self-top cell">
                            <h1 className="publicPageDescTitle captionRed small-10 cell">Description</h1>
                            {this.state.bar.description}
                        </div>

                    </div>

                    <div className="small-12 medium-8 grid-x align-self-top cell rightPublicSide">
                        <h1 id="userPageBarTitle" className="captionRed small-12 cell">Bar Information</h1>
                        <Tabs className="small-12 cell publicTabs" tabPosition="right">
                            <TabPane tab="Recipes" key="1">
                                <div className="grid-x grid-margin-x align-center-middle cell">
                                    <ItemPreview
                                        className="small-4 cell"
                                        items={this.state.bar.recipesAvailable}
                                        type="recipe"/>
                                </div>
                            </TabPane>
                            <TabPane tab="Managers" key="2">
                                <div className="grid-x grid-margin-x align-center-middle cell">
                                    <ItemPreview
                                        className="small-4 cell"
                                        items={this.state.bar.managers}
                                        type="user"/>
                                </div>
                            </TabPane>
                            <TabPane tab="Workers" key="3">
                                <div className="grid-x grid-margin-x align-center-middle cell">
                                    <ItemPreview
                                        className="small-4 cell"
                                        items={this.state.bar.workers}
                                        type="user"/>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}

export default BarPage;
