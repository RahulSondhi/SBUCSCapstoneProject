import React, {Component} from 'react';
import Tipsy from '../assets/Tipsy.svg';
import {Link} from 'react-router-dom';
import {validateConfirm} from '../util/APIUtils';

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
        this.handleValidateConfirm = this
            .handleValidateConfirm
            .bind(this);
    }

    componentWillMount() {
        this.handleValidateConfirm();
    }

    handleValidateConfirm() {
        const uuidValue = this.state.uuid.value;

        validateConfirm(uuidValue).then(response => {
            if (response.valid) {
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
        if (this.state.uuid.validateStatus === 'success') {
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
                        You have successfully registered your account!
                        <br></br>
                        <br></br>
                        Login to your account to start!
                    </h4>

                    <Link to="/login" className="cell">
                        <button type="submit" className="button">Login</button>
                    </Link>

                </div>
            )
        } else {
            return (
                <div className="grid-x align-center-middle">

                    {/* Logo */}
                    <div className="loginHeader grid-x cell align-center-middle">
                        <img src={Tipsy} alt="TipsyLogo" className="small-12 cell"></img>
                    </div>

                    {/* Title */}
                    <h1 className="captionRed small-12 medium-8 cell">Invalid Reset Token</h1>
                </div>
            );
        }
    }
}

export default Confirm;