import React, {Component} from 'react';
import {CustomCreateButton} from '../../js/constants.js';
import {Input} from 'antd';
import {Link} from 'react-router-dom';
import Navbar from '../navbar/navbar.js';

class CreateBarPage extends Component {
    render() {
        return (
            <div className="grid-margin-y">
                <Navbar/>
                <div className="cell grid-x">
                    <div className="grid-margin-y small-4 large-offset-4">
                        <h1 className="small-6 cell caption">
                            Create/Edit Your Bar
                        </h1>
                        <div className="small-6 cell">
                            <Input
                                id="barName"
                                size="large"
                                name="barName"
                                type="barName"
                                placeholder="Enter Bar Name"/>
                        </div>
                    </div>
                    <div className="small-4 cell">
                        <CustomCreateButton redirect="/tipsy/myBars/bar" name="Create Bar +"/>
                    </div>
                </div>
                <div className="grid-x grid-margin-x boxContainer">
                    <div className="cell small-6">
                        <h3>
                            Managers
                        </h3>
                        <div className="card">
                            <Link to="/tipsy/admin/user" className="userBoxEntry">ManagerName1</Link>
                            <Link to="/tipsy/admin/user" className="userBoxEntry">ManagerName2</Link>
                        </div>
                        <Link to="/tipsy/admin/user">
                            <button type="submit" className="add button" disabled>
                                Add Manager +
                            </button>
                        </Link>
                    </div>
                    <div className="cell small-6">
                        <h3>
                            Workers</h3>
                        <div className="card">
                            <Link to="/tipsy/admin/user" className="userBoxEntry">WorkerName1</Link>
                            <Link to="/tipsy/admin/user" className="userBoxEntry">WorkerName2</Link>
                        </div>
                        <Link to="/tipsy/admin/user">
                            <button type="submit" className="add button" disabled>
                                Add Worker +
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateBarPage;
