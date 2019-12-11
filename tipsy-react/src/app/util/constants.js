import React, {Component, Fragment} from 'react';
import {Form, Input, Icon, Modal, notification, Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

import {getUserBrief, getBarBrief, getEquipmentBrief, getRecipeBrief, search, getAllEquipmentTypes} from './APIUtils';
import {Link, Redirect} from 'react-router-dom';
import Avatar from 'react-avatar-edit';
 
import UserPic from '../assets/defaultIcons/user.svg';
import BarPic from '../assets/defaultIcons/bar.svg';
import RecipePic from '../assets/defaultIcons/recipe.svg';
import AddPic from '../assets/defaultIcons/add.svg';
import SearchPic from '../assets/defaultIcons/search.svg';
import SettingPic from '../assets/defaultIcons/setting.svg';
import RemovePic from '../assets/defaultIcons/remove.svg';
import ActionPic from '../assets/defaultIcons/action.svg';
import EquipmentPic from '../assets/defaultIcons/equipment.svg';
import ClonePic from '../assets/defaultIcons/clone.svg';
import PlayPic from '../assets/defaultIcons/play.svg';
import UpPic from '../assets/defaultIcons/up.svg';
import DownPic from '../assets/defaultIcons/down.svg';
import UnknownPic from '../assets/defaultIcons/unknown.svg';
import {NewUserPic} from '../assets/defaultIcons/newuser.json';
import {NewBarPic} from '../assets/defaultIcons/newbar.json';
import {NewRecipePic} from '../assets/defaultIcons/newrecipe.json';
import {NewEquipmentPic} from '../assets/defaultIcons/newequipment.json';

import * as validate from './validate.js';

const { Option } = Select;
const FormItem = Form.Item;

// Neccessary Data

// export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
export const API_BASE_URL = 'http://tipsy-api.us-east-1.elasticbeanstalk.com';
export const ACCESS_TOKEN = 'accessToken';
export const APP_NAME = 'Tipsy';

// Component Routing - Validate

export const ValidateFirstName = validate.validateFirstName;
export const ValidateLastName = validate.validateLastName;
export const ValidateEmail = validate.validateEmail;
export const ValidateNickname = validate.validateNickname;
export const ValidatePassword = validate.validatePassword;
export const ValidateName = validate.validateName;
export const ValidateDesc = validate.validateDesc;

// Notifications

export const Notify = (type,desc,duration) => {

    var notifType = type;
    var notifDuration = duration;

    if(type !== "success" && type !== "warning" && type !== "error" && type !== "info"){
        notifType = "open";
    }

    if(duration === -1){
        notifDuration = 4.5;
    }

    notification[notifType]({
      message: APP_NAME,
      description: desc,
      duration: notifDuration,
    });

  };

// Profile Components

export class GetProfImg extends Component {

    constructor(props) {
        super(props);
        this.type = this.props.type;
        this.className = this.props.className;
        this.alt = this.props.alt;
    }

    render() {
        if (this.props.pic === null || this.props.pic === "" || this.props.pic === undefined) {
            if (this.type === "bar") {
                this.image = BarPic
            } else if (this.type === "recipe") {
                this.image = RecipePic
            } else if (this.type === "user") {
                this.image = UserPic
            } else if (this.type === "add") {
                this.image = AddPic
            } else if (this.type === "search") {
                this.image = SearchPic
            } else if (this.type === "settings") {
                this.image = SettingPic
            } else if (this.type === "remove") {
                this.image = RemovePic
            } else if (this.type === "equipment") {
                this.image = EquipmentPic
            } else if (this.type === "action") {
                this.image = ActionPic
            } else if (this.type === "error") {
                this.image = RemovePic
            } else if (this.type === "clone") {
                this.image = ClonePic
            } else if (this.type === "play") {
                this.image = PlayPic
            } else if (this.type === "up") {
                this.image = UpPic
            } else if (this.type === "down") {
                this.image = DownPic
            } else  {
                this.image = UnknownPic
            }
        } else {
            this.image = this.props.pic
        }

        return (<img src={this.image} className={this.className} alt={this.alt}/>)
    }
};

export class MakeProfImg extends Component {

    constructor(props) {
        super(props);

        this.state = {
            preview: null,
            src: null
        }

        this.type = this.props.type;
        this.className = this.props.className;

        if (this.props.pic === null || this.props.pic === "" || this.props.pic === undefined) {
            if (this.type === "bar") {
                this.state.src = NewBarPic
            } else if (this.type === "recipe") {
                this.state.src = NewRecipePic
            } else if (this.type === "equipment") {
                this.state.src = NewEquipmentPic
            } else {
                this.state.src = NewUserPic
            }
        } else {
            this.state.src = (this.props.pic);
        }

        this.onCrop = this
            .onCrop
            .bind(this)
        this.onClose = this
            .onClose
            .bind(this)
        this.onBeforeFileLoad = this
            .onBeforeFileLoad
            .bind(this)
        this.onImageLoad = this
            .onImageLoad
            .bind(this)
    }

    onClose() {
        this.setState({preview: null})
    }

    onCrop(preview) {
        this.setState({preview});
        if (preview != null) {
            this
                .props
                .data(preview);
        }
    }

    onImageLoad() {
        this.props.data(this.state.src);     
    }

    onBeforeFileLoad(elem) {
        if (elem.target.files[0].size > 71680) {
            Notify("error","File is too large!",-1);
            elem.target.value = "";
        } else if (elem.target.files[0].type !== "image/png" && elem.target.files[0].type !== "image/jpeg") {
            Notify("error","Only PNG + JPEG Allowed To Be Uploaded!",-1);
            elem.target.value = "";
        };
    }

    render() {
        if(this.props.disabled === true){
            return (
                <div
                    className={"makeProfPicEditor grid-x align-center-middle " + this.className}>
                    <GetProfImg
                        alt={"Can't Edit!"}
                        type={this.type}
                        pic={this.state.src}
                        className="small-2 cell"/>
                </div>
            )
        }else{
            return (
                <div
                    className={"makeProfPicEditor grid-x align-center-middle " + this.className}>
                    <Avatar
                        width={360}
                        height={360}
                        cropRadius={180}
                        onCrop={this.onCrop}
                        onClose={this.onClose}
                        onImageLoad={this.onImageLoad}
                        onBeforeFileLoad={this.onBeforeFileLoad}
                        src={this.state.src}
                        className="editor-canvas cell"/>
                </div>
        )}
    }
}

// ItemPreview Item [img,name,type,desc,id]
export const ItemPreview = ({items, className, type, postfix, postfixFunc,func}) => (
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

        this.link = "/tipsy/" + this.type + "/";
        this.descPre = "";
        this.desc = "";

        if (this.type === "user") {
            this.link = this.link + this.item.name;
        } else if (this.type === "equipment") {
            this.link = this.link + this.item.name;
            this.descPre = "Type:";
            this.desc = <span>{" " + this.item.equipmentType}</span>;
        } else if (this.type === "equipmentAltered") {
            this.link = this.link + this.item.name;
            this.descPre = "Actions Done: ";
            this.desc = <span>{" " + this.item.tags}</span>;
        } else if (this.type === "bar") {
            this.link = this.link + this.item.id;
            this.descPre = "Owner:";
            this.desc = <span>{" " + this.item.owner}</span>;
        } else if (this.type === "recipe") {
            this.link = this.link + this.item.id;
            this.descPre = "Author:";
            this.desc = <span>{" " + this.item.author}</span>;
        } else if (this.type === "action") {
            this.name = this.props.item;
            this.func = ()=>{};
        } else if (this.type === "error") {
            this.func = ()=>{};
        } else if (this.type === "createBar" || this.type === "createRecipe" ){
            this.type = "add";
            this.name = this.item.desc;
        } else if( this.type === "createEquipment") {
            this.type = "add";
            this.name = this.item.desc;
        } else {
            this.link = this.link + this.item.id
            if (this.item.desc !== null && this.item.desc !== "") {
                this.descPre = "Desc:";
                this.desc = <span>{" " + this.item.desc}</span>;
            }
        }

        this.postfix = this.props.postfix;
        this.postfixFunc = this.props.postfixFunc;

        if (this.postfix === null || this.postfix === "" || this.postfix === undefined) {
            this.postfixClass = "hidden"
        } else {
            this.postfixClass = " ";
        }

        if (this.func === null || this.func === "" || this.func === undefined) {
            this.onclick = (e) => {};
        } else {
            this.onclick = (e)=>{e.preventDefault(); this.func();}
        }

        this.postFunc = this
            .postFunc
            .bind(this);

    }

    postFunc() {
        this.postfixFunc(this.item);
    }

    render() {
        return (
            <div className={this.className} key={this.id}>

                <div className="previewItemMargin cell"></div>

                <div className="grid-x align-center-middle small-11 previewItemContainer">
                    <Link
                        to={this.link}
                        onClick={(e) => {
                            this.onclick(e)
                          }}
                        className="previewItem small-11 grid-x align-center-middle cell">
                        <div className="small-1 cell"></div>
                        <div className="small-6 grid-x align-center-middle cell">
                            <GetProfImg
                                className="small-10 cell"
                                pic={this.img}
                                alt={this.name}
                                type={this.type}/>
                        </div>
                    </Link>
                    
                    <div className="small-1 grid-x align-self-top cell" onClick={this.postFunc}>
                        <GetProfImg
                            className={"small-11 cell " + this.postfixClass}
                            alt={this.postfix}
                            type={this.postfix}/>
                        <div className="small-1 cell"></div>
                    </div>

                    <Link
                        to={this.link}
                        onClick={(e) => {
                            this.onclick(e)
                          }}
                        className="cell">
                        <div className="spacer"></div>
                    </Link>
                    
                    <Link
                        to={this.link}
                        onClick={(e) => {
                            this.onclick(e)
                          }}
                        className="previewItem small-12 grid-x align-center-middle cell">
                        <div className="small-1 cell"></div>
                        <div className="small-10 grid-x cell">
                            <div className="previewName cell">{this.name}</div>
                            <div className="previewDesc cell">{this.descPre}{this.desc}</div>
                        </div>
                        <div className="small-1 cell"></div>
                    </Link>

                </div>

                <div className="previewItemMargin cell"></div>
            </div>
        )
    }
};

// Dynamic Form

export class DynamicForm extends Component {

    state = {
        data: []
    };

    constructor(props) {
        super(props);

        this.state.data = this.props.data;

        this.onLoad = this.props.onLoad;
        this.type = this.props.type;
        this.className = this.props.className;

        this.addItem = this
            .addItem
            .bind(this);

        this.removeItem = this
            .removeItem
            .bind(this);
    }

    addItem(success, item) {
        // update the state object

        let hasItem = this
            .state
            .data
            .some(items => items['name'] === item.name);

        let passed = true;

        if(this.props.validateAdd !== undefined){
            passed = this.props.validateAdd(item);
        }

        if (success === true && hasItem === false && passed === true) {

            Notify("success","Added",-1);

            this.state.data.push(item);
            this.setState({data: this.state.data});
            this.props.onUpdate();

        } else {
            if (hasItem || passed === false) {
                Notify("error","Already Added!",-1);
            } else {
                Notify("error","Could not find that!",-1);
            }
        }

    }

    removeItem(item) {
        // update the state object
        const index = this
            .state
            .data
            .indexOf(item);
        
        let passed = true;

        if(this.props.validateRemove !== undefined){
            passed = this.props.validateRemove(item);
        }

        if (index > -1 && passed === true) {
            this.state.data.splice(index, 1);
            this.setState({data: this.state.data});
            
            Notify("success","Removed!",-1);
            
            this.props.onUpdate();
        } else {
            if (passed === false) {
                Notify("error","This item is in use!",-1);
            } else {
                Notify("error","Could not remove that!",-1);
            }
        }

    }

    render() {
        if(this.type === "equipment"){
            return (
                <div className={"dynamicForm grid-x align-center-middle " + this.className}>
                    <DynamicInput input="" addItem={this.addItem} type={this.type}/>
                    <div className="cell"></div>
                    <CustomEquipmentPrompt addItem={this.addItem}/>
                    <ItemPreview
                        className="small-4 cell"
                        items={this.state.data}
                        type={this.type}
                        func={()=>{}}
                        postfix="remove"
                        postfixFunc={this.removeItem}/>
                </div>
                )
         }else{
            return (
                <div className={"dynamicForm grid-x align-center-middle " + this.className}>
                    <DynamicInput input="" addItem={this.addItem} type={this.type}/>
                    <div className="cell"></div>
                    <ItemPreview
                        className="small-4 cell"
                        items={this.state.data}
                        type={this.type}
                        func={()=>{}}
                        postfix="remove"
                        postfixFunc={this.removeItem}/>
                </div>
            )
        }
    }
};

class DynamicInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            data: [],
            value: [],
            fetching: false
        }

        this.type = this.props.type;
        this.lastFetchId = 0;
        this.fetchUser = debounce(this.fetchUser, 800);

        if (this.type === "user") {
            this.state.textName = "Nickname";
        } else {
            this.state.textName = "Name";
        }

        this.handleInputChange = this
            .handleInputChange
            .bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue
            }
        });
    }

    render() {
        const { fetching, data, value } = this.state;
        return (
          <Select
            mode="multiple"
            labelInValue
            value={value}
            placeholder={"Select " +this.type}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={this.fetchUser}
            onChange={this.handleChange}
            className="searchbar small-8 cell"
          >
            {data.map(d => (
              <Option key={d.value}>{d.text}</Option>
            ))}
          </Select>
        );
    }

    fetchUser = value => {

        this.lastFetchId += 1;
        const fetchId = this.lastFetchId;

        this.setState({ data: [], fetching: true });

        search(this.type,value)
          .then(response => {
            
            if (fetchId !== this.lastFetchId) {
              // for fetch callback order
              return;
            }
            
            var data;

            if(this.type === "user"){
                data = response.map(user => ({
                text: `${user.fullName}`,
                value: user.name,
                }));
            }else if(this.type === "recipe"){
                data = response.map(recipe => ({
                text: `${recipe.name} by ${recipe.author}`,
                value: recipe.id,
                }));
            }else if(this.type === "bar"){
                data = response.map(bar => ({
                text: `${bar.name} owned by ${bar.owner}`,
                value: bar.id,
                }));
            }else if(this.type === "equipment"){
                data = response.map(equipment => ({
                text: `${equipment.name}`,
                value: equipment.name,
                }));
            }

            this.setState({ data, fetching: false });
          });
      };
    
      handleChange = data => {
        
        const value = data[0].key;
        
        if(this.type === "user"){
            getUserBrief(value).then(response => {
                this.props.addItem(true, response);

                this.setState({
                    data: [],
                    fetching: false,
                  });
            })
        }else if(this.type === "recipe"){ 
            getRecipeBrief(value).then(response => {
                this.props.addItem(true, response);

                this.setState({
                    data: [],
                    fetching: false,
                  });
            })
        }else if(this.type === "bar"){
            getBarBrief(value).then(response => {
                this.props.addItem(true, response);

                this.setState({
                    data: [],
                    fetching: false,
                  });
            })
        }else if(this.type === "equipment"){
            getEquipmentBrief(value).then(response => {
                this.props.addItem(true, response);

                this.setState({
                    data: [],
                    fetching: false,
                  });
            })
        }

      };
}

class CustomEquipmentPrompt extends Component {
    
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
                value: NewEquipmentPic
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
        <div className="grid-x align-center-middle small-4 cell">

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
                    <FormItem key="submit" loading={this.loading}>
                        <button
                            type="submit"
                            id="settingsButton"
                            disabled={this.isFormInvalid()}
                            onClick={(e) => {this.handleSubmit(e)}}
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
  
          this.props.addItem(true,equipmentRequest);

          this.setState({
            name: {
                value: ''
            },
            equipmentType: {
                value: 'INGREDIENT'
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