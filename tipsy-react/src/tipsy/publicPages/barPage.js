import React, {Component} from 'react';
import {Redirect, NavLink} from 'react-router-dom'
import {ItemPreview, GetProfImg} from '../../main/constants';
import Navbar from '../navbar/navbar.js';
import {Tabs} from 'antd';
import {getBarProfile} from '../../util/APIUtils';

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

            if(
                this.props.currentUser.name === response.owner.name ||
                this.props.currentUser.roles.includes("ADMIN") ||
                response.managers.some(item => item.name === this.props.currentUser.name)){
                this.setState({
                    settingClass : " "
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

                <div className="small-8 small-offset-2 grid-x align-center-middle cell">
                    <GetProfImg
                        className="small-3 cell"
                        pic={this.state.bar.img}
                        alt={this.state.bar.name}
                        type="bar"/>
                </div>

                <div id="redirectBar" className="small-2 cell grid-x align-center-middle">
                    <NavLink to={"/tipsy/bar/"+this.props.match.params.id+"/config"} className={"cell grid-x align-center-middle "+this.state.settingClass}>
                        <GetProfImg className="small-3 cell" alt="Settings" type="settings"/>
                    </NavLink>
                </div>

                <h1 id="barPageTitle" className="caption small-10 cell">{this.state.bar.name}</h1>

                <div className="small-12 medium-4 grid-x align-center-middle cell">

                    <h1 className="caption small-10 cell">Owner:</h1>
                    <ItemPreview className="small-8 cell" items={[this.state.bar.owner]} type="user"/>

                    <h1 className="barPageDescTitle captionRed small-10 cell">Desc</h1>
                    <div className="small-10 grid-x grid-margin-x align-center-middle cell">
                        {this.state.bar.description}
                    </div>
                </div>

                <div
                    id="rightBarSide"
                    className="small-12 medium-8 grid-x align-center-middle cell">
                    <h1 id="userPageBarTitle" className="captionRed small-10 cell">Bar Info</h1>
                    <Tabs className="small-12 medium-10 cell" tabPosition="right">
                        <TabPane tab="Recipes" key="1">
                            <div className="grid-x grid-margin-x align-center-middle cell">
                                <ItemPreview
                                    className="small-6 cell"
                                    items={this.state.bar.recipesAvailable}
                                    type="recipe"/>
                            </div>
                        </TabPane>
                        <TabPane tab="Managers" key="2">
                            <div className="grid-x grid-margin-x align-center-middle cell">
                                <ItemPreview className="small-6 cell" items={this.state.bar.managers} type="user"/>
                            </div>
                        </TabPane>
                        <TabPane tab="Workers" key="3">
                            <div className="grid-x grid-margin-x align-center-middle cell">
                                <ItemPreview className="small-6 cell" items={this.state.bar.workers} type="user"/>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default BarPage;
