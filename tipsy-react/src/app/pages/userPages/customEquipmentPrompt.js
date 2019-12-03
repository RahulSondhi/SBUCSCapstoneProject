import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import {MakeProfImg, ValidateName, GetProfImg} from '../../util/constants';
import {getAllEquipmentTypes} from '../../util/APIUtils';

import {Form, Input, Icon, Modal} from 'antd';

const FormItem = Form.Item;


class CustomEquipmentPrompt extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            visible: false,
            confirmLoading: false,
            name: {
                value: ''
            },
            type: {
                value: ''
            },
            img: {
                value: ''
            },
            isLoading: false,
            equipmentTypes:[]
        };

        // getAllEquipmentTypes().then(response => {
        //     this.setState({
        //         equipmentTypes:response,
        //         isLoading: false
        //     });
        // }).catch(error => {
        //     if (error.status === 404) {
        //         this.setState({notFound: true, isLoading: false});
        //     } else {
        //         this.setState({serverError: true, isLoading: false});
        //     }
        // });
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
  
          <div
              className="previewItem grid-x align-center-middle cell"
              onClick={this.showModal}
              key="add">
              <div className="small-4 grid-x cell">
                  <GetProfImg type="add" className="small-10 cell" pic="" alt="Add A Bar"/>
              </div>
              <div className="small-8 grid-x cell">
                  <div className="previewName cell">Add A Custom Equipment</div>
              </div>
          </div>
  
          <Form onSubmit={this.handleSubmit} className="cell grid-x align-center-middle">
              <Modal
                title="Create a Custom Equipment"
                className="grid-x align-center-middle"
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
                footer={[
                    <FormItem key="submit" loading={this.loading}>
                        <button
                            type="submit"
                            id="settingsButton"
                            disabled={this.isFormInvalid()}
                            onClick={this.disableButton}
                            className="button">
                            Create
                        </button>
                        </FormItem>
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
                      validateStatus={this.state.type.validateStatus}
                      help={this.state.type.errorMsg}
                      className="small-12 medium-6 cell">
                    
                    <select 
                    name="type"
                    value={this.state.type.value}
                    onChange={(event) => this.handleInputChange(event, function(){return true;})}>
                        {this.state.equipmentTypes.map(fbb =>
                            <option key={fbb.name} value={fbb.name}>{fbb.name}</option>
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
              type: this.state.type.value
          };
  
          this.props.add(equipmentRequest);

          this.setState({
            visible: false,
            confirmLoading: false,
          });
      }
  
      isFormInvalid() {
          return !(this.state.name.validateStatus === 'success' && this.state.type.validateStatus === 'success');
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

  export default CustomEquipmentPrompt;