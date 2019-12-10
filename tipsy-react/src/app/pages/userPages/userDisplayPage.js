import React, {Component} from 'react';

import {ItemPreview} from '../../util/constants';
import {getUserProfile, getAllEquipment} from '../../util/APIUtils';
import ErrorPage from '../../util/errorPage.js';

import Navbar from '../navbar/navbar.js';

import {Tabs} from 'antd';

const {TabPane} = Tabs;

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
            var title = response.name;
            var customButtonData = [];
            var customButtonType = "";

            if(this.state.type === "bar"){
                title = response.name + "'s Bars";
                customButtonData = [{desc:"Create a Bar"}]
                customButtonType = "createBar"
            }else if(this.state.type === "recipe"){
                title = response.name + "'s Recipes";
                customButtonData = [{desc:"Create a Recipe"}]
                customButtonType = "createRecipe"
            }

            this.setState({
                data:response,
                isLoading: false, 
                title: title, 
                customButtonData: customButtonData,
                customButtonType: customButtonType
            });
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

        if(this.state.type === "bar"){
            return (
                <div className="grid-x grid-x-margin align-center-middle">
                    <Navbar/>

                    <h1 id="userBarsPageTitle" className="caption small-10 cell">{this.state.title}</h1>

                    <div className="grid-x align-center align-top cell">

                    <Tabs className="small-12 cell" tabPosition="right">
                            <TabPane tab="All Bars" key="0">
                                <div className="grid-x grid-margin-x align-center-middle cell">
                                    <ItemPreview
                                        className="small-4 cell"
                                        items={this.state.customButtonData}
                                        type={this.state.customButtonType}/>
                                    <ItemPreview
                                        className="small-4 cell"
                                        items={this.state.data.bars}
                                        type="bar"/>
                                </div>
                            </TabPane>
                            <TabPane tab="Owned Bars" key="1">
                                <div className="grid-x grid-margin-x align-center-middle cell">
                                    <ItemPreview
                                        className="small-4 cell"
                                        items={this.state.customButtonData}
                                        type={this.state.customButtonType}/>
                                    <ItemPreview
                                        className="small-4 cell"
                                        items={this.state.data.bars.filter(bar => {
                                            return bar.owner === this.props.currentUser.name
                                        })}
                                        type="bar"/>
                                </div>
                            </TabPane>
                            <TabPane tab="Managed Bars" key="2">
                                <div className="grid-x grid-margin-x align-center-middle cell">
                                    <ItemPreview
                                        className="small-4 cell"
                                        items={this.state.customButtonData}
                                        type={this.state.customButtonType}/>
                                    <ItemPreview
                                        className="small-4 cell"
                                        items={this.state.data.bars.filter(bar => {
                                            return bar.managers.includes(this.props.currentUser.name)
                                        })}
                                        type="bar"/>
                                </div>
                            </TabPane>
                            <TabPane tab="Employeed Bars" key="4">
                                <div className="grid-x grid-margin-x align-center-middle cell">
                                    <ItemPreview
                                        className="small-4 cell"
                                        items={this.state.customButtonData}
                                        type={this.state.customButtonType}/>
                                    <ItemPreview
                                        className="small-4 cell"
                                        items={this.state.data.bars.filter(bar => {
                                            return bar.workers.includes(this.props.currentUser.name)
                                        })}
                                        type="bar"/>
                                </div>
                            </TabPane>
                        </Tabs>

                    </div>
                </div>
            )
        }else if(this.state.type === "recipe"){
            return (
                <div className="grid-x grid-x-margin align-center-middle">
                    <Navbar/>

                    <h1 id="userBarsPageTitle" className="caption small-10 cell">{this.state.title}</h1>

                    <div className="grid-x align-center align-top cell">

                        <Tabs className="small-12 cell" tabPosition="right">
                            <TabPane tab="Doing" key="0">
                                <div className="grid-x grid-margin-x align-center-middle cell">
                                    <ItemPreview
                                        className="small-4 cell"
                                        items={this.state.customButtonData}
                                        type={this.state.customButtonType}/>
                                    <ItemPreview
                                        className="small-4 cell"
                                        items={this.state.data.recipesIncompleted}
                                        type="recipe"/>
                                </div>
                            </TabPane>
                            <TabPane tab="Done" key="1">
                                <div className="grid-x grid-margin-x align-center-middle cell">
                                    <ItemPreview
                                        className="small-4 cell"
                                        items={this.state.customButtonData}
                                        type={this.state.customButtonType}/>
                                    <ItemPreview
                                        className="small-4 cell"
                                        items={this.state.data.recipesCompleted}
                                        type="recipe"/>
                                </div>
                            </TabPane>
                            <TabPane tab="Published" key="2">
                                <div className="grid-x grid-margin-x align-center-middle cell">
                                    <ItemPreview
                                        className="small-4 cell"
                                        items={this.state.customButtonData}
                                        type={this.state.customButtonType}/>
                                    <ItemPreview
                                        className="small-4 cell"
                                        items={this.state.data.recipesWritten.filter(equip => 
                                            { 
                                                return equip.published === true
                    
                                            })}
                                        type="recipe"/>
                                </div>
                            </TabPane>
                            <TabPane tab="Making" key="4">
                                <div className="grid-x grid-margin-x align-center-middle cell">
                                    <ItemPreview
                                        className="small-4 cell"
                                        items={this.state.customButtonData}
                                        type={this.state.customButtonType}/>
                                    <ItemPreview
                                        className="small-4 cell"
                                        items={this.state.data.recipesWritten.filter(equip => 
                                            { 
                                                return equip.published === false
                    
                                            })}
                                        type="recipe"/>
                                </div>
                            </TabPane>
                        </Tabs>

                    </div>
                </div>
            )
        }else{
            return (
                <div className="grid-x grid-x-margin align-center-middle">
                    <Navbar/>

                    <h1 id="userBarsPageTitle" className="caption small-10 cell">{this.state.title}</h1>

                    <div className="grid-x align-center align-top cell">

                        <ItemPreview
                            className="small-4 medium-3 cell"
                            items={this.state.customButtonData}
                            type={this.state.customButtonType}/>

                        <ItemPreview
                            className="small-4 medium-3 cell"
                            items={this.state.data}
                            type={this.state.type}/>

                    </div>
                </div>
            )
        }
    }
}

export default UsersBarsPage;
