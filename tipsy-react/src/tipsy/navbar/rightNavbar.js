import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {Menu, Icon} from 'antd';

import SearchPNG from '../../assets/navbar/searchIcon.png';
import BarToolsPNG from '../../assets/navbar/barToolsIcon.png';
import MyBarsPNG from '../../assets/navbar/myBarsIcon.png';
import RecipePNG from '../../assets/navbar/recipeIcon.png';
import AccountPNG from '../../assets/navbar/accountIcon.png';

const {SubMenu} = Menu;

var isFirefox = typeof InstallTrigger !== 'undefined';

class GeneralNavbar extends Component {

    constructor(props) {
        super(props);

        this.type = this.props.type;
        this.gameId = this.props.gameId;
    }

    render() {
        if (this.type === "game") {
            return (
                <Menu theme="dark" mode={this.props.mode}>

                    {/* Instruction */}
                    <Menu.Item key="instruction">
                        <NavLink
                            to={"/tipsy/recipe/"+this.gameId+"/instruction"}
                            isActive={(match, location) => {
                            if (!match) {
                                return false;
                            }
                            const eventID = parseInt(match.params.eventID);
                            return !isNaN(eventID) && eventID % 2 === 1;
                        }}>
                            <InstructionIcon/>
                            Instruction
                        </NavLink>
                    </Menu.Item>


                    {/* Quit */}
                    <Menu.Item key="quit">
                        <NavLink
                            to={"/tipsy/myBars/tipsy/recipe/"+this.gameId}
                            isActive={(match, location) => {
                            if (!match) {
                                return false;
                            }
                            const eventID = parseInt(match.params.eventID);
                            return !isNaN(eventID) && eventID % 2 === 1;
                        }}>
                            <QuitIcon/>
                            Quit
                        </NavLink>
                    </Menu.Item>
                </Menu>
            )

        } else {
            return (
                <Menu theme="dark" mode={this.props.mode}>

                    {/* Search */}
                    <Menu.Item key="search">
                        <NavLink
                            to="/tipsy/search"
                            isActive={(match, location) => {
                            if (!match) {
                                return false;
                            }
                            const eventID = parseInt(match.params.eventID);
                            return !isNaN(eventID) && eventID % 2 === 1;
                        }}>
                            < SearchIcon/>
                            Search
                        </NavLink>
                    </Menu.Item>

                    {/* Bar Gears */}
                    <Menu.Item key="barEquipment">
                        <NavLink
                            to="/tipsy/barEquipment"
                            isActive={(match, location) => {
                            if (!match) {
                                return false;
                            }
                            const eventID = parseInt(match.params.eventID);
                            return !isNaN(eventID) && eventID % 2 === 1;
                        }}>
                            < BarToolsIcon/>
                            Bar Equipment
                        </NavLink>
                    </Menu.Item>

                    {/* My Bars */}
                    <Menu.Item key="myBars">
                        <NavLink
                            to="/tipsy/myBars"
                            isActive={(match, location) => {
                            if (!match) {
                                return false;
                            }
                            const eventID = parseInt(match.params.eventID);
                            return !isNaN(eventID) && eventID % 2 === 1;
                        }}>
                            < BarIcon/>
                            My Bars
                        </NavLink>
                    </Menu.Item>

                    {/* My Recipes */}
                    <Menu.Item key="myRecipes">
                        <NavLink
                            to="/tipsy/myRecipes"
                            isActive={(match, location) => {
                            if (!match) {
                                return false;
                            }
                            const eventID = parseInt(match.params.eventID);
                            return !isNaN(eventID) && eventID % 2 === 1;
                        }}>
                            < RecipeIcon/>
                            My Recipes
                        </NavLink>
                    </Menu.Item>

                    {/* Account */}
                    <SubMenu title={<span> <AccountIcon/> Account </span>}>
                        <Menu.Item key="Account:1">
                            <NavLink
                                to="/tipsy/user/me"
                                isActive={(match, location) => {
                                if (!match) {
                                    return false;
                                }
                                const eventID = parseInt(match.params.eventID);
                                return !isNaN(eventID) && eventID % 2 === 1;
                            }}>
                                < UserIcon/>
                                My Profile
                            </NavLink>
                        </Menu.Item>

                        <Menu.Item key="setting:2">
                            <NavLink
                                to="/tipsy/user/stg"
                                isActive={(match, location) => {
                                if (!match) {
                                    return false;
                                }
                                const eventID = parseInt(match.params.eventID);
                                return !isNaN(eventID) && eventID % 2 === 1;
                            }}>
                                <Icon type="tool" theme="twoTone" twoToneColor="#A0A0A0"/>
                                Settings
                            </NavLink>
                        </Menu.Item>

                        <Menu.Item key="setting:3">
                            <NavLink
                                to="/logout"
                                isActive={(match, location) => {
                                if (!match) {
                                    return false;
                                }
                                const eventID = parseInt(match.params.eventID);
                                return !isNaN(eventID) && eventID % 2 === 1;
                            }}>
                                <Icon type="logout" theme="twoTone" twoToneColor="#FFFFFF"/>
                                Log Out
                            </NavLink>
                        </Menu.Item>
                    </SubMenu>

                </Menu>
            )
        }
    }
}

// Normal
const SearchIcon = (props) => isFirefox
    ? <img src={SearchPNG} id="search" alt="SearchIcon"/>
    : <Icon component={SearchSvg} {...props}/>;
const BarIcon = (props) => isFirefox
    ? <img src={MyBarsPNG} id="myBars" alt="barIcon"/>
    : <Icon component={MyBarsSvg} {...props}/>;
const RecipeIcon = (props) => isFirefox
    ? <img src={RecipePNG} id="recipes" alt="recipeIcon"/>
    : <Icon component={RecipeSvg} {...props}/>;
const BarToolsIcon = (props) => isFirefox
    ? <img src={BarToolsPNG} id="barEquipment" alt="barToolsIcon"/>
    : <Icon component={BarToolsSvg} {...props}/>;
const AccountIcon = (props) => isFirefox
    ? <img src={AccountPNG} id="account" alt="accountIcon"/>
    : <Icon component={AccountSvg} {...props}/>;
const UserIcon = (props) => isFirefox
    ? <img src={AccountPNG} id="account" alt="userIcon"/>
    : <Icon component={AccountSvg} {...props}/>;

// Game
const InstructionIcon = (props) => isFirefox
    ? <img src={RecipePNG} id="instruction" alt="instructionIcon"/>
    : <Icon component={RecipeSvg} {...props}/>;
const QuitIcon = (props) => isFirefox
    ? <img src={RecipePNG} id="instruction" alt="instructionIcon"/>
    : <Icon component={RecipeSvg} {...props}/>;    

// SVGs
const SearchSvg = () => (
    <svg
        height="18px"
        version="1.1"
        viewBox="0 0 18 18"
        width="18px"
        xmlns="http://www.w3.org/2000/svg"><title/><desc/><defs/>
        <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
            <g fill="#000000" id="Core" transform="translate(-339.000000, -381.000000)">
                <g id="search" transform="translate(339.000000, 381.000000)"><path
                    d="M12.5,11 L11.7,11 L11.4,10.7 C12.4,9.6 13,8.1 13,6.5 C13,2.9 10.1,0 6.5,0 C2.9,0 0,2.9 0,6.5 C0,10.1 2.9,13 6.5,13 C8.1,13 9.6,12.4 10.7,11.4 L11,11.7 L11,12.5 L16,17.5 L17.5,16 L12.5,11 L12.5,11 Z M6.5,11 C4,11 2,9 2,6.5 C2,4 4,2 6.5,2 C9,2 11,4 11,6.5 C11,9 9,11 6.5,11 L6.5,11 Z"
                    id="Shape"/></g>
            </g>
        </g>
    </svg>
);

const MyBarsSvg = () => (
    <svg id="Layer_3" enableBackground="new 0 0 64 64" viewBox="0 0 64 64"><path d="m7 31h2v5h-2z" fill="#677b50"/><path d="m15 31h2v5h-2z" fill="#677b50"/><path d="m23 31h2v5h-2z" fill="#677b50"/><path d="m34 2h28v20h-28z" fill="#e3aa75"/>
        <g fill="#ff8087"><path d="m38 16h4v6h-4z"/><path d="m46 16h4v6h-4z"/><path d="m54 16h4v6h-4z"/><path d="m54 6h4v6h-4z"/><path d="m46 6h4v6h-4z"/><path d="m38 6h4v6h-4z"/></g><path d="m2 2h28v18h-28z" fill="#c9c6ca"/><path d="m18 20v-8l2-2v-4h4v4l2 2v8" fill="#e3aa75"/><path d="m6 20v-8l2-2v-4h4v4l2 2v8" fill="#e3aa75"/><path d="m6 13h8v7h-8z" fill="#aa8058"/><path d="m18 13h8v7h-8z" fill="#aa8058"/><path d="m24 32c-1.105 0-2-.895-2-2v-4h4v4c0 1.105-.895 2-2 2z" fill="#cdf5a0"/><path d="m16 32c-1.105 0-2-.895-2-2v-4h4v4c0 1.105-.895 2-2 2z" fill="#cdf5a0"/><path d="m8 32c-1.105 0-2-.895-2-2v-4h4v4c0 1.105-.895 2-2 2z" fill="#cdf5a0"/><path d="m4 40h56v22h-56z" fill="#717072"/><path d="m4 40h53v22h-53z" fill="#979598"/><path d="m2 36h60v4h-60z" fill="#979598"/><path d="m2 36h57v4h-57z" fill="#c9c6ca"/><path d="m4 55h56v2h-56z" fill="#555456"/><path d="m34 11h28v2h-28z" fill="#aa8058"/></svg>
);

const RecipeSvg = () => (
    <svg viewBox="0 0 93.902 169">
        <defs>
            <radialGradient
                id="radial-gradient"
                cx="0.5"
                cy="0.5"
                r="0.5"
                gradientUnits="objectBoundingBox">
                <stop offset="0" stopColor="#ff9200"/>
                <stop offset="1" stopColor="#ff8448"/>
            </radialGradient>
            <linearGradient
                id="linear-gradient"
                x1="1.186"
                y1="0.182"
                x2="-0.091"
                y2="0.859"
                gradientUnits="objectBoundingBox">
                <stop offset="0" stopColor="#fff1ae"/>
                <stop offset="1" stopColor="#ecd76d"/>
            </linearGradient>
        </defs>
        <g id="rum" transform="translate(-48.278 -64)">
            <path
                id="Path_34"
                data-name="Path 34"
                d="M30.3,12.3V-10.671H48.679V12.3S81.986,26.848,81.986,44.842,68.118,117,68.118,117s-14.165-7.051-28.331-7.051S11.457,117,11.457,117-1.857,60.156-3.006,44.842,30.3,12.3,30.3,12.3Z"
                transform="translate(55 116)"
                fill="url(#radial-gradient)"/>
            <path
                id="Path_33"
                data-name="Path 33"
                d="M32.091-.766H58.124V49.969S85.689,65.572,92,75.8s-14.733,82.878-14.733,82.878H13.714S-4.526,83.536,0,75.8,32.091,49.969,32.091,49.969Z"
                transform="translate(49 74.319)"
                fill="rgba(255,255,255,0.25)"/>
            <rect
                id="Rectangle_9"
                data-name="Rectangle 9"
                width="33"
                height="29"
                rx="5"
                transform="translate(78 64)"
                fill="url(#linear-gradient)"/>
            <rect
                id="Rectangle_10"
                data-name="Rectangle 10"
                width="42"
                height="16"
                transform="translate(74 174)"/>
            <path
                id="Icon_map-compass"
                data-name="Icon map-compass"
                d="M18,35.28A17.28,17.28,0,1,1,35.28,18,17.3,17.3,0,0,1,18,35.28ZM18,3.6A14.4,14.4,0,1,0,32.4,18,14.416,14.416,0,0,0,18,3.6Zm.032,2.34S12.96,14.631,12.96,17.28v1.44c0,2.648,5.088,11.52,5.088,11.52S23.04,21.552,23.04,18.9V17.276c0-2.649-5.008-11.336-5.008-11.336ZM18,20.88A2.88,2.88,0,1,1,20.88,18,2.88,2.88,0,0,1,18,20.88Z"
                transform="translate(77 150)"/>
            <path
                id="Path_35"
                data-name="Path 35"
                d="M0,0H12.926V15H0L6.726,7.585Z"
                transform="translate(63.074 179)"/>
            <path
                id="Path_36"
                data-name="Path 36"
                d="M0,0H13.9L7.334,7.919,13.9,15H0Z"
                transform="translate(113 179)"/>
            <text
                id="Rum-2"
                data-name="Rum"
                transform="translate(80 174)"
                fill="#fff"
                fontSize="15"
                fontFamily="Algerian">
                <tspan x="0" y="13">Rum</tspan>
            </text>
            <text
                id="Maroon"
                transform="translate(85 144)"
                fontSize="5"
                fontFamily="Algerian">
                <tspan x="0" y="4">Maroon</tspan>
            </text>
            <path
                id="Path_37"
                data-name="Path 37"
                d="M2047.131,1.528c24.456,23.812,18.664,20.916,18.664,20.916"
                transform="matrix(0.995, -0.105, 0.105, 0.995, -1925.992, 351.056)"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeWidth="3"/>
        </g>
    </svg>
);

const BarToolsSvg = () => (
    <svg viewBox="0 0 64 64"><path d="m37.939 11v-6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6z" fill="#047fa7"/><path
        d="m55.939 61h-24l-3.026-40.1a12 12 0 0 1 11.966-12.9h6.121a12 12 0 0 1 11.965 12.9z"
        fill="#0093ba"/><path d="m29.449 28 2.49 33h24l2.491-33z" fill="#047fa7"/><path d="m8.219 24.95a6 6 0 1 1 6.72-5.95z" fill="#faac2b"/><path
        d="m22.425 55.428 5.7 1.71a4.032 4.032 0 0 1 2.875 3.862h-24a4.032 4.032 0 0 1 2.873-3.862l5.7-1.71a2 2 0 0 0 1.427-1.916v-7.512a11.877 11.877 0 0 1 -9.668-13.1l1.668-13.9h20l1.668 13.9a11.877 11.877 0 0 1 -9.668 13.1v7.512a2 2 0 0 0 1.425 1.916z"
        fill="#ccdce5"/><path
        d="m8.916 18.676h21.775v2h-21.775z"
        fill="#abbac2"
        transform="matrix(.196 -.981 .981 .196 -3.377 35.232)"/><path
        d="m21 46a11.877 11.877 0 0 0 9.668-13.1l-.468-3.9h-22.4l-.468 3.9a11.877 11.877 0 0 0 9.668 13.1v1a2 2 0 0 0 2 2 2 2 0 0 0 2-2z"
        fill="#ffc119"/><path
        d="m53.948 19.121a7.026 7.026 0 0 0 -5.195-5.9l.494-1.939a9.026 9.026 0 0 1 6.686 7.6z"
        fill="#7ecce6"/><path
        d="m53.868 21h2.006v2h-2.006z"
        fill="#7ecce6"
        transform="matrix(.075 -.997 .997 .075 28.807 75.061)"/><path d="m26.939 37h20v24h-20z" fill="#ccdce5"/><path
        d="m36.939 48a1 1 0 0 1 -.707-.293l-3-3 1.414-1.414 2.293 2.293 2.293-2.293 1.414 1.414-3 3a1 1 0 0 1 -.707.293z"
        fill="#88bf40"/><path d="m26.939 47h20v14h-20z" fill="#eb4042"/><path d="m29.939 51h2v2h-2z" fill="#cd2027"/><path d="m35.939 55h2v2h-2z" fill="#cd2027"/><path d="m40.939 51h2v2h-2z" fill="#cd2027"/>
        <g fill="#faac2b"><path d="m10.939 33h2v2h-2z"/><path d="m19.939 35h2v2h-2z"/><path d="m17.939 41h2v2h-2z"/></g><path d="m22.919 9.196-1.961-.392-2.039 10.196h2.04z" fill="#88bf40"/></svg>
);
const AccountSvg = () => (
    <svg id="Layer_5" enableBackground="new 0 0 64 64" viewBox="0 0 64 64">
        <path
            d="m38 16v10c0-1.1-.45-2.1-1.17-2.83-.73-.72-1.73-1.17-2.83-1.17v-2c0-1.1-.9-2-2-2h-.38c-4.2 0-8.35-.71-12.29-2.09-1.46-.51-3.07-.17-4.16.92-.75.75-1.17 1.76-1.17 2.82v2.35c-2.21 0-4 1.79-4 4v-10c0-7.73 6.27-14 14-14 3.86 0 7.36 1.57 9.9 4.1 2.53 2.54 4.1 6.04 4.1 9.9z"
            fill="#656d78"/><path
            d="m62 32.32v23.68h-8v-7-9h-10v-7.68c0-.11 0-.21.01-.32h17.98c.01.11.01.21.01.32z"
            fill="#b4dd7f"/><path
            d="m54 56h8c0 3.31-2.69 6-6 6h-8.47c1.37 0 2.68-.39 3.8-1.08 1.12-.7 2.05-1.7 2.67-2.92z"
            fill="#e6e9ed"/><path
            d="m61.99 32h-17.98c.13-2.45 1.74-4.58 4.09-5.37l1.9-.63v-6h6v6l1.9.63c2.35.79 3.96 2.92 4.09 5.37z"
            fill="#e6e9ed"/><path
            d="m58 17v2c0 .55-.45 1-1 1h-1-6-1c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1h8c.55 0 1 .45 1 1z"
            fill="#3bafda"/><path
            d="m41.6 49.35c2.3 1.38 4.56 2.65 6.4 2.65 2 0 6-1 6-3v7 2c-.62 1.22-1.55 2.22-2.67 2.92-1.12.69-2.43 1.08-3.8 1.08h-1.53-2.96-.57c-2.74 0-5.24-1.55-6.47-4v-11.61c1.74.61 3.68 1.83 5.6 2.96z"
            fill="#ff826e"/><path
            d="m54 40v9c0-2-4-3-6-3-2.16 0-4.6 1.74-6.4 3.35-1.92-1.13-3.86-2.35-5.6-2.96v-4.28-2.11h8z"
            fill="#e6e9ed"/><path
            d="m48 46c2 0 6 1 6 3s-4 3-6 3c-1.84 0-4.1-1.27-6.4-2.65 1.8-1.61 4.24-3.35 6.4-3.35z"
            fill="#fc6e51"/><path
            d="m42.47 62h-32.47v-5.38c0-4.33-.76-8.6-2.23-12.66v-.01c.59-.36 1.22-.67 1.88-.93l6.47-2.51c-.08.23-.12.47-.12.73v1.52c0 .62.25 1.18.66 1.58.4.41.96.66 1.58.66.03 0 .07 0 .1-.01v.01c1.18 3.38 3.12 6.46 5.66 9 2.54-2.54 4.47-5.62 5.66-9v-.01c.03.01.07.01.1.01.62 0 1.18-.25 1.58-.66.41-.4.66-.96.66-1.58v-1.52c0-.26-.04-.5-.12-.73l4.12 1.6v4.28 11.61c1.23 2.45 3.73 4 6.47 4z"
            fill="#656d78"/><path
            d="m36.83 23.17c.72.73 1.17 1.73 1.17 2.83 0 2.21-1.79 4-4 4h-1.56c1-1.94 1.56-4.14 1.56-6.44v-1.56c1.1 0 2.1.45 2.83 1.17z"
            fill="#f0d0b4"/><path
            d="m34 22v1.56c0 2.3-.56 4.5-1.56 6.44h-.01c-1.06 2.06-2.63 3.85-4.57 5.16-1.16.8-2.46 1.42-3.86 1.84-1.4-.42-2.7-1.04-3.86-1.84-1.94-1.31-3.51-3.1-4.57-5.16h-.01c-1-1.94-1.56-4.14-1.56-6.44v-1.56-2.35c0-1.06.42-2.07 1.17-2.82 1.09-1.09 2.7-1.43 4.16-.92 3.94 1.38 8.09 2.09 12.29 2.09h.38c1.1 0 2 .9 2 2z"
            fill="#f0d0b4"/><path
            d="m32 41.24v1.52c0 .62-.25 1.18-.66 1.58-.4.41-.96.66-1.58.66-.03 0-.07 0-.1-.01-.46-.01-.9-.17-1.26-.45l-2.51-1.91c.07-.2.11-.41.11-.63s-.04-.43-.11-.63l2.51-1.91c.23-.18.49-.3.76-.37.19-.06.4-.09.6-.09.98 0 1.82.63 2.12 1.51.08.23.12.47.12.73z"
            fill="#fcd770"/><path
            d="m29.66 44.99v.01c-1.19 3.38-3.12 6.46-5.66 9-2.54-2.54-4.48-5.62-5.66-9v-.01c.46-.01.9-.17 1.26-.45l2.51-1.91c.26.79 1.01 1.37 1.89 1.37s1.63-.58 1.89-1.37l2.51 1.91c.36.28.8.44 1.26.45z"
            fill="#e6e9ed"/><path
            d="m29.16 39.08v.01c-.27.07-.53.19-.76.37l-2.51 1.91c-.26-.79-1.01-1.37-1.89-1.37s-1.63.58-1.89 1.37l-2.51-1.91c-.23-.18-.49-.3-.76-.37v-.01c.73-.73 1.16-1.74 1.16-2.82v-.89l.14-.21c1.16.8 2.46 1.42 3.86 1.84 1.4-.42 2.7-1.04 3.86-1.84l.14.21v.89c0 1.08.43 2.09 1.16 2.82z"
            fill="#f0d0b4"/><path
            d="m25.89 41.37c.07.2.11.41.11.63s-.04.43-.11.63c-.26.79-1.01 1.37-1.89 1.37s-1.63-.58-1.89-1.37c-.07-.2-.11-.41-.11-.63s.04-.43.11-.63c.26-.79 1.01-1.37 1.89-1.37s1.63.58 1.89 1.37z"
            fill="#ffc729"/><path
            d="m19.6 39.46 2.51 1.91c-.07.2-.11.41-.11.63s.04.43.11.63l-2.51 1.91c-.36.28-.8.44-1.26.45-.03.01-.07.01-.1.01-.62 0-1.18-.25-1.58-.66-.41-.4-.66-.96-.66-1.58v-1.52c0-.26.04-.5.12-.73.3-.88 1.14-1.51 2.12-1.51.2 0 .41.03.6.09.27.07.53.19.76.37z"
            fill="#fcd770"/><path
            d="m15.56 30h-1.56c-1.1 0-2.1-.45-2.83-1.17-.72-.73-1.17-1.73-1.17-2.83 0-2.21 1.79-4 4-4v1.56c0 2.3.56 4.5 1.56 6.44z"
            fill="#f0d0b4"/><path
            d="m10 56.62v5.38h-8v-7.79c0-4.24 2.23-8.11 5.77-10.25 1.47 4.06 2.23 8.33 2.23 12.66z"
            fill="#e6e9ed"/><path d="m23 47h2v2h-2z"/><path
            d="m58.213 25.684-1.213-.405v-4.279c1.103 0 2-.897 2-2v-2c0-1.103-.897-2-2-2h-8c-1.103 0-2 .897-2 2v2c0 1.103.897 2 2 2v4.279l-1.214.404c-2.863.955-4.786 3.624-4.786 6.642v6.675h-8v1.649l-2.399-.933c-.549-1.016-1.61-1.716-2.844-1.716-.061 0-.121.012-.182.015-.368-.508-.575-1.112-.575-1.751v-.682c1.659-1.238 3.029-2.798 4.041-4.581h.959c2.757 0 5-2.243 5-5v-10.001c0-8.271-6.729-15-15-15s-15 6.729-15 15v10c0 2.757 2.243 5 5 5h.959c1.011 1.783 2.382 3.343 4.041 4.581v.682c0 .639-.207 1.243-.575 1.751-.061-.002-.121-.014-.182-.014-1.233 0-2.295.7-2.843 1.716l-6.111 2.377c-5.036 1.957-8.289 6.713-8.289 12.116v8.791h41.472.569 2.959 1.528 8.472c3.86 0 7-3.14 7-7v-23.675c0-3.018-1.923-5.687-4.787-6.641zm-9.213-8.684h8l.001 2h-8.001zm-.582 10.581 2.582-.86v-5.721h4v5.721l2.581.86c1.611.537 2.794 1.839 3.228 3.419h-15.618c.434-1.58 1.617-2.882 3.227-3.419zm-3.418 5.419h16v22h-6v-16h-10zm8 8v5.24c-1.651-.903-3.894-1.24-5-1.24-1.874 0-4.063 1.051-6.515 3.125-1.496-.898-3.03-1.8-4.485-2.403v-4.722zm0 8c0 .966-2.935 2-5 2-1.281 0-2.947-.803-4.68-1.792 1.816-1.432 3.45-2.208 4.68-2.208 2.065 0 5 1.034 5 2zm-22-7.757v1.515c0 .684-.558 1.242-1.243 1.242-.271 0-.538-.09-.753-.254l-2.024-1.542c.004-.069.02-.134.02-.204s-.016-.135-.021-.203l2.025-1.542c.215-.165.483-.255.753-.255.685 0 1.243.558 1.243 1.243zm-7 3.757c.844 0 1.604-.352 2.149-.915l1.642 1.251c.163.125.341.227.524.318-1.024 2.526-2.479 4.886-4.316 6.898-1.837-2.012-3.292-4.372-4.316-6.898.183-.091.361-.194.524-.318l1.643-1.251c.546.562 1.306.915 2.15.915zm-1-3c0-.551.449-1 1-1s1 .449 1 1-.449 1-1 1-1-.449-1-1zm11-13h-.014c.652-1.695 1.014-3.529 1.014-5.44v-.375c1.161.414 2 1.514 2 2.816 0 1.653-1.346 2.999-3 2.999zm-10-26c7.168 0 13 5.832 13 13v6.026c-.584-.442-1.257-.773-2-.924v-1.102c0-1.654-1.346-3-3-3h-.384c-4.083 0-8.106-.686-11.958-2.038-1.814-.636-3.854-.18-5.198 1.164-.941.941-1.46 2.193-1.46 3.524v1.451c-.743.152-1.416.482-2 .924v-6.025c0-7.168 5.832-13 13-13zm-10 26c-1.654 0-3-1.346-3-3 0-1.302.839-2.402 2-2.816v.375c0 1.912.362 3.745 1.014 5.44h-.014zm1-5.44v-3.91c0-.786.318-1.555.874-2.11.567-.567 1.317-.867 2.095-.867.341 0 .688.058 1.026.176 4.066 1.427 8.312 2.151 12.621 2.151h.384c.551 0 1 .449 1 1v3.56c0 5.699-3.604 10.642-9 12.393-5.396-1.752-9-6.694-9-12.393zm8.712 14.398.288.086.288-.086c.976-.293 1.895-.685 2.766-1.146.075.689.287 1.342.629 1.935l-1.533 1.168c-.546-.562-1.306-.915-2.15-.915s-1.604.352-2.149.915l-1.533-1.168c.342-.593.553-1.247.629-1.935.87.461 1.79.853 2.765 1.146zm-6.712 3.285c0-.685.558-1.243 1.243-1.243.271 0 .538.09.753.254l2.024 1.542c-.004.069-.02.134-.02.204s.016.135.021.203l-2.025 1.542c-.215.165-.483.255-.753.255-.685 0-1.243-.558-1.243-1.243zm-14 12.966c0-3.483 1.602-6.646 4.248-8.688 1.16 3.587 1.752 7.313 1.752 11.095v4.384h-6zm8 6.791v-4.384c0-4.161-.683-8.257-2.013-12.192.333-.169.672-.329 1.026-.467l4.987-1.939v.74c0 1.577 1.132 2.891 2.626 3.18 1.248 3.272 3.193 6.295 5.667 8.769l.707.707.707-.707c2.475-2.475 4.419-5.497 5.667-8.769 1.494-.29 2.626-1.604 2.626-3.181v-.74l2 .778v15.44l.105.211c.499.998 1.184 1.854 1.992 2.553h-26.097zm35 0h-2.959-.569c-2.301 0-4.377-1.237-5.472-3.245v-9.851c1.12.54 2.315 1.251 3.485 1.954 2.694 1.616 5.238 3.142 7.515 3.142 1.106 0 3.349-.337 5-1.24v5.995c-1.095 2.008-3.171 3.245-5.472 3.245zm10 0h-3.097c.808-.699 1.493-1.555 1.992-2.553l.105-.211v-1.236h5.899c-.465 2.279-2.485 4-4.899 4z"/><path d="m13 53h6v2h-6z"/><path d="m13 57h2v2h-2z"/><path d="m17 57h2v2h-2z"/><path d="m47 35h2v2h-2z"/><path d="m51 35h8v2h-8z"/></svg>
);

export default GeneralNavbar;