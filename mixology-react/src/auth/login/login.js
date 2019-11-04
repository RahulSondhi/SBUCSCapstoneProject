import React, {Component} from 'react';
import {SVG, TipsyStyle, DrinksStyle, CustomButton} from '../../constants/constants.js';
import { login } from '../../util/APIUtils';
import Tipsy from '../../assets/Tipsy.svg';
import Drinks from '../../assets/drinks.svg';
import '../../index.css';
import './login.css';

import { ACCESS_TOKEN } from '../../constants/constants.js';
import { Link } from 'react-router-dom';
import { Form, Input, Icon, notification } from 'antd';
const FormItem = Form.Item;

class Login extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm);   
        return (
            <AntWrappedLoginForm onLogin={this.props.onLogin} />
        );
    }
}

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest) //JSON to backend
                .then(response => {
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);  //get the token and save it
                    this.props.onLogin();
                }).catch(error => {
                    if(error.status === 401) {
                        notification.error({
                            message: 'Tipsy App',
                            description: 'Your Email or Password is incorrect. Please try again!'
                        });
                    } else {
                        notification.error({
                            message: 'Tipsy App',
                            description: error.message || 'Sorry! Something went wrong. Please try again!'
                        });
                    }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="container">
                <div className="logo">
                    <SVG src={Tipsy} style={TipsyStyle} alt="TipsyLogo"/>
                </div>
                <h3 className="caption loginCaption">Login to your account</h3>
                <Form onSubmit={this.handleSubmit} className="">
                    <FormItem label="Email" className="inputLabel">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your email!'
                                }
                            ]
                        })(
                            <Input prefix={< Icon type = "user" />} name="email" placeholder="Enter Email"/>
                        )}
                    </FormItem>
                    <FormItem label="Password" className="inputLabel">
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your Password!'
                                }
                            ]
                        })(
                            <Input
                                prefix={< Icon type = "lock" />}
                                size="large"
                                name="password"
                                type="password"
                                placeholder="Enter Password"/>
                        )}
                    </FormItem>
                    <Link to="forgot">
                        Forgot Password?
                    </Link>
                    <div className="grid-x grid-margin-x">

                        {/* <FormItem> */}
                        <div className="cell small-4">
                            <FormItem>
                                <CustomButton redirect="/register" name="Register"/>
                            </FormItem>
                        </div>
                        <div className="cell small-4"></div>
                        <div className="cell small-4">
                            <FormItem>
                                <button type="submit" className="button">Login</button>
                            </FormItem>
                        </div>
                    </div>
                </Form>
                <SVG src={Drinks} style={DrinksStyle} alt="DrinksLogo"/>
            </div>
        );
    }
}

export default Login;
