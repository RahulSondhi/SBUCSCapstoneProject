import React, {Component} from 'react';
import Tabs from '../../search/tabs.js';
import '../../menu/menu.css';

class Recipe extends Component {
    render() {
        return (
            <div className="topContainer">
                <Tabs/>
                {/* <-- bar tab --> */}
                <div className="box" id="recipeBox">
                    <div className="entry">
                        <div className="bar-progress">
                            <div className="text-section textLeft">
                                <p className="text-info">
                                    BarName
                                </p>
                                <p className="text-info">
                                    OwnerName
                                </p>
                            </div>
                            <div className="text-section textRight">
                                <p className="text-info" id="progress">
                                    40%
                                </p>
                                <p className="text-info">
                                    Date
                                </p>
                            </div>
                        </div>
                        <div className="button" id="make">
                            Make
                        </div>
                        <div className="button" id="view">
                            View
                        </div>
                    </div>
                    <button className="addBar button">+</button>
                </div>

            </div>
        )
    }
}

export default Recipe;