import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {verifyConfirm, verifyNewEmail, verifyReset, resetPassword} from '../../util/APIUtils';
import {ACCESS_TOKEN, ValidatePassword, Notify, LINK_BASE} from '../../util/constants';

import Tipsy from '../../assets/Tipsy.svg';

import {Form, Input, Icon} from 'antd';
const FormItem = Form.Item;

class Verify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            flow: this.props.flow,
            message: '',
            uuid: {
                value: '',
                validateStatus: null
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            },
            passwordConfirm: {
                value: ''
            }
        }
        //Functions needed for this Verify Class
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.handleVerify = this.handleVerify.bind(this);
        
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

    UNSAFE_componentWillMount() {
        this.handleVerify();
    }

    /*
        Handle our submit 
    */
    handleSubmit(event) {
        event.preventDefault();
    
        const resetPasswordRequest = {
            uuid : this.state.uuid.value,
            password: this.state.password.value
        };
        resetPassword(resetPasswordRequest).then(response => {
            Notify("success",response.message,-1);
            this.props.history.push(LINK_BASE+"/logout");
        }).catch(error => {
            Notify("error",error.message.message,-1);
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

    handleVerify() {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        const uuidValue = params.get('token');
        console.log(uuidValue);
        console.log(this.state.flow);
        if(this.state.flow === "confirm"){
            //verifyConfirm
            verifyConfirm(uuidValue).then(response => {
                this.setState({
                    uuid: {
                        validateStatus : 'success'
                    },
                    message : response.message
                });
            }).catch(error => {
                this.setState({
                    uuid: {
                        validateStatus : 'error'
                    },
                    message : error.message.message
                });
            })
        }
        else if(this.state.flow === "newEmail"){
            //verifyNewEmail
            // We need to delete their access token
            if(localStorage.getItem(ACCESS_TOKEN)){
                localStorage.removeItem(ACCESS_TOKEN);
            }
            const emailValue = params.get('email');
            verifyNewEmail(uuidValue, emailValue).then(response =>{
                this.setState({
                    uuid: {
                        validateStatus : 'success'
                    },
                    message : response.message
                });
            }).catch(error => {
                this.setState({
                    uuid: {
                        validateStatus : 'error'
                    },
                    message : error.message.message
                }); 
            })
        }
        else if(this.state.flow === "reset"){
            //verifyReset
            verifyReset(uuidValue).then(response =>{
                Notify("success",response.message,-1);
                this.setState({
                    uuid: {
                        value: uuidValue,
                        validateStatus : 'success'
                    },
                    message : response.message
                });
            }).catch(error => {
                this.setState({
                    uuid: {
                        value: uuidValue,
                        validateStatus : 'error'
                    },
                    message : error.message.message
                });
            });
        }
        else {
            //login component
            this.props.history.push("/login");
            this.props.history.goForward();
        }

        this.setState({
            isLoading: false
        });

    }

    render() {
        // Checking if data came in
        if (this.state.isLoading) {
            return null
        }

        if (this.state.uuid.validateStatus === "success") {
            if(this.state.flow === "reset"){
                return ( //The token is valid, return the form to proceed with password reset
                    <div className="grid-x align-center-middle">
                        <h1 className="caption align-center-middle cell">
                            Reset Your Password
                        </h1>
                <h3 className="changePasswordTitle cell">{this.state.message}</h3>
                        <Form
                            onSubmit={this.handleSubmit}
                            className="small-12 medium-8 cell grid-x align-center-middle">
                            <FormItem
                                label="Password"
                                validateStatus={this.state.password.validateStatus}
                                help={this.state.password.errorMsg}
                                className="medium-8 cell">
                                <Input.Password
                                    prefix={< Icon type = "lock" />}
                                    name="password"
                                    type="password"
                                    autoComplete="off"
                                    placeholder="Enter Password"
                                    value={this.state.password.value}
                                    onChange={(event) => this.handleInputChange(event, ValidatePassword)}/>
                            </FormItem>

                            <FormItem
                                label="Confirm Password"
                                validateStatus={this.state.passwordConfirm.validateStatus}
                                help={this.state.passwordConfirm.errorMsg}
                                className="medium-8 cell">
                                <Input.Password
                                    prefix={< Icon type = "lock" />}
                                    name="passwordConfirm"
                                    type="password"
                                    autoComplete="off"
                                    placeholder="Confirm your password"
                                    value={this.state.passwordConfirm.value}
                                    onChange={(event) => this.handleInputChange(event, this.validatePasswordConfirm)}/>
                            </FormItem>

                            <FormItem className="cell">
                                <button type="submit" id="changePasswordButton" disabled={this.isFormInvalid()} onClick={this.disableButton} className="button">
                                    Change Password
                                </button>
                            </FormItem>
                        </Form>
                    </div>
                );
            }
            else {
                return (
                    <div className="grid-x align-center-middle">

                    {/* Logo */}
                    <div className="loginHeader grid-x cell align-center-middle">
                        <img src={Tipsy} alt="TipsyLogo" className="small-12 cell"></img>
                    </div>

                    {/* Title */}
                    <h1 className="caption small-12 medium-8 cell">Welcome to Tipsy!</h1>

                    {/* Description */}
                    <h4 id="forgotDesc" className="small-8 cell">
                        {this.state.message}
                        <br></br>
                        <br></br>
                        Login to your account to start!
                    </h4>

                    <Link to="/logout" className="cell">
                        <button type="submit" className="button">Login</button>
                    </Link>

                </div>
                )
            }
        } else {
            return (
                <div className="grid-x align-center-middle">

                    {/* Logo */}
                    <div className="loginHeader grid-x cell align-center-middle">
                        <img src={Tipsy} alt="TipsyLogo" className="small-12 cell"></img>
                    </div>

                    {/* Title */}
                    <h1 className="captionRed small-12 medium-8 cell">Invalid Token!</h1>
                                        {/* Description */}
                    <h4 id="forgotDesc" className="small-8 cell">
                        {this.state.message}
                        <br></br>
                        <br></br>
                    </h4>
                    <Link to="/logout" className="cell">
                        <button type="submit" className="button">Login</button>
                    </Link>
                </div>
            );
        }
    }

    validatePasswordConfirm = (passwordConfirm) => {
        const passwordValue = this.state.password.value;
        if (passwordConfirm !== passwordValue) {
            return {validateStatus: 'error', errorMsg: `Passwords do not match`}
        } else {
            return ValidatePassword(passwordConfirm)
        }
    }

}
export default Verify;