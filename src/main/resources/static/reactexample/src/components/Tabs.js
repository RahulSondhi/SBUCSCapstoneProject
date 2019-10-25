import React, {Component} from 'react';
import {Link} from "react-router-dom";
import '../css/menu.css';

class Tabs extends Component {
    render() {
        return (
            <div className="topContainer">
                <div className="tabs">
                    <h1 className="title">
                        Tipsy
                    </h1>
                    <Link to="/bar" className="tab">
                        <h1>
                            Bar
                        </h1>
                    </Link>
                    <Link to="/recipe" className="tab">
                        <h1>
                            Recipe</h1>
                    </Link>
                    <Link to="/account" className="tab">
                        <h1>
                            Account
                        </h1>
                    </Link>
                    <Link to="/login" className="tab">
                        <h1>
                            Logout
                        </h1>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Tabs;