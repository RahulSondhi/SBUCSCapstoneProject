import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import {ItemPreview, GetProfImg} from '../../util/constants';
import {getEquipmentProfile} from '../../util/APIUtils';

import Navbar from '../navbar/navbar.js';

class EquipmentPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            equipment: null,
            isLoading: true,
        }
        this.loadEquipmentProfile = this
            .loadEquipmentProfile
            .bind(this);
    }

    componentDidMount() {
        let try_name = this.props.match.params.id;
        const id = try_name;
        this.loadEquipmentProfile(id);
    }

    loadEquipmentProfile(id) {
        this.setState({isLoading: true});

        getEquipmentProfile(id).then(response => {
            this.setState({equipment: response, isLoading: false});
        }).catch(error => {
            if (error.status === 404) {
                this.setState({notFound: true, isLoading: false});
            } else {
                this.setState({serverError: true, isLoading: false});
            }
        });
    }

    componentDidUpdate(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.loadEquipmentProfile(nextProps.match.params.id);
        }
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

        console.log(this.state.equipment)

        return (
            <div className="grid-x grid-x-margin align-center-middle">
                <Navbar/>

                <div className="small-8 grid-x align-center-middle cell">
                    <GetProfImg
                        className="small-3 cell"
                        pic={this.state.equipment.img}
                        alt={this.state.equipment.name}
                        type="equipment"/>
                </div>

                <h1 id="equipmentPageTitle" className="caption small-10 cell">{this.state.equipment.name}</h1>
                <h2 id="equipmentPageSubTitle" className="captionYellow small-10 cell">{this.state.equipment.equipmentType.type}</h2>

                <div className="small-12 medium-6 grid-x align-center align-self-top cell"> 
                    <h2 className="captionRed small-12 cell">What Actions Can I Do With This?</h2>

                        <ItemPreview
                                    className="small-8 cell"
                                    items={this.state.equipment.equipmentType.actionsDoing}
                                    type="action"/>
                </div>


                <div className="small-12 medium-6 grid-x align-center align-self-top cell">
                    <h2 className="captionRed small-12 cell">What Actions Can Be Done To This?</h2> 
                         <ItemPreview
                                    className="small-8 cell"
                                    items={this.state.equipment.equipmentType.actionsToDo}
                                    type="action"/>
                </div>

            </div>
        )
    }
}

export default EquipmentPage;
