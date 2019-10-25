import React from 'react';
import Tabs from './Tabs';
import { BrowserRouter } from 'react-router-dom';
import '../css/results.css'

export const BarResults = () => {
    return (
        <div>
            <BrowserRouter>
                <Tabs/>
                <h1 class="header">
                    Bars
                </h1>
                <button className="createButton button">Create a Bar</button>
                <div className="box">
                    <div className="resultEntry">Bar Name</div>
                    <div className="resultEntry">Bar Name</div>
                    <div className="resultEntry">Bar Name</div>
                    <div className="resultEntry">Bar Name</div>
                    <div className="resultEntry">Bar Name</div>
                    <div className="resultEntry">Bar Name</div>
                    <div className="resultEntry">Bar Name</div>
                    <div className="resultEntry">Bar Name</div>
                    <div className="resultEntry">Bar Name</div>
                    <div className="resultEntry">Bar Name</div>
                    <div className="resultEntry">Bar Name</div>
                    <div className="resultEntry">Bar Name</div>
                    <div className="resultEntry">Bar Name</div>
                </div>
            </BrowserRouter>
        </div>
    )
};

export const RecipeResults = () => {
    return (
        <div>
            <BrowserRouter>
                <Tabs/>
                <h1 class="header">
                    Bars
                </h1>
                <button className="createButton button">Create a Recipe </button>
                <div className="box">
                    <div className="resultEntry">Bar Name</div>
                    <div className="resultEntry">Bar Name</div>
                    <div className="resultEntry">Bar Name</div>
                    <div className="resultEntry">Bar Name</div>
                    <div className="resultEntry">Bar Name</div>
                    <div className="resultEntry">Bar Name</div>
                    <div className="resultEntry">Bar Name</div>
                    <div className="resultEntry">Bar Name</div>
                    <div className="resultEntry">Bar Name</div>
                    <div className="resultEntry">Bar Name</div>
                    <div className="resultEntry">Bar Name</div>
                    <div className="resultEntry">Bar Name</div>
                    <div className="resultEntry">Bar Name</div>
                </div>
            </BrowserRouter>
        </div>
    )
};