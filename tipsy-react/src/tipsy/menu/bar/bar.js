import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Tabs from '../../search/tabs.js';
import './bar.css';

class Bar extends Component {
    render() {
        return (
            <div className="grid-margin-y">
                <Tabs/>
                <h1 className="cell small-6 caption">
                    Bar Name
                </h1>
                <h4>Author: Name
                </h4>
                <div className="grid-x grid-margin-x boxContainer">
                    <div className="cell small-4">
                        <h4>
                            Managers
                        </h4>
                        <div className="barBox">
                            <Link to="/tipsy/admin/user" className="userBoxEntry">ManagerName1</Link>
                            <Link to="/tipsy/admin/user" className="userBoxEntry">ManagerName2</Link>

                        </div>
                    </div>
                    <div className="cell small-4">
                        <h4>
                            Workers</h4>
                        <div className="barBox">
                            <Link to="/tipsy/admin/user" className="userBoxEntry">WorkerName1</Link>
                            <Link to="/tipsy/admin/user" className="userBoxEntry">WorkerName2</Link>
                        </div>
                    </div>
                    <div className="cell small-4">
                        <h4>
                            Recipes</h4>
                        <div className="barBox">
                            <Link to="/tipsy/myBars/bar" className="userBoxEntry">BarName1</Link>
                            <Link to="/tipsy/myBars/bar" className="userBoxEntry">BarName2</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Bar;
