import React, {Component} from 'react';
import {CustomButton} from '../js/constants.js';
import {login} from '../util/APIUtils';
import Tipsy from '../assets/Tipsy.svg';
import Drinks from '../assets/drinks.svg';

import {ACCESS_TOKEN} from '../js/constants.js';
import {Link} from 'react-router-dom';
import {Form, Input, Icon, notification} from 'antd';
const FormItem = Form.Item;

class Login extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm);
        return (<AntWrappedLoginForm onLogin={this.props.onLogin}/>);
    }
}

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this
            .props
            .form
            .validateFields((err, values) => {
                if (!err) {
                    const loginRequest = Object.assign({}, values);
                    login(loginRequest) //JSON to backend
                        .then(response => {
                        localStorage.setItem(ACCESS_TOKEN, response.accessToken); //get the token and save it
                        this.props.onLogin();
                    }).catch(error => {
                        if (error.status === 401) {
                            notification.error({message: 'Tipsy App', description: 'Your Email or Password is incorrect. Please try again!'});
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
        const {getFieldDecorator} = this.props.form;
        return (
            <div
                className="container grid-container grid-x align-center-middle grid-padding-y">
                <div className="header grid-x grid-margin-y">
                    <img src={Tipsy} alt="TipsyLogo" className=" small-12 cell"></img>
                </div>
                <h1 className="caption">
                    Login your account
                </h1>
                <Form
                    onSubmit={this.handleSubmit}
                    className="grid-x align-middle grid-margin-y">
                    <FormItem label="Email" className="inputLabel  medium-offset-2 medium-8 cell">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your email!'
                                }
                            ]
                        })(
                            <Input
                                prefix={< Icon type = "user" />}
                                name="email"
                                type="email"
                                placeholder="Enter Email"/>
                        )}
                    </FormItem>
                    <FormItem
                        label="Password"
                        className="inputLabel  medium-offset-2 medium-8 cell">
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
                    <Link to="forgot" className="link  medium-12 cell">
                        Forgot Password?
                    </Link>
                    <br></br>
                    <div className="grid-x align-middle grid-margin-y medium-12 cell">

                        {/* <FormItem> */}
                        <div className=" small-offset-2 small-4 cell">
                            <FormItem>
                                <CustomButton redirect="/register" name="Register"/>
                            </FormItem>
                        </div>
                        <div className=" small-4 cell">
                            <FormItem>
                                <button type="submit" className="button">Login</button>
                            </FormItem>
                        </div>
                    </div>
                </Form>
                <div className="footer grid-x grid-margin-y">
                    <img src={Drinks} alt="DrinksLogo"></img>
                </div>
            </div>
        );
    }
}

export default Login;
