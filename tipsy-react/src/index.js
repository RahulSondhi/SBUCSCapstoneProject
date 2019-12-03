import React from 'react';
import ReactDOM from 'react-dom';
import Main from './app/main.js';
import {BrowserRouter} from 'react-router-dom'

import './foundation/foundation.min.css';
import './index.css';
import './app/css/constant.css';
import './app/css/form.css';
import './app/css/auth.css';
import './app/css/game.css';
import './app/css/navbar.css';
import './app/css/userPages.css';
import './app/css/publicPages.css';

ReactDOM.render(
  <BrowserRouter>
    <Main/>
  </BrowserRouter>,
  document.getElementById('root')
);
