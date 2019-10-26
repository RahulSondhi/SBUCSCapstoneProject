import React, {Component} from 'react';
import '../css/menu.css';

class Menu extends Component {
    render() {
        return(
            <div>
            <h1 className="title"> Tipsy </h1>
            <div className="tabs">
            <button className="tab" id="barTab"> Bar </button>
            <button className="tab" id="recipeTab"> Recipe </button>
            <button className="tab" id="accountTab"> Account </button> 
            <button className="tab" id="logoutButton"> Logout </button>
            <input className="search" type="text" placeholder="Search..."/>
            </div>
            
            {/* <!-- bar tab--> */}
            <div className="box" id="barBox">
            <div className="entry"> 
            <div className="bar-progress"> 
            <p className="text-info textLeft"> BarName </p>
            <p className="text-info textLeft"> OwnerName </p>
            <p className="text-info textRight" id="progress"> 40% </p>
            <p className="text-info textRight"> Date </p>
            
            </div>
            <div className="button" id="make"> Make </div>
            <div className="button" id="view"> View </div>
            </div>
            <div className="addBar">+</div>
            </div>
            
            {/* /* <!-- recipe tab --> */}
            {/* <div className="box" id="recipeBox">
            <div className="entry"> 
            <div className="bar-progress"> 
            <p className="text-info textLeft"> BarName </p>
            <p className="text-info textLeft"> OwnerName </p>
            <p className="text-info textRight" id="progress"> 40% </p>
            <p className="text-info textRight"> Date </p>
            
            </div>
            <div className="button" id="make"> Make </div>
            <div className="button" id="view"> View </div>
            </div>
            <div className="addBar">+</div>
        </div> */}
        
        
        {/* <-- bar tab --> */}
        {/* <div className="box" id="accountBox">
        <div className="entry"> 
        <div className="bar-progress"> 
        <p className="text-info textLeft"> BarName </p>
        <p className="text-info textLeft"> OwnerName </p>
        <p className="text-info textRight" id="progress"> 40% </p>
        <p className="text-info textRight"> Date </p>
        
        </div>
        <div className="button" id="make"> Make </div>
        <div className="button" id="view"> View </div>
        </div>
        <div className="addBar">+</div>
    </div> */}
    
    </div>
    )
}
}

export default Menu;