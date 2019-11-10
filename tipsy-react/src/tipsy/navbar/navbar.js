import React, {Component} from 'react';
import GeneralNavbar from './rightNavbar';
import {Drawer, Button} from 'antd';
import Tipsy from '../../assets/Tipsy.png';

class Navbar extends Component {

    state = {
        current: 'mail',
        visible: false
    }
    showDrawer = () => {
        this.setState({visible: true});
    };
    onClose = () => {
        this.setState({visible: false});
    };

    render() {
        return (

            <nav className="menuBar">
                <div className="logo">
                <img src={Tipsy} alt="Tipsy" alt="TipsyLogo"/>
                </div>
                <div className="menuCon">
                    {/* <div className="leftMenu">
                        <LeftMenu/>
                    </div> */}
                    <div className="rightMenu">
                        <GeneralNavbar mode={'horizontal'}/>
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
                        <GeneralNavbar mode={'inline'}/>
                    </Drawer>
                </div>
            </nav>
        )
    }
}

export default Navbar;