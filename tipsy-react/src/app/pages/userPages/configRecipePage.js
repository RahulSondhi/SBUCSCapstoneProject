import React, {Component} from 'react';
import Navbar from '../navbar/navbar.js';

import {createRecipe, getRecipeProfile, changeRecipeSettings, deleteRecipe} from '../../util/APIUtils';
import {MakeProfImg, DynamicForm, ValidateName, ValidateDesc, Notify} from '../../util/constants';
import ErrorPage from '../../util/errorPage.js';

import {Form, Input, Icon, Tabs, Popconfirm} from 'antd';

import DynamicSteps from './dynamicSteps'

const FormItem = Form.Item;
const {TabPane} = Tabs;

class ConfigRecipePage extends Component {
    constructor(props) {
        super(props);
        //Initialize values for all fields

        this.state = {
            isLoading: true,
            type: this.props.type,
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
            equipmentProducts: {
                value: []
            },
            img: {
                value: ''
            },
            published: {
                value: false
            },
            newSteps: {
                value: false
            },
            newEquipment: {
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
        
        this.handleDelete = this
            .handleDelete
            .bind(this);
        this.handlePublish = this
            .handlePublish
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
        this.handleStepLoad = this
            .handleStepLoad
            .bind(this);
        this.handleEquipmentLoad = this
            .handleEquipmentLoad
            .bind(this);
    }

    componentDidMount() {

        if (this.state.type === "config" || this.state.type === "clone") {
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

            var tempTitle = "Editing " + response.name;
            var tempSubmit = "Save";
            var type = this.state.type;
            var published = response.published;

            if (this.state.type === "clone") {
                tempTitle = "Cloning " + response.name;
                tempSubmit = "Clone";
                published = false;
            }

            if(published === true){
                type = "publish";
            }

            var equipmentsAvailable = response
            .equipmentsAvailable
            .map(function (el) {
                return {
                    name: el.name,
                    img: el.img,
                    equipmentType: el.equipmentType.type
                }
            });

            var equipmentProducts = response
            .equipmentProducts
            .map(function (el) {
                return {
                    name: el.name,
                    img: el.img,
                    equipmentType: el.equipmentType.type,
                    tags: el.tags
                }
            });

            var steps = response
            .steps
            .map(function (el) {
                return {
                    action: el.action,
                    equipmentDoing: el.equipmentDoing,
                    equipmentProduct: el.equipmentProduct,
                    equipmentToDo: el.equipmentToDo,
                    unit: el.unit.name,
                    value: el.value
                }
            });

            this.setState({
                recipe: response,
                isLoading: false,
                type: type,
                page: {
                    title: tempTitle,
                    submit: tempSubmit
                },
                name: {
                    value: response.name,
                    validateStatus: 'success'
                },
                description: {
                    value: response.description
                },
                steps: {
                    value: steps
                },
                equipmentsAvailable: {
                    value: equipmentsAvailable
                },
                equipmentProducts: {
                    value: equipmentProducts
                },
                img: {
                    value: response.img
                },
                published: {
                    value: published
                },
                newSteps: {
                    value: false
                },
                newEquipment: {
                    value: false
                }
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
            <div className="grid-x grid-x-margin align-center-middle pageContainer">
                <Navbar/>
                <div className="grid-x align-center align-top cell page">
                <h1 className="caption cell configPageTitle">
                    {this.state.page.title}
                </h1>
                <div className="small-1 cell"></div>

                <Form
                    onSubmit={this.handleSubmit}
                    className="cell grid-x align-top configPageForm">

                    <Tabs className="tabsRecipeForm cell align-self-top" tabPosition="top" 
                        tabBarExtraContent={
                            <div className="grid-x align-center-middle cell">
                                <button
                                    type="submit"
                                    id="settingsButton"
                                    disabled={this.isFormInvalid()}
                                    onClick={this.disableButton}
                                    className="button small-12 cell">
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
                                    disabled={this.state.type === "publish"}
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
                                        disabled={this.state.type === "publish"}
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
                                        disabled={this.state.type === "publish"}
                                        onChange={(event) => this.handleInputChange(event, ValidateDesc)}/>
                                </FormItem>

                            </div>
                        </TabPane>
                        <TabPane tab="Equipment" disabled={this.state.type === "publish"} key="2">
                            <div className="grid-x align-center-middle cell">
                                <div className="grid-x align-center-middle cell">

                                    <h1 id="equipmentPageTitle" className="captionRed small-10 cell">Equipment</h1>

                                    <DynamicForm
                                        type="equipment"
                                        data={this.state.equipmentsAvailable.value}
                                        onUpdate={this.handleEquipmentLoad}
                                        validateAdd={this.validateEquipmentAdd}
                                        validateRemove={this.validateEquipmentRemove}
                                        className="cell"/>

                                </div>
                                
                            </div>
                        </TabPane>

                        <TabPane tab="Steps" disabled={this.state.type === "publish"} key="3">
                            <div className="grid-x grid-margin-x align-center-middle cell">

                                    <DynamicSteps
                                        data={this.state.steps.value}
                                        equipment={this.state.equipmentsAvailable.value}
                                        product={this.state.equipmentProducts.value}
                                        onUpdate={this.handleStepLoad}
                                        className="cell"/>

                            </div>
                        </TabPane>

                        <TabPane tab="Publish" disabled={this.state.type === "publish"} key="4">

                            <Popconfirm
                                title="Are you sure you want to publish this?"
                                onConfirm={this.handlePublish}
                                okText="Yes"
                                cancelText="No">
                                <button
                                    id="settingsButton"
                                    className={"small-10 button cell"}>
                                    Publish
                                </button>
                            </Popconfirm>

                        </TabPane>

                        <TabPane tab="Delete" disabled={this.state.type === "clone" || this.state.type === "create"} key="5">

                            <Popconfirm
                                title="Are you sure you want to delete this?"
                                onConfirm={this.handleDelete}
                                okText="Yes"
                                cancelText="No">
                                <button
                                    id="settingsButton"
                                    className={"small-10 button cell"}>
                                    Delete
                                </button>
                            </Popconfirm>

                        </TabPane>
                    </Tabs>

                </Form>
            </div>
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

    validateEquipmentAdd = (item) => {
        var equipment = this.state.equipmentsAvailable.value.some(items => items['name'] === item.name);
        var product = this.state.equipmentProducts.value.some(items => items['name'] === item.name);

        if ( equipment === false && product === false) {
            return true;
        } else {
            return false;
        }
    }

    validateEquipmentRemove = (item) => {
        var inStep = this.state.steps.value.some(step => {
            return (
                step.equipmentDoing === item.name || 
                step.equipmentToDo === item.name ||
                step.equipmentProduct === item.name
                );
        });
        return !inStep;
    }

    handleEquipmentLoad = () => {

        this.setState({
            newEquipment: {
                value: true
            }
        })

    }

    handleStepLoad = (type,step) => {
        var products = this.state.equipmentProducts.value;
        
        if(type === "add"){
            products.push(step.equipmentProduct);
            step.equipmentProduct = step.equipmentProduct.name;
        }else if(type === "remove"){
            products = (this.state.equipmentProducts.value).filter(equip => 
                { 
                    return equip.name !== step.equipmentProduct.name
                })
        }

        this.setState({
            newEquipment: {
                value: true
            },
            newSteps: {
                value: true
            },
            equipmentProducts:{
                value: products
            }
        })

    }

    handleDelete(event) {
        deleteRecipe(this.props.match.params.id).then(response => {
            Notify("success",response.message,-1);
            this.props.history.push("/tipsy/myRecipes");
        }).catch(error => {
            Notify("error",error.message.message,-1);
        });
    }

    handlePublish(event) {
        event.preventDefault();

        const recipeRequest = {
            name: this.state.name.value,
            description: this.state.description.value,
            published: true,
            img: this.state.img.value,
            steps: this.state.steps.value,
            equipmentsAvailable: this.state.equipmentsAvailable.value,
            equipmentProducts: this.state.equipmentProducts.value
        };


        if(this.state.type === "clone" || this.state.type === "create"){
            createRecipe(recipeRequest).then(response => {
                Notify("success",response.message,-1);
                this.props.history.goBack();
            }).catch(error => {
                Notify("error",error.message.message,-1);
            });
        }else{
            recipeRequest.newSteps = this.state.newSteps.value;
            recipeRequest.newEquipment = this.state.newEquipment.value;

            changeRecipeSettings(this.props.match.params.id, recipeRequest).then(response => {
                Notify("success",response.message,-1);
                this.props.history.goBack();
            }).catch(error => {
                Notify("error",error.message.message,-1);
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        var recipeRequest = {
            name: this.state.name.value,
            description: this.state.description.value,
            published: this.state.published.value,
            img: this.state.img.value,
            steps: this.state.steps.value,
            equipmentsAvailable: this.state.equipmentsAvailable.value,
            equipmentProducts: this.state.equipmentProducts.value,
        };

        if (this.state.type === "clone" || this.state.type === "create") {
            createRecipe(recipeRequest).then(response => {
                Notify("success",response.message,-1);
                this.props.history.goBack();
            }).catch(error => {
                Notify("error",error.message.message,-1);
            });
        } else {

            recipeRequest.newSteps = this.state.newSteps.value;
            recipeRequest.newEquipment = this.state.newEquipment.value;

            changeRecipeSettings(this.props.match.params.id, recipeRequest).then(response => {
                Notify("success",response.message,-1);
                this.props.history.goBack();
            }).catch(error => {
                Notify("error",error.message.message,-1);
            });
        }
    }

    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success');
    }

}

export default ConfigRecipePage;
