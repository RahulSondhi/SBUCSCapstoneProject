import React, {Component} from 'react';
import Tabs from '../search/tabs.js';
import { LargeButton, CustomButton } from '../../constants/constants.js';
import { Form, Input, Button, Icon, notification } from 'antd';
import './createbar.css';

class CreateBar extends Component {
    render() {
        return (
          <div>
              <Tabs/>
              <h1>
                  Create/Edit Your Bar
              </h1>
              <Input id="barName" size="large" name="barName" type="barName" placeholder="Enter Bar Name"/>
              <LargeButton redirect="/tipsy/myBars/bar" name="Create Bar +"/>

              <div className="grid-x grid-margin-x boxContainer">
                  <div className="cell small-6">
                  <h3> Managers </h3>
                  <div className="viewBox">
                      <p>ManagerName1</p>
                      <p>ManagerName2</p>
                      <CustomButton className="add" redirect="/tipsy/admin/user" name="Add Manager +"/>
                  </div>
                  </div>
                  <div className="cell small-6">
                    <h3> Workers</h3>
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
