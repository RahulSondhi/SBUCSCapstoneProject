import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './tabs.css';
import {Icon} from 'antd';
import {SmallTipsyStyle, SVG} from '../../js/constants.js';
import Tipsy from '../../assets/Tipsy.png';

const Tab = (props) => {
    return (
        <div>
            <Link to={props.link} className="tab link">
                <li>
                    {props.name}
                </li>
            </Link>
        </div>
    )
};

class Tabs extends Component {

  constructor() {
    super();

    this.state = {
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {

    if (event.target != null || !this.dropdownMenu.contains(event.target)) {

      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }
  }

    render() {
        return (
          <div>
            <nav className="top-bar tabHolder tabs">
                <SVG src={Tipsy} style={SmallTipsyStyle} alt="TipsyLogo"/>
                <div className="top-bar-right ">
                    <ul className="horizontal menu nested">
                        <Tab className="tab" link="/tipsy/search" name="Search"/>
                        <Tab className="tab" link="/tipsy/myBars" name="My Bars"/>
                        <Tab className="tab" link="/tipsy/myRecipes" name="My Recipes"/>
                        <Tab className="tab" link="/tipsy/barGears" name="Bar Gears"/>
                        <div className="account" onClick={this.showMenu}> {< Icon type = "user" />}</div>
                    </ul>
                </div>
            </nav>
            {
              this.state.showMenu
              ? (
                 <div className="list" ref={(element) => {
                     this.dropdownMenu = element;
                   }}>
                   <div className="icon"> {< Icon type = "user" />} </div>
                   <a href="/tipsy/admin/user">
                    <div className="option"> Account </div>
                  </a>
                  <a href="/tipsy/admin">
                   <div className="option"> Admin </div>
                  </a>
                 </div>
               )
               : (null)
           }
            </div>
        )
    }
}

export default Tabs;
