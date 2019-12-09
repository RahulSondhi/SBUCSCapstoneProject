import React, { Component } from 'react';

import {Link} from 'react-router-dom';

import Tipsy from '../assets/Tipsy.svg';
import brokenGlass from '../assets/errorPage/broken_glass.svg';
import brokenLink from '../assets/errorPage/broken_link.svg';

class ErrorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status : this.props.status,
            message : this.props.message
        }
        this.goBack = this.goBack.bind(this);
    }

    goBack(){
        this.props.history.goBack();
    }
    
    render() {
        const error = this.state.status === 500
            ? "Internal Server Error"
            : "Resource Not Found" ;
        const errorImg = this.state.status === 500
            ? <img src={brokenGlass} alt="BrokenGlassLogo"/>
            : <img src={brokenLink} alt="BrokenLinkLogo"/>;
        return (
        <div className="grid-y align-center-middle">

            <div className="loginHeader grid-x cell align-center-middle">
                <img src={Tipsy} alt="TipsyLogo" className="small-12 cell"></img>
            </div>

            <h1 className="caption">
                {this.state.status} {error}
            </h1>
            {errorImg}
            <h2 className="caption">
                Error Message
            </h2>
            <h3 className="errorCaption caption">
                {this.state.message}
            </h3>
            <Link className="button" onClick={this.goBack}>Go Back</Link>
            <Link to='/tipsy/search' className="button">
                Home Page</Link>
        </div>  
        )
    }
}

export default ErrorPage;