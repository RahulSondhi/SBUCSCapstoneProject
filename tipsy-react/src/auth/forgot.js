import React, {Component} from 'react';
import Tipsy from '../assets/Tipsy.svg';

import {forgot, checkEmailAvailability} from '../util/APIUtils';

import {Link} from 'react-router-dom';
import {Form, Input, Icon, notification} from 'antd';
const FormItem = Form.Item;

class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: {
                value: ''
            }
        }
        //Functions needed for this Forgot Class
        this.handleInputChange = this
            .handleInputChange
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

    /*
        Handle our submit
    */
    handleSubmit(event) {
        event.preventDefault();
        const forgotRequest = {
            email: this.state.email.value
        };
        forgot(forgotRequest).then(response => {
            notification.success({message: 'Tipsy App', description: "Password reset request submitted succesfully. Please check your email."});
        }).catch(error => {
            notification.error({
                message: 'Tipsy App',
                description: error.message || 'This email address was not found.'
            });
        });
    }
    /*
        returns true if the Form is invalid.
    */
    isFormInvalid() {
        return !(this.state.email.validateStatus === 'success');
    }

    render() {
        return (
            <div className="grid-x align-center-middle">

                {/* Logo */}
                <div className="loginHeader grid-x cell align-center-middle">
                    <img src={Tipsy} alt="TipsyLogo" className="small-12 cell"></img>
                </div>

                {/* Title */}
                <h1 className="caption small-12 medium-8 cell">
                    Forgot Password
                </h1>

                {/* Form */}
                <Form
                    onSubmit={this.handleSubmit}
                    className="small-12 medium-8 cell grid-x align-center-middle">

                    {/* Description */}
                    <h4 id="forgotDesc" className="small-8 cell">
                        Enter your email address and we will send you a link to reset your password.
                    </h4>

                    <FormItem
                        hasFeedback
                        validateStatus={this.state.email.validateStatus}
                        help={this.state.email.errorMsg}
                        className="small-8 cell">
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

                    <FormItem className="cell">
                        <button type="submit" disabled={this.isFormInvalid()} className="button">
                            Send
                        </button>
                    </FormItem>
                    <Link to="/login" className="link medium-3 cell">Already Registered?</Link>
                </Form>
            </div>
        );
    }

    validateEmail = (email) => {
        if (!email) {
            return {validateStatus: 'error', errorMsg: 'Email may not be empty'}
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if (!EMAIL_REGEX.test(email)) {
            return {validateStatus: 'error', errorMsg: 'Email not valid'}
        }

        return {validateStatus: null, errorMsg: null}
    }

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
            if (!response.available) {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'error',
                        errorMsg: 'This email was not found.'
                    }
                });
            } else {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
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

export default Forgot;
