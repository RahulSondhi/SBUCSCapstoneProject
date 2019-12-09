import React, {Component} from 'react';
import Navbar from '../navbar/navbar.js';

import {createBar, getBarProfile, changeBarSettings, deleteBar} from '../../util/APIUtils';
import {MakeProfImg, DynamicForm, ValidateDesc, ValidateName, Notify} from '../../util/constants';
import ErrorPage from '../../util/errorPage.js';

import {Form, Input, Icon, Tabs, Popconfirm} from 'antd';

const FormItem = Form.Item;
const {TabPane} = Tabs;

class ConfigBarPage extends Component {

    constructor(props) {
        super(props);
        //Initialize values for all fields

        this.state = {
            isLoading: true,
            isCreating: this.props.isCreating,
            role:"user",
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
            }
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
            var role = "user";

            if(response.owner.name === this.props.currentUser.name || this.props.currentUser.roles.includes("ADMIN") ){
                role="owner";
            }else if (response.managers.some(items => items['name'] === this.props.currentUser.name) === true){
                role="manager";
            }

            this.setState({
                bar: response,
                isLoading: false,
                isDeleting: false,
                role: role,
                page: {
                    title: tempTitle,
                    submit: "Save"
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
                }
            });

            this.handleListLoad();

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

        return (
            <div className="grid-x align-center-middle">
                <Navbar/>

                <h1 className="small-11 medium-10 caption cell">
                    {this.state.page.title}
                </h1>
                <div className="small-1 medium-2 cell"></div>

                <Form
                    onSubmit={this.handleSubmit}
                    className="small-12 medium-11 cell grid-x align-center-middle">

                    <Tabs className="tabsBarForm small-12 cell" tabPosition="right" tabBarExtraContent={
                        <div className="grid-x align-center-middle cell">
                            <div className="tabsSeperator small-10 cell"></div>
                            <button
                                type="submit"
                                id="settingsButton"
                                disabled={this.isFormInvalid()}
                                onClick={this.disableButton}
                                className="small-10 button cell">
                                {this.state.page.submit}
                            </button>
                        </div>
                    }>
                        <TabPane tab="Desc" key="1">
                            <div className="grid-x grid-margin-x align-center-middle cell">

                                <MakeProfImg
                                    pic={this.state.img.value}
                                    className="cell"
                                    data={this.handleImageLoad}
                                    disabled={(this.state.role === "manager")}
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
                                        disabled={(this.state.role === "manager")}
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
                                        disabled={(this.state.role === "manager")}
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
                        <TabPane tab="Managers" disabled={(this.state.role === "manager")} key="3">
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
                        <TabPane tab="Delete" disabled={(this.state.role === "manager" || this.state.isCreating === true)}key="5">

                            <Popconfirm
                                title="Are you sure you want to delete this?"
                                onConfirm={this.handleDelete}
                                okText="Yes"
                                cancelText="No">
                                <button
                                    id="settingsButton"
                                    className={"small-10 button cell "}>
                                    Delete
                                </button>
                            </Popconfirm>

                        </TabPane>
                    </Tabs>
                </Form>
            </div>
        )
    }


    handleDelete(){
        deleteBar(this.props.match.params.id).then(response => {
            Notify("success","Your bar was succesfully deleted!",-1);
            this.props.history.push("/tipsy/myBars");
        }).catch(error => {
            Notify("error",error.message || 'Sorry! Something went wrong. Please try again!',-1);
        });
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
        var notOwner = true;

        if(this.state.isCreating === false){
            notOwner = (this.state.bar.owner.name !== name);
        }else{
            notOwner = (this.props.currentUser.name !== name);
        }

        if (this.state.workers.value.some(items => items['name'] === name) === false && this.state.managers.value.some(items => items['name'] === name) === false && notOwner) {
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
                Notify("success","Your bar was succesfully created!",-1);
                this.props.history.goBack();
            }).catch(error => {
                Notify("error",error.message || 'Sorry! Something went wrong. Please try again!',-1);
            });
        } else {
            changeBarSettings(this.props.match.params.id, barRequest).then(response => {
                Notify("success","Your bar was succesfully saved!",-1);
                this.props.history.goBack();
            }).catch(error => {
                Notify("error",error.message || 'Sorry! Something went wrong. Please try again!',-1);
            });
        }
    }

    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success');
    }
}

export default ConfigBarPage;
