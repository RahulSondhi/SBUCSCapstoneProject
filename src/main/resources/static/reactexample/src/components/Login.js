import React, {Component} from 'react';
import '../css/login.css';

class Login extends Component {
    render() {
        return(
      <body>
      <div class="container">
          <div class="logo">
              Mixology
          </div>
          <form method="post">
              <div class="sign-in-form">
                  <h2>Login your account.</h2>
                  <div>
                      <div>Invalid username or
                          password.</div>
                  </div>
                  <div>
                      <div>You have been logged out.</div>
                  </div>
                  <br/>
                  <label for="username">Username</label>: <input type="username" id="username" name="username" autofocus="autofocus" placeholder="Username" />
                  <br/><br/>
                  <label for="password">Password</label>: <input type="password" id="password" name="password" placeholder="Password" />
  
                  <br/><br/>
                  <input type="submit" name="login-submit" class="button" value="Log In" />
                  <span class="button" id="myBtn">Register</span>
              </div>
          </form>
      </div>
  
      <div id="myModal" class="modal">
  
          <div class="modal-content">
              <span class="close">&times;</span>
              <form method="post">
  
                  <br/><br/>
                  <h2>Register your account.</h2>
                  <br/>
                  <p></p>
                  <p></p>
                  <p></p>
                  <p></p>
                  <p></p>
  
                  <label for="username">Username</label>
                  <input id="username" name="username" type="username" placeholder="Username" />
  
                  <br/><br/>
                  <label for="password">Password</label>
                  <input id="password" name="password" type="password" placeholder="Password" />
  
                  <br/><br/>
                  <label for="passwordConfirm">Confirm password</label>
                  <input id="passwordConfirm" name="passwordConfirm" type="password" placeholder="Confirm Password" />
  
                  <div class="form-group">
                      <br/>
                      <button type="submit" class="button">Register</button>
                      <br/>
                      <span>Already registered? <a href="/">Login here</a></span>
                  </div>
  
              </form>
          </div>
  
      </div>
      </body>
    )
   }
}
export default Login;