import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import Navbar from '../navbar/navbar.js';
import {createBar, getBarProfile, changeBarSettings, deleteBar} from '../../util/APIUtils';

import {MakeProfImg, DynamicForm, ValidateDesc, ValidateName} from '../../main/constants';

import {Form, Input, Icon, Tabs, notification} from 'antd';

const FormItem = Form.Item;
const {TabPane} = Tabs;

class ConfigBarPage extends Component {

    constructor(props) {
        super(props);
        //Initialize values for all fields

        this.state = {
            isLoading: true,
            isCreating: this.props.isCreating,
            bar: null,
            page: {
                title: "Create a Bar",
                submit: "Create a Bar"
            },
            name: {
                value: ''
            },
            description: {
                value: ''
            },
            managers: {
                value: []
            },
            workers: {
                value: []
            },
            recipesAvailable: {
                value: []
            },
            img: {
                value: ''
            },
            deleteClass: "hidden"
        }
        //Functions needed for this Settings Class
        this.handleInputChange = this
            .handleInputChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
        
        this.handleDelete = this
            .handleDelete
            .bind(this);

        this.isFormInvalid = this
            .isFormInvalid
            .bind(this);
        this.handleImageLoad = this
            .handleImageLoad
            .bind(this);
        this.loadBarProfile = this
            .loadBarProfile
            .bind(this);
        this.handleListLoad = this
            .handleListLoad
            .bind(this);
    }

    componentDidMount() {

        if (this.state.isCreating === false) {
            let try_name = this.props.match.params.id;
            const id = try_name;
            this.loadBarProfile(id);
        } else {
            this.handleListLoad();
            this.setState({isLoading: false});
        }

    }

    loadBarProfile(id) {
        this.setState({isLoading: true});

        getBarProfile(id).then(response => {

            const tempTitle = "Editing " + response.name;

            this.setState({
                bar: response,
                isLoading: false,
                isDeleting: false,
                page: {
                    title: tempTitle,
                    submit: "Save Bar"
                },
                name: {
                    value: response.name,
                    validateStatus: 'success'
                },
                description: {
                    value: response.description
                },
                managers: {
                    value: response.managers
                },
                workers: {
                    value: response.workers
                },
                recipesAvailable: {
                    value: response.recipesAvailable
                },
                img: {
                    value: response.img
                },
                deleteClass: " "
            });

            
            this.handleListLoad();

        }).catch(error => {
            if (error.status === 404) {
                this.setState({notFound: true, isLoading: false});
            } else {
                this.setState({serverError: true, isLoading: false});
            }
        });
    }

    render() {

        // Checking if data came in
        if (this.state.isLoading) {
            return null
        }

        // Checking if time to axe it
        if (this.state.isDeleting) {
            deleteBar(this.props.match.params.id);
            return <Redirect
                to={{
                pathname: "/tipsy/myBars",
                state: {
                    from: this.props.location
                }
            }}/>
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
            <div className="grid-x align-center-middle">
                <Navbar/>

                <h1 className="caption align-center-middle cell">
                    {this.state.page.title}
                </h1>

                <Form
                    onSubmit={this.handleSubmit}
                    className="small-12 medium-8 cell grid-x align-center-middle">

                    <Tabs className="tabsBarForm small-12 medium-10 cell" tabPosition="top">
                        <TabPane tab="Desc" key="1">
                            <div className="grid-x grid-margin-x align-center-middle cell">

                                <MakeProfImg
                                    pic={this.state.img.value}
                                    className="cell"
                                    data={this.handleImageLoad}
                                    type="bar"/>

                                <FormItem
                                    label="Name"
                                    validateStatus={this.state.name.validateStatus}
                                    help={this.state.name.errorMsg}
                                    className="small-12 medium-6 cell">
                                    <Input
                                        prefix={< Icon type = "idcard" />}
                                        name="name"
                                        autoComplete="off"
                                        placeholder="Enter Bar Name"
                                        value={this.state.name.value}
                                        onChange={(event) => this.handleInputChange(event, ValidateName)}/>
                                </FormItem>

                                <div className="cell"></div>

                                <FormItem
                                    label="Description"
                                    validateStatus={this.state.description.validateStatus}
                                    help={this.state.description.errorMsg}
                                    className="small-12 medium-10 cell">
                                    <Input
                                        prefix={< Icon type = "idcard" />}
                                        name="description"
                                        autoComplete="off"
                                        placeholder="Enter a Description"
                                        value={this.state.description.value}
                                        onChange={(event) => this.handleInputChange(event, ValidateDesc)}/>
                                </FormItem>

                            </div>
                        </TabPane>
                        <TabPane tab="Recipes" key="2">
                            <div className="grid-x grid-margin-x align-center-middle cell">

                                <DynamicForm
                                    type="recipe"
                                    data={this.state.recipesAvailable.value}
                                    onUpdate={this.handleListLoad}
                                    validate={this.validateRecipeAdd}
                                    className="cell"/>

                            </div>
                        </TabPane>
                        <TabPane tab="Managers" key="3">
                            <div className="grid-x grid-margin-x align-center-middle cell">

                                <DynamicForm
                                    type="user"
                                    data={this.state.managers.value}
                                    onUpdate={this.handleListLoad}
                                    validate={this.validateUserAdd}
                                    className="cell"/>

                            </div>
                        </TabPane>
                        <TabPane tab="Workers" key="4">
                            <div className="grid-x grid-margin-x align-center-middle cell">

                                <DynamicForm
                                    type="user"
                                    data={this.state.workers.value}
                                    onUpdate={this.handleListLoad}
                                    validate={this.validateUserAdd}
                                    className="cell"/>

                            </div>
                        </TabPane>

                        <TabPane tab="Managers" key="5">
                            <div className="grid-x grid-margin-x align-center-middle cell">

                                <DynamicForm
                                    type="user"
                                    data={this.state.managers.value}
                                    onUpdate={this.handleListLoad}
                                    validate={this.validateUserAdd}
                                    className="cell"/>

                            </div>
                        </TabPane>

                    </Tabs>

                    <FormItem className="small-12 medium-8 cell">
                        <button
                            type="submit"
                            id="settingsButton"
                            disabled={this.isFormInvalid()}
                            onClick={this.disableButton}
                            className="button">
                            {this.state.page.submit}
                        </button>
                    </FormItem>

                    <FormItem className={"small-12 medium-8 cell "+this.state.deleteClass}>
                        <button
                            id="settingsButton"
                            onClick={this.handleDelete}
                            className="button">
                            Delete
                        </button>
                    </FormItem>

                </Form>
            </div>
        )
    }


    handleDelete(){
        this.setState({
            isDeleting: true
        })
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleImageLoad = (val) => {
        this.setState({
            img: {
                value: val
            }
        });
    }

    handleListLoad = () => {

        var SENDmanagers = this
            .state
            .managers
            .value
            .map(function (el) {
                return el.name;
            });

        var SENDworkers = this
            .state
            .workers
            .value
            .map(function (el) {
                return el.name;
            });

        var SENDrecipesAvailable = this
            .state
            .recipesAvailable
            .value
            .map(function (el) {
                return el.id;
            });
        

        // console.log(SENDmanagers, SENDrecipesAvailable, SENDworkers)
        if(SENDmanagers  === null || SENDmanagers === "" || SENDmanagers === undefined){
            SENDmanagers = [];
        }

        if(SENDworkers  === null || SENDworkers === "" || SENDworkers === undefined){
            SENDworkers = [];
        }

        if(SENDrecipesAvailable  === null || SENDrecipesAvailable === "" || SENDrecipesAvailable === undefined){
            SENDrecipesAvailable = [];
        }

        this.setState({SENDmanagers: SENDmanagers, SENDworkers: SENDworkers, SENDrecipesAvailable: SENDrecipesAvailable});
    }

    validateUserAdd = (name) => {
        if (this.state.workers.value.some(items => items['name'] === name) === false && this.state.managers.value.some(items => items['name'] === name) === false && this.state.bar.owner.name !== name) {
            return true;
        } else {
            return false;
        }
    }

    validateRecipeAdd = (id) => {
        if (this.state.recipesAvailable.value.some(items => items['id'] === id) === false) {
            return true;
        } else {
            return false;
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const barRequest = {
            name: this.state.name.value,
            description: this.state.description.value,
            img: this.state.img.value,
            managers: this.state.SENDmanagers,
            workers: this.state.SENDworkers,
            recipesAvailable: this.state.SENDrecipesAvailable
        };

        if (this.state.isCreating === true) {
            createBar(barRequest).then(response => {
                notification.success({message: 'Tipsy App', description: "Your bar was succesfully created!"});
            }).catch(error => {
                notification.error({
                    message: 'Tipsy App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            });
        } else {
            changeBarSettings(this.props.match.params.id, barRequest).then(response => {
                notification.success({message: 'Tipsy App', description: "Your bar was succesfully saved!"});
            }).catch(error => {
                notification.error({
                    message: 'Tipsy App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            });
        }
    }

    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success');
    }
}

export default ConfigBarPage;
