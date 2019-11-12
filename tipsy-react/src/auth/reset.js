import React, {Component} from 'react';

import { resetPassword, validateReset} from '../util/APIUtils';

import {
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../main/constants';
import { Form, Input, Button, notification } from 'antd';
const FormItem = Form.Item;

class Reset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: {
                value: '',
                validateStatus: null,
                errorMsg: null
            },
            password: {
                value: ''
            },
            passwordConfirm: {
                value: ''
            }
        }
        //initialize the uuid
        let search = window.location.search;
        let params = new URLSearchParams(search);
        this.state.uuid.value = params.get('token');
        //Functions needed for this Reset Class
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.handleValidateReset = this.handleValidateReset.bind(this);
    }

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

    componentWillMount(){
        this.handleValidateReset();
    }
    handleValidateReset(){
        const uuidValue = this.state.uuid.value;

        validateReset(uuidValue)
        .then(response => {
            if(response.valid){
                this.setState({
                    uuid: {
                        value: uuidValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    uuid: {
                        value: uuidValue,
                        validateStatus: 'error',
                        errorMsg: 'This token is not valid!'
                    }
                });
            }
        }).catch(error => {
            // Marking validateStatus as error, Form can not contact the server
            this.setState({
                uuid: {
                    value: uuidValue,
                    validateStatus: 'error',
                    errorMsg: 'Could not contact the server'
                }
            });
        });
    }

    /*
        Handle our submit 
    */
    handleSubmit(event) {
        event.preventDefault();
    
        const resetPasswordRequest = {
            uuid : this.state.uuid.value ,
            password: this.state.password.value
        };
        resetPassword(resetPasswordRequest)
        .then(response => {
            notification.success({
                message: 'Tipsy App',
                description: "Thank you! We have reset your password. You may now login.",
            });          
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
        return !(
            this.state.password.validateStatus === 'success' &&
            this.state.passwordConfirm.validateStatus === 'success'
        );
    }
    
    render() {
        if(this.state.uuid.validateStatus === 'success'){
            return ( //The token is valid, return the form to proceed with password reset
                    <div>
                        {/* <SVG src={Tipsy} style={TipsyStyle} alt="TipsyLogo"/> */}
                        <h1>Reset Password</h1>
                        <h3>Please enter a new password to login.</h3>
                        <Form onSubmit={this.handleSubmit} className="">
                            <FormItem 
                                label="Password"
                                validateStatus={this.state.password.validateStatus}
                                help={this.state.password.errorMsg}>
                                <Input 
                                    name="password" 
                                    type="password"
                                    autoComplete="off"
                                    placeholder="Enter Password" 
                                    value={this.state.password.value} 
                                    onChange={(event) => this.handleInputChange(event, this.validatePassword)} />    
                            </FormItem>
                            <FormItem 
                                label="Confirm Password"
                                validateStatus={this.state.passwordConfirm.validateStatus}
                                help={this.state.passwordConfirm.errorMsg}>
                                <Input 
                                    name="passwordConfirm" 
                                    type="password"
                                    autoComplete="off"
                                    placeholder="Confirm your password" 
                                    value={this.state.passwordConfirm.value} 
                                    onChange={(event) => this.handleInputChange(event, this.validatePasswordConfirm)} />    
                            </FormItem>
                            <FormItem>
                                <Button type="primary" 
                                    htmlType="submit" 
                                    disabled={this.isFormInvalid()}>Reset 
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                );
            }
            else{
                return ( //The token is invalid, return an error page
                    <div>
                        {/* <SVG src={Tipsy} style={TipsyStyle} alt="TipsyLogo"/> */}
                        <h1>Invalid Reset token :(</h1>
                    </div>
                );
            }
    }

    validatePassword = (password) => {
        if(password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };            
        }
    }

    validatePasswordConfirm = (passwordConfirm) => {
        const passwordValue = this.state.password.value;
        if(passwordConfirm !== passwordValue){
            return {
                validateStatus: 'error',
                errorMsg: `Passwords do not match`
            }
        }
        else{
            return this.validatePassword(passwordConfirm)
        }
    }

}

export default Reset;