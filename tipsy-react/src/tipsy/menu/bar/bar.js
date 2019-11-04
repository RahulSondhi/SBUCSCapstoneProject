import React, {Component} from 'react';
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
                    <h4> Managers </h4>
                    <div className="barBox">
                        <p>ManagerName1</p>
                        <p>ManagerName2</p>
                    </div>
                  </div>
                  <div className="cell small-4">
                      <h4> Workers</h4>
                      <div className="barBox">
                      <p>WorkerName1</p>
                      <p>WorkerName2</p>
                      </div>
                  </div>
                  <div className="cell small-4">
                      <h4> Recipes</h4>
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
