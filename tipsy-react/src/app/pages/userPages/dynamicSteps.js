import React, {Component, Fragment} from 'react';

import {ValidateName, ItemPreview, Notify, MakeProfImg, GetProfImg} from '../../util/constants';
import {getAllEquipmentTypes, getAllUnits, checkEquipmentNameIsPresent} from '../../util/APIUtils';
import ErrorPage from '../../util/errorPage.js';


import {Form, Input, Modal, Icon} from 'antd';

const FormItem = Form.Item;

export class DynamicSteps extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            equipment: [],
            product: [],
        };

        this.addItem = this
            .addItem
            .bind(this);

        this.removeItem = this
            .removeItem
            .bind(this);
        
        this.moveItem = this
            .moveItem
            .bind(this);
    }

    componentDidMount(){
        this.setState({
            data : this.props.data,
            equipment : this.props.equipment,
            product : this.props.product
        })

        this.onLoad = this.props.onLoad;
        this.className = this.props.className;
    }

    addItem(item) {
        // update the state object
        this.state.data.push(item);
        Notify("success","Added",-1);
        this.props.onUpdate("add",item,this.state.product);
    }

    removeItem(item) {
        // update the state object
        const index = this
            .state
            .data
            .indexOf(item);

        var notUsed = this.state.data.find( step => {
            return ((step.equipmentDoing === item.equipmentProduct) || (step.equipmentToDo === item.equipmentProduct))
        })

        if (index > -1 && (notUsed === undefined) === true) {
            this.state.data.splice(index, 1);
            Notify("success","Removed!",-1);
            this.props.onUpdate("remove",item,this.state.product);
        } else if ((notUsed === undefined) === false) {           
            Notify("error","The result of this step is being used somewhere else!",-1);
        } else {
            Notify("error","Could not remove that!",-1);
        }
    }

    moveItem(direction,item) {
        // update the state object
        const index = this
            .state
            .data
            .indexOf(item);

        if (index > -1 && direction === "up") {  
            if(index === 0){
                Notify("error","Step is already at the top!",-1);
            }else if(this.state.data[index-1]){
                var notUsed = (item.equipmentDoing !== this.state.data[index-1].equipmentProduct) && (item.equipmentToDo !== this.state.data[index-1].equipmentProduct);
                if(notUsed === true){
                    this.state.data.splice(index, 1);
                    this.state.data.splice(index-1, 0, item);

                    Notify("success","Step Moved Up!",-1);

                    this.props.onUpdate();
                    this.setState({data: this.state.data});
                }else{
                    Notify("error","The result of the above step is used in this one!",-1);
                }
            }
        } else if (index > -1 && direction === "down") {  
            if(index === this.state.data.length-1){
                Notify("error","Step is already at the bottom!",-1);
            }else if(this.state.data[index+1]){
                var unUsed = (this.state.data[index+1].equipmentDoing !== item.equipmentProduct) && (this.state.data[index+1].equipmentToDo !== item.equipmentProduct);
                if(unUsed === true){
                    this.state.data.splice(index, 1);
                    this.state.data.splice(index+1, 0, item);

                    Notify("success","Step Moved Down!",-1);

                    this.props.onUpdate();
                    this.setState({data: this.state.data});
                }else{
                    Notify("error","The below step uses the result of this one!",-1);
                }
            }
        } else{
            Notify("error","Could not move!",-1);
        }

    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props) {

            console.log("Parent Update:",this.props.product)

            this.setState({
                data : this.props.data,
                equipment : this.props.equipment,
                product : this.props.product
            })
    
            this.onLoad = this.props.onLoad;
            this.className = this.props.className;
        }
    }

    render() {

        return (
            <div className={"dynamicForm grid-x align-center-middle " + this.className}>
                <CustomStepPrompt addItem={this.addItem} equipment={this.state.equipment} product={this.state.product}/>
                <StepPreview
                    className="small-6 cell"
                    items={this.state.data}
                    removeFunc={this.removeItem}
                    moveFunc={this.moveItem}
                    product={this.state.product}
                    equipment={this.state.equipment}/>
            </div>
        )
    }
};

class CustomStepPrompt extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
            equipment: [],
            product: [],
            equipmentToDo: {
                value: ""
            },
            equipmentDoing: {
                value: ""
            },
            equipmentProduct: {
                value: ""
            },
            action: {
                value: ""
            },
            value: {
                value: 0
            },
            unit: {
                value: ""
            },
            resultImg:{
                value:""
            },
            resultName: {
                value: ""
            },
            resultEquipmentType: {
                value: ""
            },
            resulTags: {
                value: []
            },
            intersectingActions: {
                value: []
            },
            intersectingEquipment: {
                value: []
            },
            intersectingProducts: {
                value: []
            },
            intersectingUnits: {
                value: []
            },
            doingClass: "",
            actionClass: "hidden",
            toDoClass: "hidden",
            valueClass:"hidden",
            unitClass: "hidden",
            buttonClass: "hidden",
            imgClass: "hidden",
            nameClass: "hidden",
            submitClass: "hidden",
            isLoading: true,
            equipmentTypes:[],
            units:[]
        };

        this.actionType = "";

        this.handleCancel = this
        .handleCancel
        .bind(this);

        this.validateName = this
        .validateName
        .bind(this);

        this.showModal = this
        .showModal
        .bind(this);

        this.handleSubmit = this
        .handleSubmit
        .bind(this);

        this.handleInputChange = this
        .handleInputChange
        .bind(this);

        this.handleImageLoad = this
        .handleImageLoad
        .bind(this);

        this.handleContinue = this
        .handleContinue
        .bind(this);

        getAllEquipmentTypes().then(response => {
            var equipmentTypes = response
            getAllUnits().then(response => {
                this.setState({
                    equipment: this.props.equipment,
                    product: this.props.product,
                    equipmentTypes:equipmentTypes,
                    units:response,
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
                error:{
                    status: error.status,
                    message: error.message, 
                },
                isLoading: false
            });
        });
    }

    UNSAFE_componentWillMount() {
        this.setState({
            equipment: this.props.equipment,
            product: this.props.product,
            isLoading: false
        });
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props) {
            this.setState({
                equipment: this.props.equipment,
                product: this.props.product
            });
        }
    }
  
  
    render() {
      const { visible, confirmLoading} = this.state;

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
        <div key={this.state.product} className="grid-x align-center-middle small-6 medium-6 cell">
            <ItemPreview
                        className="small-6 cell"
                        items={[{desc:"Add Your Own"}]}
                        func={this.showModal}
                        type={"createEquipment"}/>
  
          <Form onSubmit={this.handleSubmit} className="cell grid-x align-center-middle">
              <Modal
                title="Create a Step"
                className="grid-x align-center-middle"
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
                footer={[   
                ]}>
  
                <FormItem
                      label="Select The Equipment Doing"
                      validateStatus={this.state.equipmentDoing.validateStatus}
                      help={this.state.equipmentDoing.errorMsg}
                      className={"small-12 medium-6 cell "+this.state.doingClass}>
                    <select
                        name="equipmentDoing"
                        className={"customEquipmentSelect"}
                        value={this.state.equipmentDoing.value}
                        onChange={(event) => this.handleInputChange(event, function(){return true;})}>
                        <option hidden disabled key="0" value=""> -- select an option -- </option>
                        <optgroup label="Equipments">
                            {this.state.equipment.map(fbb =>
                                <option key={fbb.name} value={fbb.name}>{fbb.name}</option>
                            )};
                        </optgroup>
                        <optgroup label="Products">
                            {this.state.product.map(fbb =>
                                <option key={fbb.name} value={fbb.name}>{fbb.name}</option>
                            )};
                        </optgroup>
                    </select>
                </FormItem>

                <FormItem
                      label="Action"
                      validateStatus={this.state.action.validateStatus}
                      help={this.state.action.errorMsg}
                      className={"small-12 medium-6 cell "+this.state.actionClass}>
                    
                    <select 
                        name="action"
                        className="customEquipmentSelect"
                        value={this.state.action.value}
                        onChange={(event) => this.handleInputChange(event, function(){return true;})}>
                        <option hidden disabled key="1" value=""> -- select an option -- </option>
                        <optgroup label="Actions">
                            {this.state.intersectingActions.value.map(fbb =>
                                <option key={fbb} value={fbb}>{fbb}</option>
                            )};
                        </optgroup>
                    </select>
                </FormItem>

                <FormItem
                      label="To This Equipment"
                      validateStatus={this.state.equipmentToDo.validateStatus}
                      help={this.state.equipmentToDo.errorMsg}
                      className={"small-12 medium-6 cell "+this.state.toDoClass}>
                    <select 
                        name="equipmentToDo"
                        className="customEquipmentSelect"
                        value={this.state.equipmentToDo.value}
                        onChange={(event) => this.handleInputChange(event, function(){return true;})}>
                        <option hidden disabled key="2" value=""> -- select an option -- </option>
                        <optgroup label="Equipments">
                            {this.state.intersectingEquipment.value.map(fbb =>
                                <option key={fbb.name+"2"} value={fbb.name}>{fbb.name}</option>
                            )};
                        </optgroup>
                        <optgroup label="Products">
                            {this.state.intersectingProducts.value.map(fbb =>
                                <option key={fbb.name+"2"} value={fbb.name}>{fbb.name}</option>
                            )};
                        </optgroup>
                    </select>
                </FormItem>

                <FormItem
                      label="Units of Measurement"
                      validateStatus={this.state.unit.validateStatus}
                      help={this.state.unit.errorMsg}
                      className={"small-12 medium-6 cell "+this.state.unitClass}>
                    <select 
                        name="unit"
                        className="customEquipmentSelect"
                        value={this.state.unit.value}
                        onChange={(event) => this.handleInputChange(event, function(){return true;})}>
                        <option hidden disabled key="3" value=""> -- select an option -- </option>
                        <optgroup label="Units">
                            {this.state.intersectingUnits.value.map(fbb =>
                                <option key={fbb.name+"3"} value={fbb.name}>{fbb.name}</option>
                            )};
                        </optgroup>
                    </select>
                </FormItem>     

                <FormItem
                      label="Number of Units"
                      validateStatus={this.state.value.validateStatus}
                      help={this.state.value.errorMsg}
                      className={"small-12 medium-6 cell "+this.state.valueClass}>
                    <Input
                        type="number"
                        min="0"
                        name="value"
                        autoComplete="off"
                        placeholder="Enter Number of Units"
                        value={this.state.value.value}
                        onChange={(event) => this.handleInputChange(event, function(){return true;})}/>
                </FormItem>

                <button
                    key="continue"
                    id="settingsButton"
                    onClick={(e) => {this.handleContinue(e)}}
                    className={"button cell "+this.state.buttonClass}>
                    Continue
                </button>
                
                <FormItem
                    className={"small-12 medium-6 cell "+this.state.imgClass}>
                    <MakeProfImg
                        pic={this.state.resultImg.value}
                        className={"cell"}
                        data={this.handleImageLoad}
                        type="equipment"/>
                </FormItem>
  
                <FormItem
                      label="Equipment Product Name"
                      validateStatus={this.state.resultName.validateStatus}
                      help={this.state.resultName.errorMsg}
                      className={"small-12 medium-6 cell "+this.state.nameClass}>
                    <Input
                        name="resultName"
                        autoComplete="off"
                        placeholder="Enter Name of Equipment Product"
                        value={this.state.resultName.value}
                        onChange={(event) => this.handleInputChange(event, this.validateName)} />
                </FormItem>

                <FormItem
                    className={"small-12 medium-6 cell "+this.state.submitClass}>                               
                    <button
                        key="footer"
                        type="submit"
                        id="settingsButton"
                        onClick={(e) => {this.handleSubmit(e)}}
                        className={"button cell"}>
                        Create
                    </button>
                </FormItem> 

              </Modal>
          </Form>
      </div>
      );
    }
  
    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        var value = "";

        var toDoClass = "";
        var unitClass = "";
        var buttonClass = "";
        

        if((inputName === "equipmentDoing")){
            this.setState({
                actionClass: "",
                toDoClass: "hidden",
                unitClass: "hidden",
                valueClass:"hidden",
                buttonClass:"hidden",
                imgClass: "hidden",
                nameClass: "hidden",
                submitClass: "hidden",
                action:{
                    value:""
                },
                intersectingActions:{
                    value: this.state.equipmentTypes.find(type => {
                        var equip = this.state.equipment.find(o => o.name === inputValue);
                        var product = this.state.product.find(o => o.name === inputValue);

                        if(equip !== undefined){
                           return type.type === (equip.equipmentType);
                        }else{
                            return type.type === (product.equipmentType);
                        }
                        
                    }).actionsDoing
                },
                [inputName]: {
                    value: inputValue,
                    validateStatus: "success",
                    ...validationFun(inputValue)
                }
            });
        }else if(inputName === "action"){

            toDoClass = "";
            unitClass = "hidden";
            value = ""

            if(inputValue === "TEMPERATE"){
                toDoClass = "hidden";
                unitClass = "";
                value = this.state.equipmentDoing.value;
            }

            this.setState({
                toDoClass: toDoClass,
                unitClass: unitClass,
                valueClass:"hidden",
                buttonClass:"hidden",
                imgClass: "hidden",
                nameClass: "hidden",
                submitClass: "hidden",
                equipmentToDo:{
                    value:value
                },
                intersectingEquipment:{
                    value: this.state.equipment.filter(equip => 
                        { 
                            var actions = this.state.equipmentTypes.find(type => type.type === equip.equipmentType).actionsToDo;
                            return (actions.includes(inputValue));

                        },this)
                },
                intersectingProducts:{
                    value: this.state.product.filter(equip => 
                        { 
                            var actions = this.state.equipmentTypes.find(type => type.type === equip.equipmentType).actionsToDo;
                            return (actions.includes(inputValue));

                        },this)
                },
                intersectingUnits: {
                    value: this.state.units.filter(unit => 
                        { 
                            var action = inputValue;

                            if(["ADD","INPUT","SPRINKLE","PEEL","CUT","POUR"].includes(action)){
                                // measurement
                                this.actionType = "MEASUREMENT";
                                return unit.type === "MEASUREMENT"
                            }else if(["SHAKE","STIR","FREEZE","COOL","IGNITE","BLEND","HEAT","BOIL"].includes(action)){
                                // time
                                this.actionType = "TIME";
                                return unit.type === "TIME"
                            }else if(["TEMPERATE"].includes(action)){
                                // temp
                                this.actionType = "TEMPERATURE";
                                return unit.type === "TEMPERATURE"
                            }else{
                                this.actionType = "NA";
                                return unit.type === "NA";
                            }

                        },this)
                },
                [inputName]: {
                    value: inputValue,
                    validateStatus: "success",
                    ...validationFun(inputValue)
                }
            });
        }else if(inputName === "equipmentToDo"){

            unitClass = "";
            buttonClass = "hidden";
            value = "";

            if(this.actionType === "NA"){
                unitClass = "hidden";
                buttonClass = "";
                value = "NA";
            }
            
            this.setState({
                unitClass: unitClass,
                valueClass: "hidden",
                buttonClass: buttonClass,
                imgClass: "hidden",
                nameClass: "hidden",
                submitClass: "hidden",
                unit: {
                    value: value
                },
                [inputName]: {
                    value: inputValue,
                    ...validationFun(inputValue)
                }
            });
        }else if(inputName === "unit"){
            this.setState({
                valueClass:"",
                buttonClass:"hidden",
                imgClass: "hidden",
                nameClass: "hidden",
                submitClass: "hidden",
                value:{
                    value:0
                },
                [inputName]: {
                    value: inputValue,
                    validateStatus: "success",
                    ...validationFun(inputValue)
                }
            });
        }else if(inputName === "value"){
            this.setState({
                buttonClass:"",
                imgClass: "hidden",
                nameClass: "hidden",
                submitClass: "hidden",
                [inputName]: {
                    value: inputValue,
                    validateStatus: "success",
                    ...validationFun(inputValue)
                }
            });
        }else if(inputName === "resultName"){
            validationFun(inputValue)
        }else{
            this.setState({
                [inputName]: {
                    value: inputValue,
                    ...validationFun(inputValue)
                }
            });
        }
    }

    validateName = (name) => {

            var validName = ValidateName(name);

            if(validName.validateStatus === "success"){
                this.setState({
                    doingClass: "hidden",
                    actionClass: "hidden",
                    toDoClass: "hidden",
                    unitClass: "hidden",
                    valueClass:"hidden",
                    buttonClass:"hidden",
                    imgClass: "",
                    nameClass: "",
                    submitClass: "",
                    resultName: {
                        value: name,
                        validateStatus: "success",
                        errorMsg: null
                    }
                });
            }else{
                this.setState({
                    doingClass: "hidden",
                    actionClass: "hidden",
                    toDoClass: "hidden",
                    unitClass: "hidden",
                    valueClass:"hidden",
                    buttonClass:"hidden",
                    imgClass: "",
                    nameClass: "",
                    submitClass: "hidden",
                    resultName: {
                        value: name,
                        validateStatus: validName.validateStatus,
                        errorMsg: validName.errorMsg
                    }
                });
            }
    }

    handleImageLoad = (val) => {
        this.setState({
            resultImg: {
                value: val
            }
        });
    }

    handleContinue(event){
        event.preventDefault();

        var equip = this.state.equipment.find(o => o.name === this.state.equipmentToDo.value);
        var product = this.state.product.find(o => o.name === this.state.equipmentToDo.value);
        var img = "";
        var equipmentType = "";
        var tags = [];

        if(equip !== undefined){
            img = equip.img;
            equipmentType = equip.equipmentType;
            tags = [this.state.action.value];    
        }else{
            img = product.img;
            equipmentType = product.equipmentType;
            tags = [].concat(product.tags);
            tags.push(this.state.action.value);    
        }

        var name = this.state.action.value + " " + this.state.equipmentToDo.value;

        this.setState({
            doingClass: "hidden",
            actionClass: "hidden",
            toDoClass: "hidden",
            unitClass: "hidden",
            valueClass:"hidden",
            buttonClass:"hidden",
            imgClass: "",
            nameClass: "",
            submitClass: "hidden",
            resultName: {
                value:name,
                validateStatus:"warning",
                errorMsg: "Put in a valid name of the product"
            },
            resultImg: {
                value:img
            },
            resultEquipmentType: {
                value:equipmentType
            },
            resultTags: {
                value:tags
            },
        })
    }
  
    handleSubmit(event) {
        event.preventDefault();

        var name = this.state.resultName.value;
        
        checkEquipmentNameIsPresent(name).then(response => {

            var existingEquipment = this.state.equipment.find(o => o.name === name);
            var existingProduct = this.state.product.find(o => o.name === name);

            if(!response.available && (existingEquipment === undefined) && (existingProduct === undefined)){
                this.setState({
                    confirmLoading: true,
                });
        
                const stepRequest = {
                    equipmentToDo: this.state.equipmentToDo.value,
                    equipmentDoing: this.state.equipmentDoing.value,
                    equipmentProduct:{
                    name: this.state.resultName.value,
                    img: this.state.resultImg.value,
                    equipmentType: this.state.resultEquipmentType.value,
                    tags: this.state.resultTags.value
                    },
                    action: this.state.action.value,
                    value: parseInt(this.state.value.value),
                    unit: this.state.unit.value
                };
        
                this.props.addItem(stepRequest);

                this.setState({
                    visible: false,
                    confirmLoading: false,
                });
            }else{
                this.setState({
                    doingClass: "hidden",
                    actionClass: "hidden",
                    toDoClass: "hidden",
                    unitClass: "hidden",
                    valueClass:"hidden",
                    buttonClass:"hidden",
                    imgClass: "",
                    nameClass: "",
                    submitClass: "hidden",
                    resultName: {
                        value: name,
                        validateStatus: "error",
                        errorMsg: "Name is taken"
                    }
                });
            }
        
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
   
    isFormInvalid() {
        return !(this.state.equipmentToDo.validateStatus === 'success' && this.state.equipmentDoing.validateStatus === 'success' && this.state.resultName.validateStatus === 'success');
    }

    showModal = () => {
        this.setState({
            visible: true,
            doingClass: "",
            actionClass: "hidden",
            toDoClass: "hidden",
            valueClass:"hidden",
            unitClass: "hidden",
            buttonClass: "hidden",
            imgClass: "hidden",
            nameClass: "hidden",
            submitClass: "hidden",
            equipmentToDo: {
                value: ""
            },
            equipmentDoing: {
                value: ""
            },
            equipmentProduct: {
                value: ""
            },
            action: {
                value: ""
            },
            value: {
                value: 0
            },
            unit: {
                value: ""
            },
            intersectingActions: {
                value: []
            },
            intersectingEquipment: {
                value: []
            },
            intersectingProducts: {
                value: []
            }
        });
    };


    handleCancel = () => {
        this.setState({
            visible: false,
            confirmLoading: false,
            });
        };
    }

export const StepPreview = ({items, equipment, product, className, removeFunc,moveFunc}) => (
    <Fragment>
        {items.map(item => (<GetStep
            key={new Date().getMilliseconds() + (Math.random() * 69420)}
            item={item}
            equipment={equipment}
            product={product}
            steps={items}
            removeFunc={removeFunc}
            moveFunc={moveFunc}
            className={"grid-x align-center-middle " + className}/>))}
    </Fragment>
);

class GetStep extends Component {
    
    constructor(props){
        super(props);

        var removeClass = " ";
        var moveClass = " ";

        if(this.props.removeFunc === undefined){
            removeClass = "hidden"
        }

        if(this.props.moveFunc === undefined){
            moveClass = "hidden"
        }

        this.state = {
            isLoading: false,
            className: this.props.className,
            item:this.props.item,
            moveFunc:this.props.moveFunc,
            removeFunc: this.props.removeFunc,
            equipment:this.props.equipment,
            product:this.props.product,
            steps:this.props.steps,
            moveClass: moveClass,
            removeClass: removeClass
        };
    }

    getEquipment(name){
        var equip = this.state.equipment.find(o => o.name === name);
        var product = this.state.product.find(o => o.name === name);

        if(equip !== undefined){
            return <ItemPreview
            className="cell"
            items={[equip]}
            func={()=>{}}
            type={"equipment"} />   
        }else{
            return <ItemPreview
            className="cell"
            items={[product]}
            func={()=>{}}
            type={"equipmentAltered"} />   
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
            status ={this.state.error.status}
            message = {this.state.error.message.message}
            history = {this.props.history}
            />
        }
      return (
        <div key={this.state.product} className="grid-x align-center-middle small-10 cell">
            <div className="previewItemMargin cell"></div>
            <div className="grid-x align-center-middle small-11 cell previewStepContainer">
                <div className="grid-x align-center-middle small-3 cell">
                    {this.getEquipment(this.state.item.equipmentDoing)}
                </div>
                <div className="grid-x align-center-middle small-1 cell">
                    <Icon type="plus-square" theme="twoTone" className="cell"/>
                </div>
                <div className="grid-x align-center-middle small-3 cell">
                    {this.getEquipment(this.state.item.equipmentToDo)}
                </div>
                <div className="grid-x align-center-middle small-1 cell">
                    <Icon type="right-square" theme="twoTone" className="cell"/>
                </div>
                <div className="grid-x align-center-middle small-3 cell">
                    {this.getEquipment(this.state.item.equipmentProduct)}
                </div>
                <div className="grid-x small-1 cell">
                    <div className={"small-6 small-offset-5 cell align-self-top "+this.state.removeClass} onClick={() => {this.state.removeFunc(this.state.item)}}>
                        <GetProfImg type="error" className="cell" />
                    </div>
                    <div className="cell spacer"></div>
                    <div className={"small-6 small-offset-5 align-self-middle cell "+this.state.moveClass} onClick={() => {this.state.moveFunc("up",this.state.item)}}> 
                        <GetProfImg type="up" className="cell" />
                    </div>
                    <div className="cell spacer"></div>
                    <div className={"small-6 small-offset-5 align-self-bottom cell "+this.state.moveClass} onClick={() => {this.state.moveFunc("down",this.state.item)}}>
                        <GetProfImg type="down" className="cell" />
                    </div>  
                </div>
            </div>
            <div className="previewItemMargin cell"></div>
        </div>
      );
    }
  }

  export default DynamicSteps;