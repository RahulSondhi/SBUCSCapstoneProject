import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import {MakeProfImg, ValidateName, ItemPreview, Notify} from '../../util/constants';
import {getAllEquipmentTypes} from '../../util/APIUtils';

import {Form, Input, Icon, Modal} from 'antd';

const FormItem = Form.Item;

export class DynamicSteps extends Component {

    state = {
        data: []
    };

    constructor(props) {
        super(props);

        this.state.data = this.props.data;

        this.onLoad = this.props.onLoad;
        this.className = this.props.className;

        this.addItem = this
            .addItem
            .bind(this);

        this.removeItem = this
            .removeItem
            .bind(this);
    }

    async addItem(item) {
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
                <CustomStepPrompt addItem={this.addItem}/>
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
            name: {
                value: ''
            },
            equipmentType: {
                value: 'INGREDIENT'
            },
            img: {
                value: ''
            },
            isLoading: false,
            equipmentTypes:[]
        };

        getAllEquipmentTypes().then(response => {
            this.setState({
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

      return (
        <div className="grid-x align-center-middle small-6 medium-6 cell">

          <ItemPreview
                        className="cell"
                        items={[{desc:"Add Your Own"}]}
                        func={this.showModal}
                        type={"createEquipment"}/>
  
          <Form onSubmit={this.handleSubmit} className="cell grid-x align-center-middle">
              <Modal
                title="Create a Custom Equipment"
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
  
                  <MakeProfImg
                      pic={this.state.img.value}
                      className="cell"
                      data={this.handleImageLoad}
                      type="equipment"/>
  
                  <FormItem
                      label="Name"
                      validateStatus={this.state.name.validateStatus}
                      help={this.state.name.errorMsg}
                      className="small-12 medium-6 cell">
                    <Input
                        prefix={< Icon type = "idcard" />}
                        name="name"
                        autoComplete="off"
                        placeholder="Enter Recipe Name"
                        value={this.state.name.value}
                        onChange={(event) => this.handleInputChange(event, ValidateName)}/>
                    </FormItem>

                  <FormItem
                      label="Type"
                      validateStatus={this.state.equipmentType.validateStatus}
                      help={this.state.equipmentType.errorMsg}
                      className="small-12 medium-6 cell">
                    
                    <select 
                        name="equipmentType"
                        className="customEquipmentSelect"
                        value={this.state.equipmentType.value}
                        onChange={(event) => this.handleInputChange(event, function(){return true;})}>
                        {this.state.equipmentTypes.map(fbb =>
                            <option key={fbb.type} value={fbb.type}>{fbb.type}</option>
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
  
          this.setState({
              [inputName]: {
                  value: inputValue,
                  ...validationFun(inputValue)
              }
          });
      }
  
      handleImageLoad = (val) => {
          this.setState({
              img: {
                  value: val
              }
          });
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
            name: {
                value: ''
            },
            equipmentType: {
                value: 'INGREDIENT'
            },
            img: {
                value: ''
            },
            visible: false,
            confirmLoading: false,
          });
      }
  
      isFormInvalid() {
          return !(this.state.name.validateStatus === 'success');
      }

      showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
    
      handleCancel = () => {
        this.setState({
          visible: false,
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