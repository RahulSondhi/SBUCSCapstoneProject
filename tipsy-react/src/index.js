import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main/main.js';
import {BrowserRouter} from 'react-router-dom'

import './foundation/foundation.min.css';
import './index.css';
import './css/constant.css';
import './css/form.css';
import './css/auth.css';
import './css/game.css';
import './css/navbar.css';
import './css/userPages.css';
import './css/publicPages.css';

ReactDOM.render(
  <Main/>,
  document.getElementById('root')
);
