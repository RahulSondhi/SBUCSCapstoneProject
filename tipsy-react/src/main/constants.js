import React, {Component, Fragment} from 'react';
import {Form, Input, Icon, Button, notification} from 'antd';
import {checkNicknameAvailability, getUserProfile} from '../util/APIUtils';
import {Link} from 'react-router-dom';
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
import UnknownPic from '../assets/defaultIcons/unknown.svg';
import {NewUserPic} from '../assets/defaultIcons/newuser.json';
import {NewBarPic} from '../assets/defaultIcons/newbar.json';
import {NewRecipePic} from '../assets/defaultIcons/newrecipe.json';

export const CustomButton = (props) => {
    return (
        <div>
            <Link to={props.redirect}>
                <button type="submit" className="button">
                    {props.name}
                </button>
            </Link>
        </div>
    )
}

export const CustomCreateButton = (props) => {
    return (
        <div>
            <Link to={props.redirect}>
                <button type="submit" className="createButton">
                    {props.name}
                </button>
            </Link>
        </div>
    )
}

export const SVG = (props) => {
    return (<img src={props.src} style={props.style} alt={props.alt}/>);
}

// Neccessary Data

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';
export const ACCESS_TOKEN = 'accessToken';

export const FIRSTNAME_MIN_LENGTH = 2;
export const FIRSTNAME_MAX_LENGTH = 50;

export const LASTNAME_MIN_LENGTH = 2;
export const LASTNAME_MAX_LENGTH = 50;

export const EMAIL_MAX_LENGTH = 62;

export const NICKNAME_MIN_LENGTH = 4;
export const NICKNAME_MAX_LENGTH = 32;

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 256;

export const NAME_MIN_LENGTH = 4;
export const NAME_MAX_LENGTH = 32;

export const DESC_MAX_LENGTH = 256;

export default SVG;

// Profile Components

export class GetProfImg extends Component {

    constructor(props) {
        super(props);
        this.type = this.props.type;
        this.className = this.props.className;
        this.alt = this.props.alt;
    }

    render() {
        if (this.props.pic == null || this.props.pic == "" || this.props.pic == undefined) {
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
            } else {
                this.image = UnknownPic
            }
        } else {
            this.image = "data:image/png;base64, " + this.props.pic
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

        if (this.props.pic == null || this.props.pic == "" || this.props.pic == undefined) {
            if (this.type === "bar") {
                this.state.src = NewBarPic
            } else if (this.type === "recipe") {
                this.state.src = NewRecipePic
            } else {
                this.state.src = NewUserPic
            }
        } else {
            this.state.src = ("data:image/png;base64, " + this.props.pic);
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
        if (this.state.preview != null) {
            this
                .props
                .data(this.state.preview);
        }
    }

    onImageLoad() {
        this
            .props
            .data(this.state.src);
    }

    onBeforeFileLoad(elem) {
        console.log(elem)
        if (elem.target.files[0].size > 71680) {
            notification["error"]({message: 'Tipsy App', description: "File is too big!"});
            elem.target.value = "";
        } else if (elem.target.files[0].type !== "image/png" && elem.target.files[0].type !== "image/jpeg") {
            notification["error"]({message: 'Tipsy App', description: "Only PNG + JPEG Allowed To Be Uploaded"});
            elem.target.value = "";
        };
    }

    render() {
        return (
            <div
                className={"makeProfPicEditor grid-x align-center-middle " + this.className}>
                <Avatar
                    width={360}
                    height={360}
                    onCrop={this.onCrop}
                    onClose={this.onClose}
                    onImageLoad={this.onImageLoad}
                    onBeforeFileLoad={this.onBeforeFileLoad}
                    src={this.state.src}
                    className="editor-canvas cell"/>
            </div>
        )
    }
}

// ItemPreview Item [img,name,type,desc,id]
export const ItemPreview = ({items, className, type, postfix, postfixFunc}) => (
    <Fragment>
        {items.map(item => (<GetItem
            key={item.id}
            type={type}
            item={item}
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
        this.name = this.props.item.name
        this.id = this.props.item.id;
        this.img = this.item.img;
        this.className = this.props.className;

        this.link = "/tipsy/" + this.type + "/";
        this.descPre = "";
        this.desc = "";

        if (this.type === "user") {
            this.name = this.item.nickname;
            this.link = this.link + this.item.nickname;
        } else if (this.type === "bar") {
            this.link = this.link + this.item.id;
            this.descPre = "Owner:";
            this.desc = <span>{" " + this.item.owner}</span>;
        } else if (this.type === "recipe") {
            this.link = this.link + this.item.id;
            this.descPre = "Author:";
            this.desc = <span>{" " + this.item.author}</span>;
        } else if (this.type === "equipment") {
            this.link = this.link + this.item.name;
        } else if (this.type === "action") {
            this.name = this.props.item;
            this.link = "#";
            this.descPre = "";
            this.desc = "";
        } else {
            this.link = this.link + this.item.id
            if (this.item.desc !== null && this.item.desc !== "") {
                this.descPre = "Desc:";
                this.desc = <span>{" " + this.item.desc}</span>;
            }
        }

        this.postfix = this.props.postfix;
        this.postfixFunc = this.props.postfixFunc;

        if (this.postfix == null || this.postfix == "" || this.postfix == undefined) {
            this.postfixClass = "hidden"
        } else {
            this.postfixClass = " ";
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
                <Link
                    to={this.link}
                    className="previewItem small-11 grid-x align-center-middle cell">
                    <div className="small-5 grid-x cell">
                        <GetProfImg
                            className="small-10 cell"
                            pic={this.img}
                            alt={this.name}
                            type={this.type}/>
                    </div>
                    <div className="small-7 grid-x cell">
                        <div className="previewName cell">{this.name}</div>
                        <div className="previewDesc cell">{this.descPre}{this.desc}
                        </div>
                    </div>
                </Link>
                <div className="small-1 grid-x cell" onClick={this.postFunc}>
                    <GetProfImg
                        className={"small-6 cell " + this.postfixClass}
                        alt={this.postfix}
                        type={this.postfix}/>
                </div>
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

        let hasItem = this.state.data.some( items => items['nickname'] === item.nickname )

        if (success === true && hasItem === false) {

            notification.success({message: 'Tipsy App', description: "Added!"});

            this
                .state
                .data
                .push(item);

            this.setState({data: this.state.data});

        } else {
            if (hasItem) {
                notification.error({message: 'Tipsy App', description: "Already Added!"});
            } else {
                notification.error({message: 'Tipsy App', description: "Could not find that!"});
            }
        }

    }

    removeItem(item) {
        // update the state object
        const index = this
            .state
            .data
            .indexOf(item);

        if (index > -1) {
            this
                .state
                .data
                .splice(index, 1);
            this.setState({data: this.state.data});
            notification.success({message: 'Tipsy App', description: "Removed!"});
        } else {
            notification.error({message: 'Tipsy App', description: "Could not remove that!"});

        }

    }

    render() {
        return (
            <div className={"dynamicForm grid-x align-center-middle " + this.className}>
                <DynamicInput input="" addItem={this.addItem} type={this.type}/>
                <ItemPreview
                    className="small-6 cell"
                    items={this.state.data}
                    type={this.type}
                    postfix="remove"
                    postfixFunc={this.removeItem}/>
            </div>
        )
    }
};

class DynamicInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nickname: {
                value: ''
            }
        }

        this.type = this
            .props
            .type
            .charAt(0)
            .toUpperCase() + this
            .props
            .type
            .slice(1);

        if (this.type.toLowerCase() == "user") {
            this.state.name = "nickname";
        } else if (this.type.toLowerCase() == "recipe") {
            this.state.name = "name";
        } else {
            this.state.name = "name";
        }

        this.handleInputChange = this
            .handleInputChange
            .bind(this);
        this.onKeyDown = this
            .onKeyDown
            .bind(this);
        this.validateNicknameExists = this
            .validateNicknameExists
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

    onKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.validateNicknameExists(this.state.nickname.value);
        }
    }

    render() {
        return (
            <div className="dynamicInput grid-x align-center-middle cell">
                <Input
                    prefix={< Icon type = "idcard" />}
                    name={this.state.name}
                    autoComplete="on"
                    placeholder={"Enter " + this.type + " " + this
                    .state
                    .name
                    .charAt(0)
                    .toUpperCase() + this
                    .state
                    .name
                    .slice(1)}
                    value={this.state.nickname.value}
                    onChange={(event) => this.handleInputChange(event)}
                    onKeyDown={this.onKeyDown}
                    className="small-8 cell"/>
            </div>
        )
    }

    validateNicknameExists() {
        const nicknameValue = this.state.nickname.value;

        this.setState({
            nickname: {
                value: nicknameValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkNicknameAvailability(nicknameValue).then(response => {
            if (response.available) {
                this.setState({
                    nickname: {
                        value: nicknameValue,
                        validateStatus: 'error',
                        errorMsg: 'This nickname doesnt exist'
                    }
                });

                this
                    .props
                    .addItem(false, null);
            } else {
                this.setState({
                    nickname: {
                        value: nicknameValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });

                getUserProfile(nicknameValue).then(response => {
                    this
                        .props
                        .addItem(true, response)
                })
            }

        }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                nickname: {
                    value: nicknameValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }
}