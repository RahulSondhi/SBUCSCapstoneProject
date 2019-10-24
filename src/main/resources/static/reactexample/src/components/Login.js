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
                  <br/>
                  <label htmlFor="username">Username:</label>
                  <input type="username" id="username" name="username" autoFocus="autofocus" placeholder="Enter Username" />
                  <br/><br/>
                  <label htmlFor="password">Password:</label>
                  <input type="password" id="password" name="password" placeholder="Enter Password" />

                  <br/><br/>
                  <div className="footer">
                    <input type="submit" name="register-submit" className="button" value="Register" />
                    <input type="submit" name="login-submit" className="button" value="Log In" />
                  </div>
              </div>
          </form>
      </div>
    )
   }
}
export default Login;
