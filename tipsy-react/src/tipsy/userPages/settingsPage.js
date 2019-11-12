import React, {Component} from 'react';
import Navbar from '../navbar/navbar.js';
import Avatar from 'react-avatar-edit';

const imgSize = {
    height: "360px",
    width: "360px"
}

class SettingsPage extends Component {

    constructor(props) {
        super(props);
        //Initialize values for all fields
        this.state = {
            preview: null,
            email: {
                value: ''
            },
            password: {
                value: ''
            },
            profilePic: {
                value: ''
            },
            units: {
                value: ''
            },
            name: {
                value: ''
            }
        }

        this.handleSubmit = this
            .handleSubmit
            .bind(this);
        this.onClose = this
            .onClose
            .bind(this);
        this.onCrop = this
            .onCrop
            .bind(this);
    }

    handleSubmit(event) {}

    onClose() {
        this.setState({preview: null})
    }

    onCrop(preview) {
        this.setState({preview})
    }

    render() {
        return (
            <div className="grid-container-fluid grid-frame grid-y">
                <Navbar/>
                <h1 className="caption align-center-middle">
                    Settings
                </h1>

                <Avatar
                    width={360}
                    height={360}
                    onCrop={this.onCrop}
                    onClose={this.onClose}/>
                <img id="preview" src={this.state.preview} style={imgSize} alt="preview"/>
            </div>
        );
    }
}

export default SettingsPage;