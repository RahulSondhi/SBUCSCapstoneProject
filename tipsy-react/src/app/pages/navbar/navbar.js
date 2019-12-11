import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

import GeneralNavbar from './rightNavbar';

import Tipsy from '../../assets/Tipsy.png';

import {Drawer, Button} from 'antd';

class Navbar extends Component {

    state = {
        current: 'mail',
        visible: false,
        type: "normal"
    }

    showDrawer = () => {
        this.setState({visible: true});
    };
    onClose = () => {
        this.setState({visible: false});
    };

    constructor(props) {
        super(props);

        if(this.props.type === "game"){
            this.state.type = "game";
        }
    }

    render() {
        return (
            <nav className="menuBar">
                <div className="logo">
                    <NavLink to={"/app/"}>
                        <img src={Tipsy} alt="TipsyLogo"/>
                    </NavLink>
                </div>
                <div className="menuCon">
                    {/* <div className="leftMenu">
                        <LeftMenu/>
                    </div> */}
                    <div className="rightMenu">
                        <GeneralNavbar mode={'horizontal'} type={this.state.type}/>
                    </div>
                    <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
                        <span className="barsBtn"></span>
                    </Button>
                    <Drawer
                        title="Menu"
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}>
                        {/* <LeftMenu/> */}
                        <GeneralNavbar mode={'inline'} type={this.state.type}/>
                    </Drawer>
                </div>
            </nav>
        )
    }
}

export default Navbar;