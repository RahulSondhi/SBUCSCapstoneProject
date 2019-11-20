import React, {Component} from 'react';
import {Redirect, NavLink} from 'react-router-dom'
import Navbar from '../navbar/navbar.js';
import {getUserSettings, changeUserSettings, checkEmailAvailability} from '../../util/APIUtils';

import {Enum} from 'enumify';

import {
    FIRSTNAME_MIN_LENGTH,
    FIRSTNAME_MAX_LENGTH,
    LASTNAME_MIN_LENGTH,
    LASTNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    MakeProfImg
} from '../../main/constants';

import {Form, Input, Icon, notification, Select} from 'antd';
const FormItem = Form.Item;
const {Option} = Select;

class MeasurementType extends Enum {}
MeasurementType.initEnum(['US', 'METRIC'])

class SettingsPage extends Component {

    constructor(props) {
        super(props);
        //Initialize values for all fields
        this.state = {
            isLoading: true,
            preview: null,
            firstName: {
                value: ''
            },
            lastName: {
                value: ''
            },
            email: {
                value: ''
            },
            oldemail: {
                value: ''
            },
            profilePic: {
                value: ''
            },
            measurement: {
                value: '',
                enum_value: ''
            }
        }
        //Functions needed for this Settings Class
        this.handleInputChange = this
            .handleInputChange
            .bind(this);
        this.handleSelectChange = this
            .handleSelectChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
        this.validateEmailAvailability = this
            .validateEmailAvailability
            .bind(this);
        this.isFormInvalid = this
            .isFormInvalid
            .bind(this);
        this.handleImageLoad = this
            .handleImageLoad
            .bind(this);
    }

    /*
        Handle changes from the form and update our fields
    */
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

    handleSelectChange(event) {
        this.setState({
            measurement: {
                enum_value: event.name,
                value: event.name
            }
        });
    }

    /*
    Handle our submit
    */
    handleSubmit(event) {
        event.preventDefault();
        const settingsRequest = {
            firstName: this.state.firstName.value,
            lastName: this.state.lastName.value,
            email: this.state.email.value,
            profilePic: this.state.profilePic.value,
            measurement: this.state.measurement.value
        };
        changeUserSettings(settingsRequest).then(response => {
            notification.success({message: 'Tipsy App', description: "Your settings were succesfully changed!"});
        }).catch(error => {
            notification.error({
                message: 'Tipsy App',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }
    /*
        returns true if the Form is invalid.
    */
    isFormInvalid() {
        return !(this.state.firstName.validateStatus === 'success' && this.state.lastName.validateStatus === 'success' && this.state.email.validateStatus === 'success');
    }

    loadUserSettings() {
        this.setState({isLoading: true});

        getUserSettings().then(response => {

            if (response.measurement === null || response.measurement === "") {
                response.measurement = MeasurementType.US;
            } else if (response.measurement === "US") {
                response.measurement = MeasurementType.US;
            } else if (response.measurement === "METRIC") {
                response.measurement = MeasurementType.METRIC;
            }

            this.setState({
                firstName: {
                    value: response.firstName,
                    validateStatus: 'success',
                    errorMsg: null
                },
                lastName: {
                    value: response.lastName,
                    validateStatus: 'success',
                    errorMsg: null
                },
                oldemail: {
                    value: response.email,
                    validateStatus: 'success',
                    errorMsg: null
                },
                email: {
                    value: response.email,
                    validateStatus: 'success',
                    errorMsg: null
                },
                profilePic: {
                    value: response.profilePic,
                    validateStatus: 'success',
                    errorMsg: null
                },
                measurement: {
                    enum_value : response.measurement,
                    value: response.measurement.name,
                    validateStatus: 'success',
                    errorMsg: null
                },
                isLoading: false
            });
        }).catch(error => {
            console.log(error);
            if (error.status === 404) {
                this.setState({notFound: true, isLoading: false});
            } else {
                this.setState({serverError: true, isLoading: false});
            }
        });
    }

    componentDidMount() {
        this.loadUserSettings();
    }

    handleImageLoad = (val) => {
        this.setState({
            profilePic:{value: val.replace(/^data:image\/(png|jpg);base64,/, "")}
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
                    Settings
                </h1>

                <MakeProfImg type="user" pic={this.state.profilePic.value} className="cell" data={this.handleImageLoad}/>

                <Form
                    onSubmit={this.handleSubmit}
                    className="small-12 medium-8 cell grid-x align-center-middle">
                    <FormItem
                        label="First Name"
                        validateStatus={this.state.firstName.validateStatus}
                        help={this.state.firstName.errorMsg}
                        className="medium-3 cell">
                        <Input
                            prefix={< Icon type = "idcard" />}
                            name="firstName"
                            autoComplete="off"
                            placeholder="Enter First Name"
                            value={this.state.firstName.value}
                            onChange={(event) => this.handleInputChange(event, this.validateFirstName)}/>
                    </FormItem>

                    {/* Place Holder DO NOT DELETE */}
                    <div className="medium-2 cell"></div>

                    <FormItem
                        label="Last Name"
                        validateStatus={this.state.lastName.validateStatus}
                        help={this.state.lastName.errorMsg}
                        className="medium-3 cell">
                        <Input
                            prefix={< Icon type = "idcard" />}
                            name="lastName"
                            autoComplete="off"
                            placeholder="Enter Last Name"
                            value={this.state.lastName.value}
                            onChange={(event) => this.handleInputChange(event, this.validateFirstName)}/>
                    </FormItem>

                    <FormItem
                        label="Email"
                        hasFeedback
                        validateStatus={this.state.email.validateStatus}
                        help={this.state.email.errorMsg}
                        className="medium-8 cell">
                        <Input
                            prefix={< Icon type = "mail" />}
                            name="email"
                            type="email"
                            autoComplete="off"
                            placeholder="Enter email"
                            value={this.state.email.value}
                            onBlur={this.validateEmailAvailability}
                            onChange={(event) => this.handleInputChange(event, this.validateEmail)}/>
                    </FormItem>

                    <FormItem label="Measurements" className="small-8 cell">
                        <Select
                            placeholder="Select your Measurement"
                            name="measurement"
                            onChange={(event) => this.handleSelectChange(event)}
                            defaultValue={this.state.measurement.enum_value}>
                            <Option value={MeasurementType.US} name="US">
                                US System (fl oz.)
                            </Option>
                            <Option value={MeasurementType.METRIC} name="METRIC">
                                Metric System (ml)
                            </Option>
                        </Select>
                    </FormItem>

                    <FormItem className="small-12 medium-5 cell">
                        <button
                            type="submit"
                            id="settingsButton"
                            disabled={this.isFormInvalid()}
                            onClick={this.disableButton}
                            className="button">
                            Update Settings
                        </button>
                    </FormItem>
                    <FormItem className="small-12 medium-6 cell">
                        <NavLink 
                         to="/tipsy/user/stg/changePassword"
                         id="passwordButton" className="button">
                            Change Password
                        </NavLink>
                    </FormItem>
                </Form>
            </div>
        );
    }

    // Functions performed after page is rendered Frontend Validation Functions

    validateFirstName = (firstName) => {
        if (firstName.length < FIRSTNAME_MIN_LENGTH) {
            return {validateStatus: 'error', errorMsg: `First name is too short (Minimum ${FIRSTNAME_MIN_LENGTH} characters needed.)`}
        } else if (firstName.length > FIRSTNAME_MAX_LENGTH) {
            return {validationStatus: 'error', errorMsg: `First name is too long (Maximum ${FIRSTNAME_MAX_LENGTH} characters allowed.)`}
        } else {
            return {validateStatus: 'success', errorMsg: null};
        }
    }

    validateLastName = (lastName) => {
        if (lastName.length < LASTNAME_MIN_LENGTH) {
            return {validateStatus: 'error', errorMsg: `Last name is too short (Minimum ${LASTNAME_MIN_LENGTH} characters needed.)`}
        } else if (lastName.length > LASTNAME_MAX_LENGTH) {
            return {validationStatus: 'error', errorMsg: `Last name is too long (Maximum ${LASTNAME_MAX_LENGTH} characters allowed.)`}
        } else {
            return {validateStatus: 'success', errorMsg: null};
        }
    }

    validateEmail = (email) => {
        if (!email) {
            return {validateStatus: 'error', errorMsg: 'Email may not be empty'}
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if (!EMAIL_REGEX.test(email)) {
            return {validateStatus: 'error', errorMsg: 'Email not valid'}
        }

        if (email.length > EMAIL_MAX_LENGTH) {
            return {validateStatus: 'error', errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`}
        }

        return {validateStatus: null, errorMsg: null}
    }

    // Backend Validation Functions

    validateEmailAvailability() {
        // First check for client side errors in email
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);


        if (emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });
            return;
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkEmailAvailability(emailValue).then(response => {
            if (response.available) {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                if(emailValue === this.state.oldemail.value){
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'success',
                            errorMsg: null
                        }
                    });
                }
                else{
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'error',
                            errorMsg: 'This Email is already registered'
                        }
                    });
                }
            }
        }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }
}

export default SettingsPage;