import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import {MakeProfImg, ValidateName, ItemPreview, Notify} from '../../util/constants';
import {getAllEquipmentTypes} from '../../util/APIUtils';

import {Form, Input, Icon, Modal} from 'antd';

const FormItem = Form.Item;

export class DynamicSteps extends Component {

    state = {
        data: [],
        equipment: []
    };

    constructor(props) {
        super(props);

        this.state.data = this.props.data;
        this.state.equipment = this.props.equipment; 

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
                <CustomStepPrompt addItem={this.addItem} equipment={this.state.equipment}/>
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

        this.state = {
            visible: false,
            confirmLoading: false,
            equipment: [],
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
            isLoading: false,
            equipmentTypes:[]
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

        this.handleActionIntersecting = this
        .handleActionIntersecting
        .bind(this);

        getAllEquipmentTypes().then(response => {
            this.setState({
                equipment: this.props.equipment,
                equipmentTypes:response,
                isLoading: false
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

        console.log(this.state)
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
                            type="submit"
                            id="settingsButton"
                            disabled={this.isFormInvalid()}
                            onClick={(e) => {this.handleSubmit(e)}}
                            className="button">
                            Create
                        </button>
                ]}>
  
                <FormItem
                      label="equipmentToDo"
                      validateStatus={this.state.equipmentToDo.validateStatus}
                      help={this.state.equipmentToDo.errorMsg}
                      className="small-12 medium-6 cell">
                    <select 
                        name="equipmentToDo"
                        className="customEquipmentSelect"
                        value={this.state.equipmentToDo.value}
                        onChange={(event) => this.handleInputChange(event, function(){return true;})}>
                        <option hidden disabled selected value=""> -- select an option -- </option>
                        {this.state.equipment.map(fbb =>
                            <option key={fbb.name} value={fbb.name}>{fbb.name}</option>
                        )};
                    </select>
                </FormItem>

                <FormItem
                      label="action"
                      validateStatus={this.state.action.validateStatus}
                      help={this.state.action.errorMsg}
                      className="small-12 medium-6 cell">
                    
                    <select 
                        name="action"
                        className="customEquipmentSelect"
                        value={this.state.action.value}
                        onChange={(event) => this.handleInputChange(event, function(){return true;})}>
                        <option hidden disabled selected value=""> -- select an option -- </option>
                        {this.state.intersectingActions.value.map(fbb =>
                            <option key={fbb} value={fbb}>{fbb}</option>
                        )};
                    </select>
                </FormItem>

                <FormItem
                      label="equipmentDoing"
                      validateStatus={this.state.equipmentToDo.validateStatus}
                      help={this.state.equipmentToDo.errorMsg}
                      className="small-12 medium-6 cell">
                    <select 
                        name="equipmentDoing"
                        className="customEquipmentSelect"
                        value={this.state.equipmentDoing.value}
                        onChange={(event) => this.handleInputChange(event, function(){return true;})}>
                        <option hidden disabled selected value=""> -- select an option -- </option>
                        {this.state.equipment.map(fbb =>
                            <option key={fbb.name+"2"} value={fbb.name}>{fbb.name}</option>
                        )};
                    </select>
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

        if((inputName === "equipmentToDo" || inputName === "equipmentDoing")){
            this.handleActionIntersecting(inputName,inputValue,validationFun)
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
            confirmLoading: false,
          });
    }

    handleActionIntersecting(inputName,inputValue,validationFun){

        var equipmentToDoType;
        var equipmentDoingType; 

        if(this.state.equipmentToDo.value !== "" && inputName === "equipmentDoing"){

            equipmentToDoType = this.state.equipmentTypes.find(type => type.type === (this.state.equipment.find(o => o.name === this.state.equipmentToDo.value)).equipmentType);
            equipmentDoingType = this.state.equipmentTypes.find(type => type.type === (this.state.equipment.find(o => o.name === inputValue)).equipmentType);

        } else if(this.state.equipmentDoing.value !== "" && inputName === "equipmentToDo"){

            equipmentToDoType = this.state.equipmentTypes.find(type => type.type === (this.state.equipment.find(o => o.name === inputValue)).equipmentType);
            equipmentDoingType = this.state.equipmentTypes.find(type => type.type === (this.state.equipment.find(o => o.name === this.state.equipmentDoing.value)).equipmentType);

        }

        if((this.state.equipmentToDo.value !== "" && inputName === "equipmentDoing") || (this.state.equipmentDoing.value !== "" && inputName === "equipmentToDo")){

            var results = equipmentToDoType.actionsToDo.filter(function(n) {
                return equipmentDoingType.actionsDoing.indexOf(n) > -1;
            });

            this.setState({
                intersectingActions: {
                    value: results
                },
                action: {
                    value: ""
                },
                [inputName]: {
                    value: inputValue,
                    ...validationFun(inputValue)
                }
            })
        }else{
            this.setState({
                [inputName]: {
                    value: inputValue,
                    ...validationFun(inputValue)
                }
            })
        }
    }
   
    isFormInvalid() {
        return !(this.state.equipmentToDo.validateStatus === 'success' && this.state.equipmentDoing.validateStatus === 'success' && this.state.equipmentProduct.validateStatus === 'success');
    }

    showModal = () => {
        this.setState({
            visible: true,
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