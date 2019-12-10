import React, {Component} from 'react';

import {ItemPreview, GetProfImg} from '../../util/constants';
import {getEquipmentProfile} from '../../util/APIUtils';
import ErrorPage from '../../util/errorPage.js';

import Navbar from '../navbar/navbar.js';

class EquipmentPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            equipment: null,
            isLoading: true
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
            this.setState({
                error: {
                    status: error.status,
                    message: error.message
                },
                isLoading: false
            });
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
        if (this.state.error) {
            return <ErrorPage
                status
                ={this.state.error.status}
                message={this.state.error.message.message}
                history={this.props.history}/>
        }

        console.log(this.state.equipment)

        return (
            <div className="grid-x grid-x-margin align-center-middle pageContainer">
                <Navbar/>

                <div className="grid-x align-center align-top cell page">

                    <div className="small-8 grid-x align-center-middle cell publicUserProfImg">
                        <GetProfImg
                            className="small-2 cell"
                            pic={this.state.equipment.img}
                            alt={this.state.equipment.name}
                            type="equipment"/>
                        <h1 id="equipmentPageTitle" className="caption cell">{this.state.equipment.name}</h1>
                        <h2 id="equipmentPageSubTitle" className="captionYellow cell">{this.state.equipment.equipmentType.type}</h2>
                    </div>

                    <div className="small-12 medium-6 grid-x align-center align-self-top align-top cell rightUserPublicSide">
                        <h2 className="captionRed small-12 cell">What Actions Can I Do With This?</h2>

                        <ItemPreview
                            className="small-4 cell"
                            items={this.state.equipment.equipmentType.actionsDoing}
                            type="action"/>
                    </div>

                    <div className="small-12 medium-6 grid-x align-center align-self-top align-top cell rightUserPublicSide">
                        <h2 className="captionRed small-12 cell">What Actions Can Be Done To This?</h2>
                        <ItemPreview
                            className="small-4 cell"
                            items={this.state.equipment.equipmentType.actionsToDo}
                            type="action"/>
                    </div>

                </div>
            </div>
        )
    }
}

export default EquipmentPage;
