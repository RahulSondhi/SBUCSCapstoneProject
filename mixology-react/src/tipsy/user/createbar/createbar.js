import React, {Component} from 'react';
import Tabs from '../../search/tabs.js';
import {CustomButton} from '../../../constants/constants.js'; 
import {Input} from 'antd';
import './createbar.css';

class CreateBar extends Component {
    render() {
        this.props.checkAuthenticated();
        return (
            <div>
                <Tabs/>
                <div className="grid-x">
                  <div className="cell small-4"></div>
                    <div className="grid-y small-4">
                        <h1 className="small-6 cell">
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
                    <div className="small-4 cell createButton" id="createButton">
                        <CustomButton redirect="/tipsy/myBars/bar" name="Create Bar +"/>
                    </div>
                </div>
                <div className="grid-x grid-margin-x boxContainer">
                    <div className="cell small-6">
                        <h3>
                            Managers
                        </h3>
                        <div className="viewBox">
                            <p>ManagerName1</p>
                            <p>ManagerName2</p>
                            <CustomButton
                                className="add"
                                redirect="/tipsy/admin/user"
                                name="Add Manager +"/>
                        </div>
                    </div>
                    <div className="cell small-6">
                        <h3>
                            Workers</h3>
                        <div className="viewBox">
                            <p>WorkerName1</p>
                            <p>WorkerName2</p>
                            <CustomButton className="add" redirect="/tipsy/admin/user" name="Add Worker +"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateBar;
