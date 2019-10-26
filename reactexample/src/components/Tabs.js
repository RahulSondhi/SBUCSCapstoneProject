import React from 'react';
import {Link} from "react-router-dom";
import '../css/menu.css';

const Tabs = () => (
    <div className="topContainer">
        <div className="tabs">
            <h1 className="title">
                Tipsy
            </h1>
            <Link to="/bar" className="tab">
                <h1>
                    Bars
                </h1>
            </Link>
            <Link to="/recipe" className="tab">
                <h1>
                    Recipes</h1>
            </Link>
            <Link to="/account" className="tab">
                <h1>
                    Account
                </h1>
            </Link>
            <Link to="/" className="tab">
                <h1>
                    Logout
                </h1>
            </Link>
        </div>
    </div>
)

export default Tabs;