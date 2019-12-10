import React, {Component} from 'react';
import Navbar from '../navbar/navbar.js';

import {getGameProfile, saveGame, forfeitGame} from '../../util/APIUtils';
import {Notify} from '../../util/constants';
import ErrorPage from '../../util/errorPage.js';

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipe: null,
            progress: null,
            completed: false,
            isLoading: true,
        }
        this.loadGameProfile = this
            .loadGameProfile
            .bind(this);
        this.saveGameProfile = this
            .saveGameProfile
            .bind(this);
        this.forfeitGameProfile = this
            .forfeitGameProfile
            .bind(this);
    }


    loadGameProfile(id) {
        this.setState({isLoading: true});

        getGameProfile(id).then(response => {
            this.setState({
                recipe: response.recipe,
                progress: response.progress,
                completed: response.completed, 
                isLoading: false
            });
        }).catch(error => {
            this.setState({
                error:{
                    status: error.status,
                    message: error.message, 
                },
                isLoading: false
            });
        });
    }

    saveGameProfile(){
        const gameRequest = {
            progress: this.state.progress,
            completed: this.state.completed,
        };
        saveGame(this.props.match.params.id, gameRequest).then(response => {
            Notify("success",response.message,-1);
        }).catch(error => {
            Notify("error", error.message.message,-1);
        });
    }

    forfeitGameProfile(){
        forfeitGame(this.props.match.params.id).then(response => {
            Notify("success",response.message,-1);
        }).catch(error => {
            Notify("error", error.message.message,-1);
        });
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.loadGameProfile(id);
    }

    componentDidUpdate(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.loadGameProfile(nextProps.match.params.id);
        }
    }

    render() {
        console.log(this.state);

        // Checking if data came in
        if (this.state.isLoading) {
            return null
        }

        // Checking response
        if (this.state.error) {
            return <ErrorPage
            status ={this.state.error.status}
            message = {this.state.error.message.message}
            history = {this.props.history}
            />
        }
        return (
            <div className="grid-x grid-x-margin align-center-middle pageContainer">
                <Navbar type="game"/>
                hi im a game
            </div>
        )
    }
}

export default Game;
