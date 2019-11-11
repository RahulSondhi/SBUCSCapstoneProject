import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom'
import UserPic from '../../assets/user.svg';
import Navbar from '../navbar/navbar.js';
import {getUserProfile} from '../../util/APIUtils';

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: true
        }
        this.loadUserProfile = this
            .loadUserProfile
            .bind(this);
    }

    loadUserProfile(nickname) {
        this.setState({isLoading: true});

        getUserProfile(nickname).then(response => {
            console.log(response); //Bryan | Delete Later
            this.setState({user: response, isLoading: false});
        }).catch(error => {
            console.log(error); //Bryan | Delete Later
            if (error.status === 404) {
                this.setState({notFound: true, isLoading: false});
            } else {
                this.setState({serverError: true, isLoading: false});
            }
        });
    }

    componentDidMount() {
        let try_name = "";
        if (this.props.match.params.nickname === "me") 
            try_name = this.props.currentUser.nickname;
        else 
            try_name = this.props.match.params.nickname;
        const nickname = try_name;
        this.loadUserProfile(nickname);
    }

    componentDidUpdate(nextProps) {
        if (this.props.match.params.nickname !== nextProps.match.params.nickname) {
            this.loadUserProfile(nextProps.match.params.nickname);
        }
    }

    render() {

        // Checking if data came in
        if (this.state.isLoading) {
            return null
        }

        // Checking response
        if (this.state.notFound === true || this.state.serverError === true) {
            return <Redirect
                to={{
                pathname: "/tipsy/error",
                state: {
                    from: this.props.location,
                    notFound: this.state.notFound,
                    serverError: this.state.serverError
                }
            }}/>
        }

        this.state.user.bars = [
            {
                name: "gay",
                id: "69",
                owner: "byranPapi",
                img: UserPic
            }, {
                name: "gay",
                id: "691",
                owner: "byranPapi",
                img: UserPic
            }, {
                name: "gay",
                id: "692",
                owner: "byranPapi",
                img: UserPic
            }, {
                name: "gay",
                id: "693",
                owner: "byranPapi",
                img: UserPic
            }, {
                name: "gay",
                id: "694",
                owner: "byranPapi",
                img: UserPic
            }, {
                name: "gay",
                id: "695",
                owner: "byranPapi",
                img: UserPic
            }, {
                name: "gay",
                id: "696",
                owner: "byranPapi",
                img: UserPic
            }, {
                name: "gay",
                id: "697",
                owner: "byranPapi",
                img: UserPic
            }, {
                name: "gay",
                id: "698",
                owner: "byranPapi",
                img: UserPic
            }, {
                name: "gay",
                id: "699",
                owner: "byranPapi",
                img: UserPic
            }, {
                name: "gay",
                id: "69q",
                owner: "byranPapi",
                img: UserPic
            }, {
                name: "gay",
                id: "69w",
                owner: "byranPapi",
                img: UserPic
            }, {
                name: "gay",
                id: "69e",
                owner: "byranPapi",
                img: UserPic
            }, {
                name: "gay",
                id: "69r",
                owner: "byranPapi",
                img: UserPic
            }, {
                name: "gay",
                id: "69t",
                owner: "byranPapi",
                img: UserPic
            }, {
                name: "gay",
                id: "69y",
                owner: "byranPapi",
                img: UserPic
            }, {
                name: "gay",
                id: "69u",
                owner: "byranPapi",
                img: UserPic
            }, {
                name: "gay",
                id: "69i",
                owner: "byranPapi",
                img: UserPic
            }, {
                name: "gay",
                id: "69o",
                owner: "byranPapi",
                img: UserPic
            }, {
                name: "gay",
                id: "69p",
                owner: "byranPapi",
                img: UserPic
            }, {
                name: "gay",
                id: "69a",
                owner: "byranPapi",
                img: UserPic
            }, {
                name: "gay",
                id: "69s",
                owner: "byranPapi",
                img: UserPic
            }, {
                name: "gay",
                id: "69696",
                owner: "byranPapi",
                img: UserPic
            }
        ]

        this.state.user.recipes = {
            recipesWritten:[
                {
                    name: "gaytini",
                    author: "DAPAPI",
                    id:"1",
                    img: UserPic
                },
                {
                    name: "gaytini",
                    author: "DAPAPI",
                    id:"2",
                    img: UserPic
                },
                {
                    name: "gaytini",
                    author: "DAPAPI",
                    id:"3",
                    img: UserPic
                },
                {
                    name: "gaytini",
                    author: "DAPAPI",
                    id:"4",
                    img: UserPic
                },
                {
                    name: "gaytini",
                    author: "DAPAPI",
                    id:"5",
                    img: UserPic
                },
                {
                    name: "gaytini",
                    author: "DAPAPI",
                    id:"6",
                    img: UserPic
                }
            ],
            recipesIncompleted:[
                {
                    name: "gaytini",
                    author: "DAPAPI",
                    id:"11",
                    img: UserPic
                },
                {
                    name: "gaytini",
                    author: "DAPAPI",
                    id:"22",
                    img: UserPic
                },
                {
                    name: "gaytini",
                    author: "DAPAPI",
                    id:"33",
                    img: UserPic
                },
                {
                    name: "gaytini",
                    author: "DAPAPI",
                    id:"44",
                    img: UserPic
                },
                {
                    name: "gaytini",
                    author: "DAPAPI",
                    id:"55",
                    img: UserPic
                },
                {
                    name: "gaytini",
                    author: "DAPAPI",
                    id:"66",
                    img: UserPic
                }
            ],
            recipesCompleted:[
                {
                    name: "gaytini",
                    author: "DAPAPI",
                    id:"111",
                    img: UserPic
                },
                {
                    name: "gaytini",
                    author: "DAPAPI",
                    id:"222",
                    img: UserPic
                },
                {
                    name: "gaytini",
                    author: "DAPAPI",
                    id:"333",
                    img: UserPic
                },
                {
                    name: "gaytini",
                    author: "DAPAPI",
                    id:"444",
                    img: UserPic
                },
                {
                    name: "gaytini",
                    author: "DAPAPI",
                    id:"555",
                    img: UserPic
                },
                {
                    name: "gaytini",
                    author: "DAPAPI",
                    id:"666",
                    img: UserPic
                }
            ]
        }

        return (
            <div className="grid-x grid-x-margin align-center-middle">

                <Navbar/>
                <h1 id="userPageTitle" className="caption small-10 cell">{this.state.user.nickname}</h1>

                <div
                    id="leftProfileSide"
                    className="small-12 medium-4 grid-x align-center-middle cell">

                    <GetUserImg
                        className="small-4"
                        pic={this.state.user.profilePic}
                        nickname={this.state.user.nickname}/>
                    <h1 id="userPageFullName" className="caption small-10 cell">{this.state.user.name}</h1>
                    <h1 id="userPageBarTitle" className="caption small-10 cell">{this.state.user.nickname}'s Bars</h1>
                    <div
                        className="userPageBarScroll small-10 grid-x grid-margin-x align-center-middle cell">
                        <div
                            className="userPageBarContainer grid-x grid-margin-x align-center-middle cell">
                            <GetBar
                                className="userPageBarPreview grid-x align-center-middle cell"
                                bars={this.state.user.bars}/>
                        </div>
                    </div>
                </div>
                <div
                    id="rightProfileSide"
                    className="small-12 medium-8 grid-x align-center-middle cell">
                    <div className="grid-x align-center-middle cell">
                        <div className="small-6 medium-3 grid-x align-center-middle cell">
                            <button className="button small-10 cell">All</button>
                        </div>
                        <div className="small-6 medium-3 grid-x align-center-middle cell">
                            <button className="button small-10 cell">Created</button>
                        </div>
                        <div className="small-6 medium-3 grid-x align-center-middle cell">
                            <button className="button small-10 cell">Comepleted</button>
                        </div>
                        <div className="small-6 medium-3 grid-x align-center-middle cell">
                            <button className="button small-10 cell">Incomplete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

class GetUserImg extends Component {

    constructor(props) {
        super(props);

        this.image = this.props.pic;
        this.className = this.props.className;
    }

    render() {

        if (this.image == null) {
            this.image = UserPic
        }

        return (<img src={this.image} className={this.className} alt={this.props.nickname}/>)
    }
};

// Modern syntax >= React 16.2.0
const GetBar = ({bars, className}) => ( <> {
    bars.map(bar => (
        <Link to={"/tipsy/bar/" + bar.id} className={className} key={bar.id}>
            <div className="small-4 grid-x cell">
                <img src={bar.img} className="small-10 cell" alt={bar.name}></img>
            </div>
            <div className="small-8 grid-x cell">
                <div className="userPageBarPreviewName cell">{bar.name}</div>
                <div className="userPageBarPreviewOwner cell">Owner:
                    <span>{bar.owner}</span>
                </div>
            </div>
        </Link>
    ))
} < />
  ); 


export default UserPage;