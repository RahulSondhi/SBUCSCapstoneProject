import React, {Component, Fragment} from 'react';
import Navbar from '../navbar/navbar.js';

import {getGameProfile, saveGame, forfeitGame} from '../../util/APIUtils';
import {Notify, ItemPreview, GetProfImg} from '../../util/constants';
import ErrorPage from '../../util/errorPage.js';

import Dustbin from './equipmentBin'
import Box from './equipmentDrag'

import gameHeader from '../../assets/game/glassHeader.svg'
import gameBarTender from '../../assets/game/bartender.svg'

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
            gameHeader: gameHeader,
            gameBarTender: gameBarTender,
            equipmentDoing: {
                value: ""
            },
            equipmentToDo: {
                value: ""
            },
            action: {
                value: ""
            },
            equipmentAvailable: {
                value: []
            },
            equipmentProducts: {
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

            var index = response
                .progress
                .indexOf(0)

            if (index !== 0) {
                index = index - 1
            } else {
                response.progress[0] = response.progress[0] + 1
            }

            this.setState({
                recipe: response.recipe,
                progress: response.progress,
                completed: response.completed,
                isLoading: false,
                equipmentAvailable: {
                    value: response.recipe.equipmentsAvailable
                },
                currentStep: index
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
                status
                ={this.state.error.status}
                message={this.state.error.message.message}
                history={this.props.history}/>
        }
        return (
            <div className="grid-x grid-x-margin align-center-middle pageContainer">
                <Navbar type="game"/>

                <div className="grid-x align-center align-top cell page gamePageContainer">
                    {/* Shows Step */}
                    <GameStepPreview
                        step={this.state.recipe.steps[this.state.currentStep]}
                        equipment={this.state.equipmentAvailable.value}
                        product={this.state.equipmentProducts.value}
                        currentIndex={this.state.currentStep + 1}
                        totalIndex={this.state.progress.length}
                        className={"small-8 cell"}/> 
                    
                    {/* Dragging Areas */}
                    <div>
      <Dustbin allowedDropEffect="any" />
      <Dustbin allowedDropEffect="copy" />
      <Dustbin allowedDropEffect="move" />
    </div>
    <div>
      <Box name="Glass" />
      <Box name="Banana" />
      <Box name="Paper" />
    </div>

                    {/* Area of All Equipment */}
                    <Tabs className="small-12 cell userDisplayTabs" tabPosition="right">
                        <TabPane tab="Behind The Bar" key="0">
                            <div className="grid-x grid-margin-x align-center-middle cell scroll">
                                <GameItemPreview
                                    className="small-4 medium-3 cell"
                                    items={this.state.equipmentAvailable.value}
                                    type="equipment"/>
                            </div>
                        </TabPane>
                        <TabPane tab="What I've Made So Far" key="1">
                            <div className="grid-x grid-margin-x align-center-middle cell">
                                <GameItemPreview
                                    className="small-4 medium-3 cell"
                                    items={this.state.equipmentProducts.value}
                                    type="equipmentAltered"/>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>

            </div>
        )
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

            equip.equipmentType = equip.equipmentType.type;

            return <GameItemPreview
                className="cell noBG"
                items={[equip]}
                func={() => {}}
                type={"equipment"}/>
        } else {

            product.equipmentType = product.equipmentType.type;

            return <GameItemPreview
                className="cell noBG"
                items={[product]}
                func={() => {}}
                type={"equipmentAltered"}/>
        }
    }

    render() {
        return (
            <div
                className={"grid-x align-center-middle previewGameStepContainer " + this.props.className}>
                <div className="grid-x align-center-middle small-offset-1 small-8 cell">
                    <div className="grid-x align-center-middle small-1 cell">
                        <span>{"Step "+this.state.currentIndex + " of " +this.state.totalIndex}</span>
                    </div>
                    <div className="grid-x align-center-middle small-4 cell">
                        {this.getEquipment(this.state.step.equipmentDoing)}
                    </div>
                    <div className="grid-x align-center-middle small-3 cell">
                        <span>{this.state.action}</span>
                    </div>
                    <div className="grid-x align-center-middle small-4 cell">
                        {this.getEquipment(this.state.step.equipmentToDo)}
                    </div>
                </div>
                <div className="small-1 cell"></div>
            </div>
        );
    }
}

export const GameItemPreview = ({items, className, type, postfix, postfixFunc,func}) => (
    <Fragment>
        {items.map(item => (<GetItem
            key={new Date().getMilliseconds() + (Math.random() * 69420)}
            type={type}
            item={item}
            func={func}
            postfix={postfix}
            postfixFunc={postfixFunc}
            className={"grid-x align-center-middle " + className}/>))}
    </Fragment>
);

class GetItem extends Component {

    constructor(props) {
        super(props);

        this.type = this.props.type;
        this.item = this.props.item;
        this.name = this.props.item.name;
        this.id = this.props.item.id;
        this.img = this.item.img;
        this.className = this.props.className;
        this.func = this.props.func;

        this.descPre = "";
        this.desc = "";

        if (this.type === "equipment") {
            this.descPre = "Type:";
            this.desc = <span>{" " + this.item.equipmentType}</span>;
        } else if (this.type === "equipmentAltered") {
            this.descPre = "Actions Done: ";
            this.desc = <span>{" " + this.item.tags}</span>;
        } else if (this.type === "error") {
            this.func = ()=>{};
        } else {
            this.link = this.link + this.item.id
            if (this.item.desc !== null && this.item.desc !== "") {
                this.descPre = "Desc:";
                this.desc = <span>{" " + this.item.desc}</span>;
            }
        }

        if (this.func === null || this.func === "" || this.func === undefined) {
            this.onclick = (e) => {};
        } else {
            this.onclick = (e)=>{e.preventDefault(); this.func();}
        }

    }

    render() {
        return (
            <div className={this.className} key={this.id}>

                <div className="previewItemMargin cell"></div>

                <div className="grid-x align-center-middle small-11 previewItemContainer">
                        <div className="small-6 grid-x align-center-middle cell">
                            <GetProfImg
                                className="small-10 cell"
                                pic={this.img}
                                alt={this.name}
                                type={this.type}/>
                        </div>
                    
                        <div className="small-1 cell"></div>
                        <div className="small-10 grid-x cell">
                            <div className="previewName cell">{this.name}</div>
                            <div className="previewDesc cell">{this.descPre}{this.desc}</div>
                        </div>
                        <div className="small-1 cell"></div>

                </div>

                <div className="previewItemMargin cell"></div>
            </div>
        )
    }
};

export default Game;
