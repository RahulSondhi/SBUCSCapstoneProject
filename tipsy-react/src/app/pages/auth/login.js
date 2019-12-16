import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {login} from '../../util/APIUtils';
import {ACCESS_TOKEN, Notify} from '../../util/constants';

import Tipsy from '../../assets/Tipsy.svg';
import Drinks from '../../assets/drinks.svg';

import {Form, Input, Icon} from 'antd';
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

    async handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
                if (!err) {
                    const loginRequest = Object.assign({}, values);
                    // Clear the values from the component, not needed anymore
                    login(loginRequest) //JSON to backend
                        .then(response => {
                        localStorage.setItem(ACCESS_TOKEN, response.accessToken); //get the token and save it
                        this.props.onLogin();
                    }).catch(error => {
                        Notify("error",error.message.message || 'Sorry! Something went wrong. Please try again!',-1);
                    });
                }
            });
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div className="grid-x align-center-middle">

                {/* Logo */}
                <div className="loginHeader grid-x small-8 cell align-center-middle">
                    <img src={Tipsy} alt="TipsyLogo" className="small-8 cell"></img>
                </div>

                <div className="cell" />

                {/* Title */}
                <h1 className="caption small-12 medium-8 cell">Sign In</h1>

                {/* Form */}
                <Form
                    onSubmit={this.handleSubmit}
                    className="small-12 medium-8 cell grid-x align-center-middle">
                    <FormItem className="medium-8 cell">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your email!'
                                }
                            ]
                        })(
                            <Input
                                prefix={< Icon type = "mail" />}
                                name="email"
                                type="email"
                                placeholder="Enter Email"
                                className="form-icons"/>
                        )}
                    </FormItem>
                    <FormItem
                        className="medium-8 cell">
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your Password!'
                                }
                            ]
                        })(
                            <Input.Password
                                prefix={< Icon type = "lock" />}
                                name="password"
                                type="password"
                                placeholder="Enter Password"
                                className="form-icons"/>
                        )}
                    </FormItem>

                    <FormItem className="cell">
                        <button type="submit" className="button">Login</button>
                    </FormItem>

                    <Link to="/register" className="link medium-3 cell">
                        Register
                    </Link>
                    <span className="medium-1 medium-offset-1 cell">
                        or</span>
                    <Link to="/forgot" className="link medium-3 medium-offset-1 cell">
                        Forgot Password?
                    </Link>
                </Form>

                {/* Drinks Footer */}
                <div id="loginDrinks" className="grid-x cell align-center-middle">
                    <img src={Drinks} className="small-12 cell" alt="DrinksLogo"></img>
                </div>
            </div>
        );
    }
}

export default Login;
