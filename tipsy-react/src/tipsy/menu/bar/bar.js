import React, {Component} from 'react';
import Tabs from '../../search/tabs.js';
import './bar.css';

class Bar extends Component {
    render() {
        return (
          <div>
              <Tabs/>
              <h1>
                  BarName
              </h1>
              <h3>Author: Name
              </h3>
              <div className="grid-x grid-margin-x boxContainer">
                  <div className="cell small-4">
                    <h3> Managers </h3>
                    <div className="barBox">
                        <p>ManagerName1</p>
                        <p>ManagerName2</p>
                    </div>
                  </div>
                  <div className="cell small-4">
                      <h3> Workers</h3>
                      <div className="barBox">
                      <p>WorkerName1</p>
                      <p>WorkerName2</p>
                      </div>
                  </div>
                  <div className="cell small-4">
                      <h3> Recipes</h3>
                      <div className="barBox">
                      <p>RecipeName1</p>
                      <p>RecipeName2</p>
                      </div>
                  </div>
              </div>
          </div>
        )
    }
}

export default Bar;
