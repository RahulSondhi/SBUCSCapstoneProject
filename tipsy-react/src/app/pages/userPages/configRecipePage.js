import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom'
import Navbar from '../navbar/navbar.js';

import {createRecipe, getRecipeProfile, changeRecipeSettings} from '../../util/APIUtils';
import {MakeProfImg, DynamicForm, ValidateName, ValidateDesc, Notify} from '../../util/constants';

import {Form, Input, Icon, Tabs} from 'antd';

import CustomEquipmentPrompt from './customEquipmentPrompt'

const FormItem = Form.Item;
const {TabPane} = Tabs;

class ConfigRecipePage extends Component {
    constructor(props) {
        super(props);
        //Initialize values for all fields

        this.state = {
            isLoading: true,
            isCreating: this.props.isCreating,
            recipe: null,
            page: {
                title: "Create a Recipe",
                submit: "Create a Recipe"
            },
            name: {
                value: ''
            },
            description: {
                value: ''
            },
            steps: {
                value: []
            },
            equipmentsAvailable: {
                value: []
            },
            img: {
                value: ''
            },
            published: {
                value: false
            }
        }
        //Functions needed for this Settings Class
        this.handleInputChange = this
            .handleInputChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
        this.isFormInvalid = this
            .isFormInvalid
            .bind(this);
        this.handleImageLoad = this
            .handleImageLoad
            .bind(this);
        this.loadRecipeProfile = this
            .loadRecipeProfile
            .bind(this);
        this.handleListLoad = this
            .handleListLoad
            .bind(this);
        this.addEquipmentButton= this
            .addEquipmentButton
            .bind(this);
    }

    componentDidMount() {

        if (this.state.isCreating === false) {
            let try_name = this.props.match.params.id;
            const id = try_name;
            this.loadRecipeProfile(id);
        } else {
            this.setState({isLoading: false});
        }

    }

    loadRecipeProfile(id) {
        this.setState({isLoading: true});

        getRecipeProfile(id).then(response => {

            const tempTitle = "Editing " + response.name;

            this.setState({
                recipe: response,
                isLoading: false,
                page: {
                    title: tempTitle,
                    submit: "Save Recipe"
                },
                name: {
                    value: response.name,
                    validateStatus: 'success'
                },
                description: {
                    value: response.description
                },
                steps: {
                    value: response.steps
                },
                equipmentsAvailable: {
                    value: response.equipmentsAvailable
                },
                img: {
                    value: response.img
                },
                published: {
                    value: response.published
                }
            });

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

                    <Tabs className="tabsRecipeForm small-12 medium-10 cell" tabPosition="top">
                        <TabPane tab="Desc" key="1">
                            <div className="grid-x grid-margin-x align-center-middle cell">

                                <MakeProfImg
                                    pic={this.state.img.value}
                                    className="cell"
                                    data={this.handleImageLoad}
                                    type="recipe"/>

                                <FormItem
                                    label="Name"
                                    validateStatus={this.state.name.validateStatus}
                                    help={this.state.name.errorMsg}
                                    className="small-12 medium-6 cell">
                                    <Input
                                        prefix={< Icon type = "idcard" />}
                                        name="name"
                                        autoComplete="off"
                                        placeholder="Enter Recipe Name"
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

                                <div className="cell"></div>

                                <FormItem
                                    label="Published"
                                    validateStatus={this.state.published.validateStatus}
                                    help={this.state.published.errorMsg}
                                    className="small-12 medium-10 cell">

                                    <select
                                        name="published"
                                        value={this.state.published.value}
                                        onChange={(event) => this.handleInputChange(event, function(){return true;})}>
                                        <option value="true">Public (You will not be able to edit if public)</option>
                                        <option value="false">Private (You will be only one able to view this)</option>
                                    </select>

                                </FormItem>

                            </div>
                        </TabPane>
                        <TabPane tab="Equipment" key="2">
                            <div className="grid-x grid-margin-x align-center-middle cell">

                                <DynamicForm
                                    type="equipment"
                                    data={this.state.equipmentsAvailable.value}
                                    onUpdate={this.handleListLoad}
                                    validate={this.validateRecipeAdd}
                                    customButtonData = {this.addEquipmentButton}
                                    className="cell"/>

                            </div>
                        </TabPane>

                        <TabPane tab="Steps" key="3">
                            <div className="grid-x grid-margin-x align-center-middle cell">

                                {/* <DynamicForm
                                    type="user"
                                    data={this.state.workers.value}
                                    onUpdate={this.handleListLoad}
                                    validate={this.validateUserAdd}
                                    className="cell"/> */}

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

                </Form>
            </div>
        )
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

    validateRecipeAdd = (name) => {
        if (this.state.equipmentsAvailable.value.some(items => items['name'] === name) === false) {
            return true;
        } else {
            return false;
        }
    }

    handleListLoad = () => {
        
    }

    handleSubmit(event) {
        event.preventDefault();

        const recipeRequest = {
            name: this.state.name.value,
            description: this.state.description.value,
            published: this.state.published.value,
            img: this.state.img.value,
            steps: this.state.steps.value,
            equipmentsAvailable: this.state.equipmentsAvailable.value
        };

        if (this.state.isCreating === true) {
            createRecipe(recipeRequest).then(response => {
                Notify("success","Your recipe was succesfully created!",-1);
            }).catch(error => {
                Notify("error",error.message || 'Sorry! Something went wrong. Please try again!',-1);
            });
        } else {
            changeRecipeSettings(this.props.match.params.id, recipeRequest).then(response => {
                Notify("success","Your recipe was succesfully saved!",-1);
            }).catch(error => {
                Notify("error",error.message || 'Sorry! Something went wrong. Please try again!',-1);
            });
        }
    }

    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success');
    }

    addEquipmentButton(){
        return(  <CustomEquipmentPrompt add={function(item){console.log(item)}}/> );
    }

}

export default ConfigRecipePage;
