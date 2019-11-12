import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {RecipesPreview, UsersPreview, GetProfImg} from '../../main/constants';
import Navbar from '../navbar/navbar.js';
import {Tabs} from 'antd';
import {getBarProfile} from '../../util/APIUtils';

const {TabPane} = Tabs;

class BarPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bar: null,
            isLoading: true
        }
        this.loadBarProfile = this
            .loadBarProfile
            .bind(this);
    }

    loadBarProfile(id) {
        this.setState({isLoading: true});

        getBarProfile(id).then(response => {
            this.setState({bar: response, isLoading: false});
        }).catch(error => {
            if (error.status === 404) {
                this.setState({notFound: true, isLoading: false});
            } else {
                this.setState({serverError: true, isLoading: false});
            }
        });
    }

    componentDidMount() {
        let try_name = this.props.match.params.id;
        const id = try_name;
        this.loadBarProfile(id);
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

                <div className="small-8 grid-x align-center-middle cell">
                    <GetProfImg
                        className="small-3 cell"
                        pic={this.state.bar.img}
                        alt={this.state.bar.name}
                        type="bar"/>
                </div>
                <h1 id="barPageTitle" className="caption small-10 cell">{this.state.bar.name}</h1>

                <div className="small-12 medium-4 grid-x align-center-middle cell">

                    <h1 className="caption small-10 cell">Owner:</h1>
                    <UsersPreview className="small-8 cell" users={[this.state.bar.owner]}/>

                    <h1 className="barPageDescTitle captionRed small-10 cell">Desc</h1>
                    <div className="small-10 grid-x grid-margin-x align-center-middle cell">
                        {this.state.bar.description}
                    </div>
                </div>


                <div
                    id="rightBarSide"
                    className="small-12 medium-8 grid-x align-center-middle cell">
                    <h1 id="userPageBarTitle" className="captionRed small-10 cell">Recipes History</h1>
                    <Tabs className="small-12 medium-10 cell" tabPosition="right">
                        <TabPane tab="Recipes" key="1">
                            <div className="grid-x grid-margin-x align-center-middle cell">
                                <RecipesPreview className="small-6 cell" recipes={this.state.bar.recipesAvailable}/>
                            </div>
                        </TabPane>
                        <TabPane tab="Managers" key="2">
                            <div className="grid-x grid-margin-x align-center-middle cell">
                                <UsersPreview className="small-6 cell" users={this.state.bar.managers}/>
                            </div>
                        </TabPane>
                        <TabPane tab="Workers" key="3">
                            <div className="grid-x grid-margin-x align-center-middle cell">
                                <UsersPreview className="small-6 cell" users={this.state.bar.workers}/>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default BarPage;
