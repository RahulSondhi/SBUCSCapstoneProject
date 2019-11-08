import React, {Component} from 'react';
import {SVG, SmallTipsyStyle, TipsyStyle, CustomButton} from '../js/constants.js';
import Tipsy from '../assets/Tipsy.svg';

import { validateConfirm } from '../util/APIUtils';


class Confirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: {
                value: '',
                validateStatus: null,
                errorMsg: null
            }
        }
        //initialize the uuid
        let search = window.location.search;
        let params = new URLSearchParams(search); 
        this.state.uuid.value = params.get('token');
        //Functions needed for this Confirm Class
        this.handleValidateConfirm = this.handleValidateConfirm.bind(this);
    }

    componentWillMount(){
        this.handleValidateConfirm();
    }

    handleValidateConfirm(){
        const uuidValue = this.state.uuid.value;

        validateConfirm(uuidValue)
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

    render() {
        if(this.state.uuid.validateStatus === 'success'){
            return (
                <div>
                    <SVG src={Tipsy} style={TipsyStyle} alt="TipsyLogo"/>
                    <h1 className="caption">Confirmation</h1>
                    <h3>You have successfully registered with
                        <SVG src={Tipsy} style={SmallTipsyStyle} alt="TipsyLogo"/></h3>
                    <h4>You can now login with your email
                    </h4>
                    <br/>
                    <CustomButton redirect="/" name="Login"/>
                </div>
            )
        }
        else{
            return ( //The token is invalid, return an error page
                <div>
                    <SVG src={Tipsy} style={TipsyStyle} alt="TipsyLogo"/>
                    <h1>Invalid Reset token :(</h1>
                </div>
            );
        }
    }
}

export default Confirm;