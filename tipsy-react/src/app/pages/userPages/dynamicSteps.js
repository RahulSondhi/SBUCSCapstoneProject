import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import {ValidateName, ItemPreview, Notify} from '../../util/constants';
import {getAllEquipmentTypes, getAllUnits} from '../../util/APIUtils';

import {Form, Input, Icon, Modal} from 'antd';

const FormItem = Form.Item;

export class DynamicSteps extends Component {

    state = {
        data: [],
        equipment: [],
        product: [],
    };

    constructor(props) {
        super(props);

        this.state.data = this.props.data;
        this.state.equipment = this.props.equipment;
        this.state.product = this.props.product; 

        this.onLoad = this.props.onLoad;
        this.className = this.props.className;

        this.addItem = this
            .addItem
            .bind(this);

        this.removeItem = this
            .removeItem
            .bind(this);
    }

    addItem(item) {
        // update the state object
        this.state.data.push(item);
        this.setState({data: this.state.data});
        Notify("success","Added",-1);
        this.props.onUpdate();
    }

    removeItem(item) {
        // update the state object
        const index = this
            .state
            .data
            .indexOf(item);

        if (index > -1) {
            this.state.data.splice(index, 1);
            this.setState({data: this.state.data});
            
            Notify("success","Removed!",-1);
            
            this.props.onUpdate();
        } else {
            Notify("error","Could not remove that!",-1);
        }

    }

    render() {
        return (
            <div className={"dynamicForm grid-x align-center-middle " + this.className}>
                <CustomStepPrompt addItem={this.addItem} equipment={this.state.equipment} product={this.state.product}/>
                <StepPreview
                    className="small-6 cell"
                    items={this.state.data}
                    postfixFunc={this.removeItem}/>
            </div>
        )
    }
};

class CustomStepPrompt extends Component {
    
    constructor(props){
        super(props);
        console.log(this.props)
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
            intersectingActions: {
                value: []
            },
            intersectingEquipment: {
                value: []
            },
            intersectingProducts: {
                value: []
            },
            actionClass: "hidden",
            toDoClass: "hidden",
            valueClass:"hidden",
            unitClass: "hidden",
            buttonClass: "hidden",
            isLoading: true,
            equipmentTypes:[],
            units:[]
        };

        this.handleCancel = this
        .handleCancel
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
            if (error.status === 404) {
                this.setState({notFound: true, isLoading: false});
            } else {
                this.setState({serverError: true, isLoading: false});
            }
        });
    }
  
  
    render() {
      const { visible, confirmLoading} = this.state;

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
        <div className="grid-x align-center-middle small-6 medium-6 cell">

          <ItemPreview
                        className="cell"
                        items={[{desc:"Add Your Own"}]}
                        func={this.showModal}
                        type={"createEquipment"}/>
  
          <Form onSubmit={this.handleSubmit} className="cell grid-x align-center-middle">
              <Modal
                title="Create Equipment"
                className="grid-x align-center-middle"
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
                footer={[
                    <button
                        key="footer"
                        type="submit"
                        id="settingsButton"
                        disabled={this.isFormInvalid()}
                        onClick={(e) => {this.handleSubmit(e)}}
                        className={"button cell "+this.state.buttonClass}>
                        Create
                    </button>
                ]}>
  
                <FormItem
                      label="Equipment"
                      validateStatus={this.state.equipmentDoing.validateStatus}
                      help={this.state.equipmentDoing.errorMsg}
                      className={"small-12 medium-6 cell"}>
                    <select 
                        name="equipmentDoing"
                        className="customEquipmentSelect"
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
                            {this.state.units.map(fbb =>
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
                        name="value"
                        autoComplete="off"
                        placeholder="Enter Number of Units"
                        value={this.state.value.value}
                        onChange={(event) => this.handleInputChange(event, function(){return true;})}/>
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

        if((inputName === "equipmentDoing")){
            this.setState({
                actionClass: "",
                toDoClass: "hidden",
                unitClass: "hidden",
                valueClass:"hidden",
                buttonClass:"hidden",
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

            this.setState({
                actionClass: "",
                toDoClass: "",
                unitClass: "hidden",
                valueClass:"hidden",
                buttonClass:"hidden",
                equipmentToDo:{
                    value:""
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
                [inputName]: {
                    value: inputValue,
                    validateStatus: "success",
                    ...validationFun(inputValue)
                }
            });
        }else if(inputName === "equipmentToDo"){
            this.setState({
                actionClass: "",
                toDoClass: "",
                unitClass: "",
                valueClass:"hidden",
                buttonClass:"hidden",
                unit: {
                    value: ""
                },
                [inputName]: {
                    value: inputValue,
                    ...validationFun(inputValue)
                }
            });
        }else if(inputName === "unit"){
            this.setState({
                actionClass: "",
                toDoClass: "",
                unitClass: "",
                valueClass:"",
                buttonClass:"hidden",
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
                actionClass: "",
                toDoClass: "",
                unitClass: "",
                valueClass:"",
                buttonClass:"",
                [inputName]: {
                    value: inputValue,
                    validateStatus: "success",
                    ...validationFun(inputValue)
                }
            });
        }else{
            this.setState({
                [inputName]: {
                    value: inputValue,
                    ...validationFun(inputValue)
                }
            });
        }
    }
  
    handleSubmit(event) {
          event.preventDefault();

          this.setState({
            confirmLoading: true,
          });
  
          const equipmentRequest = {
              name: this.state.name.value,
              img: this.state.img.value,
              equipmentType: this.state.equipmentType.value
          };
  
          this.props.addItem(equipmentRequest);

          this.setState({
            equipmentToDo: "",
            equipmentDoing: "",
            equipmentProduct: "",
            action: "",
            value: 0,
            unit: "",
            visible: false,
            actionClass: "hidden",
            toDoClass: "hidden",
            valueClass:"hidden",
            unitClass: "hidden",
            buttonClass: "hidden",
            confirmLoading: false,
          });
    }
   
    isFormInvalid() {
        return !(this.state.equipmentToDo.validateStatus === 'success' && this.state.equipmentDoing.validateStatus === 'success' && this.state.equipmentProduct.validateStatus === 'success');
    }

    showModal = () => {
        this.setState({
            visible: true,
            actionClass: "hidden",
            toDoClass: "hidden",
            valueClass:"hidden",
            unitClass: "hidden",
            buttonClass: "hidden"
        });
    };


    handleCancel = () => {
        this.setState({
            equipmentToDo: "",
            equipmentDoing: "",
            equipmentProduct: "",
            action: "",
            value: 0,
            unit: "",
            visible: false,
            actionClass: "hidden",
            toDoClass: "hidden",
            valueClass:"hidden",
            unitClass: "hidden",
            confirmLoading: false,
            });
        };
    }

class StepPreview extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            isLoading: false
        };
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
        <div className="grid-x align-center-middle small-6 medium-6 cell">

        </div>
      );
    }
  }

  export default DynamicSteps;