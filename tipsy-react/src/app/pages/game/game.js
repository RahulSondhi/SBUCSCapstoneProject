import React, {Component, Fragment} from 'react';
import Navbar from '../navbar/navbar.js';

import {getGameProfile, saveGame, forfeitGame, getAllUnits} from '../../util/APIUtils';
import {Notify, ItemPreview, GetProfImg} from '../../util/constants';
import ErrorPage from '../../util/errorPage.js';

import Dustbin from './equipmentBin'
import Box from './equipmentDrag'

import {Tabs, Input} from 'antd';

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
            units:[],
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
        this.handleSubmitStep = this
            .handleSubmitStep
            .bind(this);
    }

    loadGameProfile(id) {
        this.setState({isLoading: true});

        getGameProfile(id).then(response => {

            getAllUnits().then(units => {
                
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
                    units:units,
                    currentStep: index,
                    isLoading: false
                });

            }).catch(error => {
                if (error.status === 404) {
                    this.setState({notFound: true, isLoading: false});
                } else {
                    this.setState({serverError: true, isLoading: false});
                }
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
            actionVisible: actionVisible,
            unitVisible: "hidden",
            valueVisible: "hidden",
            buttonVisible: "hidden",
        })
    }

    handleSubmitStep(event){
        var step = this.state.recipe.steps[this.state.currentStep];
        var correctEquipmentToDo = (this.state.equipmentToDo.value === step.equipmentToDo);
        var correctEquipmentDoing = (this.state.equipmentDoing.value === step.equipmentDoing);;
        var correctAction = (this.state.action.value === step.action);
        var correctUnit = (this.state.unit.value === step.unit.name);

        if( correctEquipmentToDo === true && 
            correctEquipmentDoing === true &&
            correctAction === true &&
            correctUnit === true){
            
            this.state.equipmentProducts.value.push(this.state.recipe.equipmentProducts.find(equip => equip.name === step.equipmentProduct))
            
            var index = this.state.currentStep + 1;

            var progress = this.state.progress;
            progress[index] = 1;

            this.setState({
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
                equipmentProducts: {
                    value: this.state.equipmentProducts.value
                },
                currentStep: index,
                progress: progress,
                actionVisible: "hidden",
                unitVisible: "hidden",
                valueVisible: "hidden",
                buttonVisible: "hidden",
            })

        }else{
            var response = "Try again,but take a look at: "
            if(correctEquipmentToDo === false){
                response += " Equipment Doing The Action,"
            }

            if(correctEquipmentDoing === false){
                response += " Equipment That Is Being Affected,"
            }

            if(correctAction === false){
                response += " Action You Choose,"
            }

            if(correctUnit === false){
                response += " Units You Put In,"
            }

            console.log(response);

            var progress = this.state.progress;
            progress[this.state.currentStep] += 1;

            this.setState({
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
                progress: progress,
                actionVisible: "hidden",
                unitVisible: "hidden",
                valueVisible: "hidden",
                buttonVisible: "hidden",
            })
        }
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
                className="small-6 cell noBG"
                items={[equip]}
                func={() => {}}
                draggable={false}
                type={"equipment"}/>
        } else if (product !== undefined) {
            
            return <GameItemPreview
                className="small-6 cell noBG"
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
                    
                    <div className="cell grid-x align-center-middle gameTop">

                        <div className={"small-4 small-offset-2 cell grid-x align-center align-self-top gamestepContainer"}>
                            {/* Shows Step */}
                            <GameStepPreview
                                steps={this.state.recipe.steps}
                                index={this.state.currentStep}
                                equipment={this.state.equipmentAvailable.value}
                                product={this.state.equipmentProducts.value}
                                totalIndex={this.state.progress.length}
                                className={"small-11 cell"}/> 
                        </div>

                        {/* Area of All Equipment */}
                        <div className="small-4 small-offset-2 grid-x grid-margin-x cell gameEquipContainer">
                            <div className="grid-x cell equipContainer">
                                <GameItemPreview
                                    className="small-5 cell"
                                    items={this.state.equipmentAvailable.value}
                                    func={this.setDroppable}
                                    type="equipment"
                                    draggable={true}/>
                                <GameItemPreview
                                    className="small-5 cell"
                                    items={this.state.equipmentProducts.value}
                                    func={this.setDroppable}
                                    type="equipmentAltered"
                                    draggable={true}/>
                            </div>
                        </div>

                    </div>

                    <div className={"cell align-x align-center gameBottom"}>
                        
                        {/* Dragging Areas */}
                        <div className="cell grid-x align-center-middle"> 
                            <Dustbin className="small-3 small-offset-1 cell" allowedDropEffect="move" name="equipmentDoing" item={this.getEquipment(this.state.equipmentDoing.value)} />
                            <div className="small-2 cell grid-x align-center-middle">
                                <select 
                                        name="action"
                                        className={"small-10 cell customEquipmentSelect gameAction "+this.state.actionVisible}
                                        value={this.state.action.value}
                                        onChange={(event) => this.handleInputChange(event, function(){return true;})}>
                                        <option hidden disabled key="1" value=""> -- select an option -- </option>
                                        <optgroup label="Actions">
                                            {this.state.actionsAvailable.value.map(fbb =>
                                                <option key={fbb} value={fbb}>{fbb}</option>
                                            )};
                                        </optgroup>
                                </select>
                            </div>
                            <Dustbin className="small-3 cell" allowedDropEffect="move" name="equipmentToDo" item={this.getEquipment(this.state.equipmentToDo.value)} />
                            
                            <div className="small-2 cell grid-x">
                                <div className="cell grid-x">
                                    <div className={"small-4 small-offset-1 cell "+this.state.valueVisible}>
                                        <Input
                                            type="number"
                                            min="0"
                                            name="value"
                                            autoComplete="off"
                                            placeholder="Enter Number of Units"
                                            value={this.state.value.value}
                                            onChange={(event) => this.handleInputChange(event, function(){return true;})}/>
                                    </div>
                                    <select 
                                        name="unit"
                                        className={"small-6 small-offset-1 cell customEquipmentSelect gameAction "+this.state.unitVisible}
                                        value={this.state.unit.value}
                                        onChange={(event) => this.handleInputChange(event, function(){return true;})}>
                                        <option hidden disabled key="1" value=""> -- select an option -- </option>
                                        <optgroup label="Units">
                                            {this.state.unitsAvailable.value.map(fbb =>
                                                <option key={fbb.name} value={fbb.name}>{fbb.name}</option>
                                            )};
                                        </optgroup>
                                    </select>
                                </div>
                                <button
                                    key="continue"
                                    id="settingsButton"
                                    onClick={(e) => {this.handleSubmitStep(e)}}
                                    className={"button cell align-self-bottom "+this.state.buttonVisible}>
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        var unitsAvailable = this.state.unitsAvailable.value;
        var unitVisible = this.state.unitVisible;
        var valueVisible = this.state.valueVisible;
        var buttonVisible = this.state.buttonVisible;

        if(inputName === "action"){
            unitsAvailable = this.state.units.filter(unit => 
                { 
                    var action = inputValue;

                    if(["ADD","INPUT","SPRINKLE","PEEL","CUT","POUR"].includes(action)){
                        // measurement
                        valueVisible = "";
                        unitVisible = ""
                        buttonVisible = "hidden"
                        return unit.type === "MEASUREMENT"
                    }else if(["SHAKE","STIR","FREEZE","COOL","IGNITE","BLEND","HEAT","BOIL"].includes(action)){
                        // time
                        valueVisible = "";
                        unitVisible = ""
                        buttonVisible = "hidden"
                        return unit.type === "TIME"
                    }else if(["TEMPERATE"].includes(action)){
                        // temp
                        valueVisible = "";
                        unitVisible = ""
                        buttonVisible = "hidden"
                        
                        return unit.type === "TEMPERATURE"
                    }else{
                        buttonVisible = "";
                        valueVisible = "hidden"
                        unitVisible = "hidden"
                        return unit.type === "NA";
                    }
                    

                },this)

                this.setState({
                    [inputName]: {
                        value: inputValue,
                        ...validationFun(inputValue)
                    },
                    unitsAvailable:{
                        value: unitsAvailable
                    },
                    unitVisible: unitVisible,
                    valueVisible: valueVisible,
                    buttonVisible: buttonVisible,
                    unit:{
                        value: ""
                    },
                    value:{
                        value: 0
                    }
                });

        }else if (inputName === "unit"){
            buttonVisible = ""

            this.setState({
                [inputName]: {
                    value: inputValue,
                    ...validationFun(inputValue)
                },
                unitsAvailable:{
                    value: unitsAvailable
                },
                unitVisible: unitVisible,
                valueVisible: valueVisible,
                buttonVisible: buttonVisible,
            });
        }else if (inputName === "value"){

            this.setState({
                [inputName]: {
                    value: inputValue,
                    ...validationFun(inputValue)
                },
                unitsAvailable:{
                    value: unitsAvailable
                },
                unitVisible: unitVisible,
                valueVisible: valueVisible,
                buttonVisible: buttonVisible
            });
        }else{
            this.setState({
                [inputName]: {
                    value: inputValue,
                    ...validationFun(inputValue)
                },
                unitsAvailable:{
                    value: unitsAvailable
                },
                unitVisible: unitVisible,
                valueVisible: valueVisible,
                buttonVisible: buttonVisible
            });
        }
    }
}

class GameStepPreview extends Component {

    constructor(props) {
        super(props);

        this.state = {
            className: this.props.className,
            steps: this.props.steps,
            index: this.props.index,
            equipment: this.props.equipment,
            product: this.props.product,
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

    componentDidUpdate(prevProps) {
        if(prevProps.value !== this.props.value) {
          this.setState({value: this.props.value});
        }
    }

    render() {
        var action = ""

        if(this.props.steps[this.props.index].unit.name !== "NA"){
            action = this.props.steps[this.props.index].action+" "+this.props.steps[this.props.index].value+" "+this.props.steps[this.props.index].unit.name+"(s)";
        }else{
            action = this.props.steps[this.props.index].action
        }

        return (
            <div key={"Step"+this.state.currentIndex}
                className={"grid-x align-center-middle previewGameStepContainer " + this.props.className}>
                <div className="grid-x align-center-middle small-11 cell">
                    <div className="grid-x align-center-middle small-1 cell">
                        <span>{"Step "+ (this.props.index+1) + "/" +this.state.totalIndex}</span>
                    </div>
                    <div className="grid-x align-center-middle small-5 cell">
                        {this.getEquipment(this.props.steps[this.props.index].equipmentDoing)}
                    </div>
                    <div className="grid-x align-center-middle small-1 cell">
                        <span>{action}</span>
                    </div>
                    <div className="grid-x align-center-middle small-5 cell">
                        {this.getEquipment(this.props.steps[this.props.index].equipmentToDo)}
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
