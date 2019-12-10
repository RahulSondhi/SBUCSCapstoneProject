import React, {Component} from 'react';
import Navbar from '../navbar/navbar.js';

import {getGameProfile, saveGame, forfeitGame} from '../../util/APIUtils';
import {Notify, ItemPreview} from '../../util/constants';
import ErrorPage from '../../util/errorPage.js';

import {Icon} from 'antd';

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipe: null,
            progress: null,
            completed: false,
            isLoading: true,
            equipmentDoing: {
                value: ""
            },
            equipmentToDo: {
                value: ""
            },
            action: {
                value: ""
            },
            equipmentAvailable:{
                value: []
            },
            equipmentProducts:{
                value: []
            },
            currentStep: 0
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

            var index = response.progress.indexOf(0)

            if(index !== 0){
                index = index - 1
            }else{
                response.progress[0] = response.progress[0] + 1
            }

            this.setState({
                recipe: response.recipe,
                progress: response.progress,
                completed: response.completed, 
                isLoading: false,
                equipmentAvailable:{
                    value: response.recipe.equipmentsAvailable
                },
                currentStep: index
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
                <div className="grid-x align-center align-top cell page">
                    <GameStepPreview step={this.state.recipe.steps[this.state.currentStep]} 
                        equipment={this.state.equipmentAvailable.value} 
                        product={this.state.equipmentProducts.value}/>
                </div>
            </div>
        )
    }
}

class GameStepPreview extends Component {
    
    constructor(props){
        super(props);
        
        var action = this.props.step.action;

        this.state = {
            className: this.props.className,
            step:this.props.step,
            equipment: this.props.equipment,
            product: this.props.product,
            action: action
        };
    }

    getEquipment(name){
        var equip = this.state.equipment.find(o => o.name === name);
        var product = this.state.product.find(o => o.name === name);

        if(equip !== undefined){

            equip.equipmentType = equip.equipmentType.type;

            return <ItemPreview
            className="cell"
            items={[equip]}
            func={()=>{}}
            type={"equipment"} />   
        }else{

            product.equipmentType = product.equipmentType.type;

            return <ItemPreview
            className="cell"
            items={[product]}
            func={()=>{}}
            type={"equipmentAltered"} />   
        }
    }
  
  
    render() {
      return (
        <div className="grid-x align-center-middle small-10 cell">
            <div className="previewItemMargin cell"></div>
            <div className="grid-x align-center-middle small-11 cell previewGameStepContainer">
                <div className="grid-x align-center-middle small-3 cell">
                    {this.getEquipment(this.state.step.equipmentDoing)}
                </div>
                <div className="grid-x align-center-middle small-3 cell">
                    <span>{this.state.action}</span>
                </div>
                <div className="grid-x align-center-middle small-3 cell">
                    {this.getEquipment(this.state.step.equipmentToDo)}
                </div>
            </div>
            <div className="previewItemMargin cell"></div>
        </div>
      );
    }
  }

export default Game;
