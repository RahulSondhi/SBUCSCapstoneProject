import React, {Component} from 'react';
import '../../index.css';
import {SVG, TipsyStyle} from '../../constants/constants.js';
import Tipsy from '../../assets/Tipsy.svg';
import './forgot.css';

import { forgot, checkEmailAvailability } from '../../util/APIUtils';

import { Link } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';
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
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);

    }

    /*
        Handle changes from the form and update our fields
    */
    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
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
        forgot(forgotRequest)
        .then(response => {
            notification.success({
                message: 'Tipsy App',
                description: "Password reset request submitted succesfully. Please check your email.",
            });          
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
        return !(this.state.email.validateStatus === 'success'
        );
    }

    render() {
        return (
            <div>
                <SVG src={Tipsy} style={TipsyStyle} alt="TipsyLogo"/>
                <h1>Forgot Password</h1>
                <h3>Please enter your email address to request a password reset email</h3>
                <Form onSubmit={this.handleSubmit} className="">
                    <FormItem 
                        label="Email"
                        hasFeedback
                        validateStatus={this.state.email.validateStatus}
                        help={this.state.email.errorMsg}>
                        <Input 
                            name="email" 
                            type="email" 
                            autoComplete="off"
                            placeholder="Enter email"
                            value={this.state.email.value} 
                            onBlur={this.validateEmailAvailability}
                            onChange={(event) => this.handleInputChange(event, this.validateEmail)} />    
                        </FormItem>
                    <FormItem>
                            <Button type="primary" 
                                htmlType="submit" 
                                disabled={this.isFormInvalid()}
                                className="button">Send 
                            </Button>
                            Already registered? <Link to="/login">Login now!</Link>
                        </FormItem>
                </Form>
            </div>
        );
    }

    validateEmail = (email) => {
        if(!email) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email may not be empty'                
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email not valid'
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    }

    validateEmailAvailability() {
        // First check for client side errors in email
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if(emailValidation.validateStatus === 'error') {
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

        checkEmailAvailability(emailValue)
        .then(response => {
            if(!response.available) {
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