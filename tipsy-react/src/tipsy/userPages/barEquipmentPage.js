import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom'
import Navbar from '../navbar/navbar.js';

import {ItemPreview, GetProfImg} from '../../main/constants';

import {getAllEquipment} from '../../util/APIUtils';

class BarEquipmentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            equipment: null,
            isLoading: true
        }
        this.loadEquipment = this
            .loadEquipment
            .bind(this);
    }

    loadEquipment() {
        this.setState({isLoading: true});

        getAllEquipment().then(response => {
            this.setState({equipment: response, isLoading: false});
        }).catch(error => {
            if (error.status === 404) {
                this.setState({notFound: true, isLoading: false});
            } else {
                this.setState({serverError: true, isLoading: false});
            }
        });
    }

    componentDidMount() {
        this.loadEquipment();
    }

    render() {

        // Checking if data came in
        if (this.state.isLoading) {
            return null
        }

        // Checking response
        if (this.state.notFound === true || this.state.serverError === true) {
            return <Redirect
                to={{
                pathname: "/tipsy/error",
                state: {
                    from: this.props.location,
                    notFound: this.state.notFound,
                    serverError: this.state.serverError
                }
            }}/>
        }

        return (
            <div className="grid-x grid-x-margin align-center-middle">
                <Navbar/>

                <h1 id="userEquipmentPageTitle" className="caption small-10 cell">Bar Equipment</h1>

                <div className="grid-x align-center-middle cell">
                    <ItemPreview className="small-6 medium-3 cell" items={this.state.equipment} type="equipment"/>
                </div>
            </div>
        )
    }
}

export default BarEquipmentPage;
