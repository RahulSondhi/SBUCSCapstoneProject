import React, {Component} from 'react';
import '../css/login.css';

class Login extends Component {
    render() {
        return(
      <div className="container">
          <div className="logo">
              Mixology
          </div>
          <form method="post">
              <div className="sign-in-form">
                  <h2>Login your account.</h2>
                  <div>
                      <div>Invalid username or
                          password.</div>
                  </div>
                  <div>
                      <div>You have been logged out.</div>
                  </div>
                  <br/>
                  <label htmlFor="username">Username</label>: <input type="username" id="username" name="username" autoFocus="autofocus" placeholder="Username" />
                  <br/><br/>
                  <label htmlFor="password">Password</label>: <input type="password" id="password" name="password" placeholder="Password" />

                  <br/><br/>
                  <input type="submit" name="login-submit" className="button" value="Log In" />
                  <span className="button" id="myBtn">Register</span>
              </div>
          </form>
      </div>
    )
   }
}
export default Login;
