import React, {Component, Fragment} from 'react';
import Navbar from '../navbar/navbar.js';

import {getGameProfile, saveGame, forfeitGame} from '../../util/APIUtils';
import {Notify, ItemPreview, GetProfImg} from '../../util/constants';
import ErrorPage from '../../util/errorPage.js';

import Dustbin from './equipmentBin'
import Box from './equipmentDrag'

import {Tabs} from 'antd';

const {TabPane} = Tabs;

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
            unit: {
                value: ""
            },
            value: {
                value: ""
            },
            equipmentAvailable: {
                value: []
            },
            equipmentProducts: {
                value: []
            },
            actionsAvailable: {
                value: []
            },
            unitsAvailable: {
                value: []
            },
            currentStep: 0,
            actionVisible: "hidden",
            unitVisible: "hidden",
            valueVisible: "hidden",
            buttonVisible: "hidden",
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
        this.setDroppable = this
            .setDroppable
            .bind(this);
        this.handleInputChange = this
            .handleInputChange
            .bind(this);
    }

    loadGameProfile(id) {
        this.setState({isLoading: true});

        getGameProfile(id).then(response => {

            var index = response
                .progress
                .indexOf(0)

            var progress = response.progress;

            if (index !== 0) {
                index = index - 1
            } else {
                progress[0] = response.progress[0] + 1
            }

            this.setState({
                recipe: response.recipe,
                progress: response.progress,
                completed: response.completed,
                equipmentAvailable: {
                    value: response.recipe.equipmentsAvailable
                },
                currentStep: index,
                isLoading: false
            });

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

    setDroppable(name,item){
        
        var equipmentDoing = this.state.equipmentDoing.value;
        var equipmentToDo = this.state.equipmentToDo.value;
        var actionsAvailable = this.state.actionsAvailable.value;
        var action = this.state.action.value;
        var actionVisible = "hidden";

        if(name === "equipmentDoing"){
            equipmentDoing = item.name;
            actionsAvailable = item.equipmentType.actionsDoing;
            action = "";
        }else if(name === "equipmentToDo"){
            equipmentToDo = item.name;
        }

        if(equipmentDoing !== "" && equipmentToDo !== ""){
            actionVisible = "";
        }

        this.setState({
            equipmentDoing: {
                value: equipmentDoing
            },
            equipmentToDo: {
                value: equipmentToDo
            },
            action: {
                value: action
            },
            actionsAvailable: {
                value: actionsAvailable
            },
            actionVisible: actionVisible
        })
    }

    getEquipment(name) {
        var equip = this
            .state
            .equipmentAvailable
            .value
            .find(o => o.name === name);
        var product = this
            .state
            .equipmentProducts
            .value
            .find(o => o.name === name);

        if (equip !== undefined) {

            return <GameItemPreview
                className="cell noBG"
                items={[equip]}
                func={() => {}}
                draggable={false}
                type={"equipment"}/>
        } else if (product !== undefined) {
            
            return <GameItemPreview
                className="cell noBG"
                items={[product]}
                func={() => {}}
                draggable={false}
                type={"equipmentAltered"}/>
        } else {
            return ""
        }
    }

    saveGameProfile() {
        const gameRequest = {
            progress: this.state.progress,
            completed: this.state.completed
        };
        saveGame(this.props.match.params.id, gameRequest).then(response => {
            Notify("success", response.message, -1);
        }).catch(error => {
            Notify("error", error.message.message, -1);
        });
    }

    forfeitGameProfile() {
        forfeitGame(this.props.match.params.id).then(response => {
            Notify("success", response.message, -1);
        }).catch(error => {
            Notify("error", error.message.message, -1);
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
                status={this.state.error.status}
                message={this.state.error.message.message}
                history={this.props.history}/>
        }

        return (
            <div className="grid-x grid-x-margin align-center-middle pageContainer">
                <Navbar type="game"/>

                <div className="grid-x align-center align-top cell page gamePageContainer">
                    <div className={"small-5 small-offset-1 cell align-x align-center"}>
                        {/* Shows Step */}
                        <GameStepPreview
                            step={this.state.recipe.steps[this.state.currentStep]}
                            equipment={this.state.equipmentAvailable.value}
                            product={this.state.equipmentProducts.value}
                            currentIndex={this.state.currentStep + 1}
                            totalIndex={this.state.progress.length}
                            className={"small-11 cell"}/> 
                        
                        {/* Dragging Areas */}
                        <div className="cell grid-x align-center-middle"> 
                            <Dustbin className="small-5 cell" allowedDropEffect="move" name="equipmentDoing" item={this.getEquipment(this.state.equipmentDoing.value)} />
                            <div className="small-2 cell"/>
                            <Dustbin className="small-5 cell" allowedDropEffect="move" name="equipmentToDo" item={this.getEquipment(this.state.equipmentToDo.value)} />
                            
                            <div className="small-8 cell grid-x">
                                <select 
                                    name="action"
                                    className={"small-11 cell customEquipmentSelect gameAction "+this.state.actionVisible}
                                    value={this.state.action.value}
                                    onChange={(event) => this.handleInputChange(event, function(){return true;})}>
                                    <option hidden disabled key="1" value=""> -- select an option -- </option>
                                    <optgroup label="Actions">
                                        {this.state.actionsAvailable.value.map(fbb =>
                                            <option key={fbb} value={fbb}>{fbb}</option>
                                        )};
                                    </optgroup>
                                </select>
                                <select 
                                    name="unit"
                                    className={"small-11 cell customEquipmentSelect gameAction "+this.state.actionVisible}
                                    value={this.state.action.value}
                                    onChange={(event) => this.handleInputChange(event, function(){return true;})}>
                                    <option hidden disabled key="1" value=""> -- select an option -- </option>
                                    <optgroup label="Units">
                                        {this.state.unitsAvailable.value.map(fbb =>
                                            <option key={fbb} value={fbb}>{fbb}</option>
                                        )};
                                    </optgroup>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="small-1 cell"/>

                    {/* Area of All Equipment */}
                    <Tabs className="small-5 cell userDisplayTabs" tabPosition="top">
                        <TabPane tab="Behind The Bar" key="0">
                            <div className="grid-x grid-margin-x align-center-middle cell scroll">
                                <GameItemPreview
                                    className="small-5 cell"
                                    items={this.state.equipmentAvailable.value}
                                    func={this.setDroppable}
                                    type="equipment"
                                    draggable={true}/>
                            </div>
                        </TabPane>
                        <TabPane tab="What I've Made So Far" key="1">
                            <div className="grid-x grid-margin-x align-center-middle cell">
                                <GameItemPreview
                                    className="small-5 cell"
                                    items={this.state.equipmentProducts.value}
                                    func={this.setDroppable}
                                    type="equipmentAltered"
                                    draggable={true}/>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>

            </div>
        )
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        

        if(inputName === "action"){

            // this.setState({
            //     unitsAvailable{
            //         value:
            //     }
            // })
        }

            this.setState({
                [inputName]: {
                    value: inputValue,
                    ...validationFun(inputValue)
                }
            });
        }
}

class GameStepPreview extends Component {

    constructor(props) {
        super(props);

        var action = this.props.step.action;

        this.state = {
            className: this.props.className,
            step: this.props.step,
            equipment: this.props.equipment,
            product: this.props.product,
            action: action,
            currentIndex: this.props.currentIndex,
            totalIndex: this.props.totalIndex
        };
    }

    getEquipment(name) {
        var equip = this
            .state
            .equipment
            .find(o => o.name === name);
        var product = this
            .state
            .product
            .find(o => o.name === name);

        if (equip !== undefined) {

            return <GameItemPreview
                className="cell noBG"
                items={[equip]}
                func={() => {}}
                draggable={false}
                type={"equipment"}/>
        } else {
            
            return <GameItemPreview
                className="cell noBG"
                items={[product]}
                func={() => {}}
                draggable={false}
                type={"equipmentAltered"}/>
        }
    }

    render() {
        return (
            <div
                className={"grid-x align-center-middle previewGameStepContainer " + this.props.className}>
                <div className="grid-x align-center-middle small-11 cell">
                    <div className="grid-x align-center-middle small-1 cell">
                        <span>{"Step "+this.state.currentIndex + "/" +this.state.totalIndex}</span>
                    </div>
                    <div className="grid-x align-center-middle small-5 cell">
                        {this.getEquipment(this.state.step.equipmentDoing)}
                    </div>
                    <div className="grid-x align-center-middle small-1 cell">
                        <span>{this.state.action}</span>
                    </div>
                    <div className="grid-x align-center-middle small-5 cell">
                        {this.getEquipment(this.state.step.equipmentToDo)}
                    </div>
                </div>
            </div>
        );
    }
}

export const GameItemPreview = ({items, className, type, draggable, func}) => (
    <Fragment>
        {items.map(item => (<Box
            key={new Date().getMilliseconds() + (Math.random() * 69420)}
            type={type}
            item={item}
            func={func}
            draggable={draggable}
            className={"grid-x align-center-middle " + className}/>))}
    </Fragment>
);

export default Game;
