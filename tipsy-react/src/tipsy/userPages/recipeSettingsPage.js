import React, {Component} from 'react';

class RecipeSettings extends Component {
    constructor(props) {
        super(props);
        //Initialize values for all fields
        this.state = {
            preview: null,
            profilePic: {
                value: ''
            },
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
                    Bar Settings
                </h1>

                <Avatar width={360} height={360} onCrop={this.onCrop} onClose={this.onClose}/>
                <img id="preview" src={this.state.preview} style={imgSize}/>
            </div>
        );
    }
}

export default RecipeSettings;