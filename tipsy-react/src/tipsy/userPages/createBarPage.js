import React, {Component} from 'react';
import {Redirect, NavLink} from 'react-router-dom'
import Navbar from '../navbar/navbar.js';
import {getUserSettings} from '../../util/APIUtils';

import {NAME_MIN_LENGTH, NAME_MAX_LENGTH, DESC_MAX_LENGTH, MakeProfImg,DynamicField} from '../../main/constants';

import {Form, Input, Icon, notification} from 'antd';
const FormItem = Form.Item;

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
            owner:{
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
            img: this.state.img.value,
        };

        // changeUserSettings(settingsRequest).then(response => {
        //     notification.success({message: 'Tipsy App', description: "Your settings were succesfully changed!"});
        // }).catch(error => {
        //     notification.error({
        //         message: 'Tipsy App',
        //         description: error.message || 'Sorry! Something went wrong. Please try again!'
        //     });
        // });
    }

    isFormInvalid() {
        return !(
            this.state.name.validateStatus === 'success'
            );
    }

    render() {
        return (
            <div className="grid-x align-center-middle">
                <Navbar/>

                <h1 className="caption align-center-middle cell">
                    Create a Bar
                </h1>

                <MakeProfImg
                    pic={this.state.img.value}
                    className="cell"
                    data={this.handleImageLoad}/>

                <Form
                    onSubmit={this.handleSubmit}
                    className="small-12 medium-8 cell grid-x align-center-middle">
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
                            onChange={(event) => this.handleInputChange(event, this.validatename)}/>
                    </FormItem>

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
                            onChange={(event) => this.handleInputChange(event, this.validatename)}/>
                    </FormItem>

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
}

export default CreateBarPage;
