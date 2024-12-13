import React, { Component } from "react";
import "../styles/App.css";
import NavBar from "../components/NavBar";
import "materialize-css/dist/css/materialize.min.css";
import AuthService from "../services/AuthService";
import { NavLink } from "react-router-dom";
import Axios from "axios";
import { BackgroundAdd } from "../components/Background";
import ErrorToast from "../services/ErrorToastService";
import * as actionCreators from "../actions/user-actions";
import Logo from "../assets/heart-anim.gif";

import { GoogleLogin } from '@react-oauth/google';
import { googleAuthLogin } from "../http/index";
import { connect } from "react-redux";
import Materialize from "materialize-css";

import logo from "../assets/logo1.png";
import GoogleIcon from "../assets/google-icn.svg"
const baseURL = process.env.REACT_APP_BASE_URL

// import GoogleLogin from "./googleLogin";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      pwd: "",
      loginError: "",
      pwdError: "",
      loginValid: false,
      pwdValid: false,
      responseToPost: "",
    };
    this._isMounted = false;
  }
  //     responseToPost: "",
  //   };
  //   this._isMounted = false;
  // }

  // Google login success callback
  handleGoogleSuccess = async (credentialResponse) => {
    // console.log(credentialResponse)
    try {
      // Send the token to your backend for user verification or registration
      const res = await googleAuthLogin({ credential: credentialResponse.credential });
  
     const data = res.data
     console.log(data)

      if(data.message == "User registered with success"){
        Materialize.toast({
          html: "User registered with success , Please verify your email",
          displayLength: 1500,
          classes: "rounded info-toast"
        });
                
      }

      if(data.message=="User logged in with success"){
       
        const user = data.user; // backend response
        Axios.post(`${baseURL}/users/login`, {
          login: user.mail.toLowerCase(),
          pwd: user.password
        })
          .then(res => {
            this._isMounted && this.setState({ responseToPost: res.status });
            localStorage.setItem("Token", res.data["token"]);
            this.props.getUserData(res.data["username"]);
            localStorage.setItem("username",  res.data.username)


            this.props.history.push("/");
          })
          .catch(err => {
            ErrorToast.custom.error(err.response["data"]["message"], 1400);
          });


      }
      
    } catch (error) {
      console.error("Google login failed:", error);
      ErrorToast.custom.error("Google login failed", 1400);
    }
  };

  handleGoogleFailure = (error) => {
    console.error("Google login error:", error);
    ErrorToast.custom.error("Google login failed", 1400);
  };


  // Google login success callback
  handleGoogleSuccess = async (credentialResponse) => {
    // console.log(credentialResponse)
    try {
      // Send the token to your backend for user verification or registration
      const res = await googleAuthLogin({ credential: credentialResponse.credential });
  
     const data = res.data
     console.log(data)
      if(data.message == "User registered with success"){
        Materialize.toast({
          html: "User registered with success , Please verify your email",
          displayLength: 1500,
          classes: "rounded info-toast"
        });
                
      }

      if(data.message=="User logged in with success"){
       
        const user = data.user; // backend response
        Axios.post(`${baseURL}/users/login`, {
          login: user.mail.toLowerCase(),
          pwd: user.password
        })
          .then(res => {
            this._isMounted && this.setState({ responseToPost: res.status });
            localStorage.setItem("Token", res.data["token"]);
            this.props.getUserData(res.data["username"]);
            localStorage.setItem("username",  res.data.username)


            this.props.history.push("/");
          })
          .catch(err => {
            ErrorToast.custom.error(err.response["data"]["message"], 1400);
          });


      }
      
    } catch (error) {
      console.error("Google login failed:", error);
      ErrorToast.custom.error("Google login failed", 1400);
    }
  };

  handleGoogleFailure = (error) => {
    console.error("Google login error:", error);
    ErrorToast.custom.error("Google login failed", 1400);
  };

  render() {
    return (
      <div className="App"> 
        <div className="row login-page login-register-page">
          <div className="form-left" id="login-box">
          <div className="form-logo">
              <img src={logo} alt="" />
              </div>
              <div className="data-form"> 
            <div className="login-header">
            <h2 id="heading">SIGN IN Your User Account</h2>
            </div> 
            <div className="card-panel center">
              {/* <i className="medium material-icons">account_box</i> */}
              <div className="card-panel">
                <form onSubmit={this.handleSubmit}>
                  <div className="input-field">
                    {/* <i className="material-icons prefix input-icons">
                      person_outline
                    </i> */}
                    <label htmlFor="user-login">Username or email</label>
                    <input
                      type="text"
                      name="name"
                      id="user-login"
                      autoComplete="username"
                      value={this.state.login}
                      onChange={this.handleChange}
                      onKeyUp={this.validateLogin}
                      required
                    />
                    <div className="login-error">{this.state.loginError}</div>
                    
                  </div>
                  <div className="input-field">
                    {/* <i className="material-icons prefix input-icons">
                      lock_outline
                    </i> */}
                     <label htmlFor="pwd-login">Password</label>
                    <input
                      type="password"
                      name="pwd"
                      id="pwd-login"
                      autoComplete="current-password"
                      value={this.state.pwd}
                      onChange={this.handleChange}
                      onKeyUp={this.validatePwd}
                      required
                    />
                    <div className="login-error">{this.state.pwdError}</div>
                   
                  </div>
                  <input
                    type="submit"
                    name="submit"
                    value="SIGNIN"
                    className="btn"
                    disabled={!this.state.loginValid || !this.state.pwdValid}
                  />
                </form>

                 <div className="form-ftr">
                 <p className="register-login-link link-right"> 
                  <NavLink className="white-link" to="/users/register">
                    Create An Account
                  </NavLink>
                </p>
                <p className="register-login-link link-left"> 
                  <NavLink className="white-link" to="/users/forgot-password">
                  Forgot password?{" "}
                  </NavLink>
                </p>
                </div>
              </div>
              <div class="form-seprator" bis_skin_checked="1">
                            <span>or</span>
                        </div>
                        {/* Google login button */}
                        <div class="login-google-wrapper">
                  <GoogleLogin
                  clientId='53925760279-cs8hnrbvmsmh1eur6f5ghjme5se9hamu.apps.googleusercontent.com' // Your Google Client ID
                  buttonText="Sign in with Google"
                  onSuccess={this.handleGoogleSuccess}
                  onFailure={this.handleGoogleFailure}
                  cookiePolicy={'single_host_origin'}
                  id="google-login-btn" class="login-with-google-btn"
                /> 
                </div>
            </div>
          </div>
          </div>
          <div className="signup-form-img">
          </div>
        </div>
      </div>
    );
  }

  // Redirect user if already logged in
  componentDidMount() {
    this._isMounted = true;
    BackgroundAdd();
    if (this.Auth.loggedIn()) {
      ErrorToast.auth.userAlreadyLogged();
      this.props.history.replace("/");
    }
  }

  // Checking username or email format is valid
  validateLogin = () => {
    let loginError = "";
    let regexLogin = /^[a-zA-Z0-9]*-?[a-zA-Z0-9]*$/;
    let regexEmail = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;

    if (
      !this.state.login.match(regexLogin) &&
      !this.state.login.match(regexEmail)
    ) {
      loginError = "Please enter a valid Username/Email";
    } else if (this.state.login === "") {
      loginError = "Username/Email cannot be empty";
    } else if (this.state.login.length > 30) {
      loginError = "Username/Email must be less or equal to 30 chars";
    }

    if (loginError) {
      this._isMounted && this.setState({ loginValid: false });
    } else if (this.state.login !== "") {
      this._isMounted && this.setState({ loginValid: true });
    }

    this._isMounted && this.setState({ loginError });
  };

  // Checking password format is valid
  validatePwd = () => {
    let pwdError = "";

    if (this.state.pwd.length < 8 || this.state.pwd.includes(" ")) {
      pwdError = "Please enter a valid password";
    } else if (this.state.pwd.length > 30) {
      pwdError = "Password must be less or equal to 30 chars";
    }

    if (pwdError) {
      this._isMounted && this.setState({ pwdValid: false });
    } else if (this.state.pwd) {
      this._isMounted && this.setState({ pwdValid: true });
    }

    this._isMounted && this.setState({ pwdError });
  };

  // On user input change, update states
  handleChange = e => {
    const isLogin = e.target.name === "name";
    const isPwd = e.target.name === "pwd";

    if (isLogin) {
      this._isMounted && this.setState({ login: e.target.value });
    }

    if (isPwd) {
      this._isMounted && this.setState({ pwd: e.target.value });
    }
  };

  // On user button submit, execute this
  handleSubmit = async e => {
    e.preventDefault();
    Axios.post(`${baseURL}/users/login`, {
      login: this.state.login.toLowerCase(),
      pwd: this.state.pwd
    })
    .then(res => {
        console.log(res)
        this._isMounted && this.setState({ responseToPost: res.status });
        localStorage.setItem("Token", res.data["token"]);
        this.props.getUserData(res.data["username"]);
        localStorage.setItem("username",  res.data.username)
        this.props.history.push("/");
      })
      .catch(err => {
        ErrorToast.custom.error(err.response["data"]["message"], 1400);
      });
  };

  componentDidMount() {
    this._isMounted = true;
    BackgroundAdd();
    if (localStorage.getItem("Token")) {
      ErrorToast.auth.userAlreadyLogged();
      this.props.history.replace("/");
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
}

const mapStateToProps = state => {
  return {
    userConnectedData: state.user.data,
    userConnectedStatus: state.user.status
  };
};

export default connect(
  mapStateToProps,
  actionCreators
)(Login);
 