import React, {Component} from 'react';
import {Redirect, NavLink} from 'react-router-dom'
import Navbar from '../navbar/navbar.js';
import {getUserSettings} from '../../util/APIUtils';

import {NAME_MIN_LENGTH, NAME_MAX_LENGTH, DESC_MAX_LENGTH, MakeProfImg, DynamicForm} from '../../main/constants';

import {Form, Input, Icon, Tabs, notification} from 'antd';

const FormItem = Form.Item;
const {TabPane} = Tabs;

class CreateBarPage extends Component {

    constructor(props) {
        super(props);
        //Initialize values for all fields
        this.state = {
            isLoading: true,
            name: {
                value: ''
            },
            description: {
                value: ''
            },
            owner: {
                value: ''
            },
            manager: {
                value: ''
            },
            worker: {
                value: ''
            },
            recipe: {
                value: ''
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
        this.isFormInvalid = this
            .isFormInvalid
            .bind(this);
        this.handleImageLoad = this
            .handleImageLoad
            .bind(this);
    }

    componentDidMount() {
        this.setState({
            owner: {
                value: this.props.currentUser.nickname
            }
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
            profilePic: {
                value: val.replace(/^data:image\/(png|jpg);base64,/, "")
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const settingsRequest = {
            name: this.state.name.value,
            description: this.state.description.value,
            owner: this.state.owner.value,
            manager: this.state.manager.value,
            worker: this.state.worker.value,
            recipe: this.state.recipe.value,
            img: this.state.img.value
        };

        // changeUserSettings(settingsRequest).then(response => {
        // notification.success({message: 'Tipsy App', description: "Your settings were
        // succesfully changed!"}); }).catch(error => {     notification.error({
        // message: 'Tipsy App',         description: error.message || 'Sorry! Something
        // went wrong. Please try again!'     }); });
    }

    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success');
    }

    render() {
        return (
            <div className="grid-x align-center-middle">
                <Navbar/>

                <h1 className="caption align-center-middle cell">
                    Create a Bar
                </h1>

                <Form
                    onSubmit={this.handleSubmit}
                    className="small-12 medium-8 cell grid-x align-center-middle">

                    <Tabs className="small-12 medium-10 cell" tabPosition="top">
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
                                        onChange={(event) => this.handleInputChange(event, this.validateName)}/>
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
                                        onChange={(event) => this.handleInputChange(event, this.validateDesc)}/>
                                </FormItem>

                            </div>
                        </TabPane>
                        <TabPane tab="Users" key="2">
                            <div className="grid-x grid-margin-x align-center-middle cell">

                                <DynamicForm type="user" onUpdate="" className="cell" />

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
                            Create a Bar
                        </button>
                    </FormItem>

                </Form>
            </div>
        )
    }

    validateName = (name) => {
        if (name.length < NAME_MIN_LENGTH) {
            return {validateStatus: 'error', errorMsg: `Bar name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`}
        } else if (name.length > NAME_MAX_LENGTH) {
            return {validationStatus: 'error', errorMsg: `Bar name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`}
        } else {
            return {validateStatus: 'success', errorMsg: null};
        }
    }

    validateDesc = (description) => {
        if (description.length > DESC_MAX_LENGTH) {
            return {validationStatus: 'error', errorMsg: `Description is too long (Maximum ${DESC_MAX_LENGTH} characters allowed.)`}
        } else {
            return {validateStatus: 'success', errorMsg: null};
        }
    }
}

export default CreateBarPage;
