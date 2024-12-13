import React, { Component } from "react";
import "../styles/App.css";
import NavBar from "../components/NavBar";
//import Footer from './components/Footer';
import "materialize-css/dist/css/materialize.min.css";
import AuthService from "../services/AuthService";
import { NavLink } from "react-router-dom";
import ErrorToast from "../services/ErrorToastService";
import InfoToast from "../services/InfoToastService";
import logo from "../assets/logo1.png";

const baseURL = process.env.REACT_APP_BASE_URL

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      loginError: "",
      loginValid: false,
      responseToPost: ""
    };
    this.Auth = new AuthService();
    this._isMounted = false;
  }

  render() {
    return (
      <div className="App"> 
        <div className="row forgot-wrapper login-page login-register-page" >
          <div className="form-left" id="login-box">
          <div className="form-logo">
              <img src={logo} alt="" />
              </div>
              <div className="login-header">
            <h2 id="heading">FORGOT PASSWORD</h2>
            </div> 
            <div className="card-panel center">
              {/* <i className="medium material-icons">lock</i> */}
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
                      value={this.state.login}
                      onChange={this.handleChange}
                      onKeyUp={this.validateLogin}
                      required
                    />
                    <div className="login-error">{this.state.loginError}</div>
                    
                  </div>
                  <input
                    type="submit"
                    name="submit"
                    value="SEND"
                    className="btn"
                    disabled={!this.state.loginValid}
                  />
                </form>
                <p className="register-login-link">
                  Go back to{" "}
                  <NavLink className="white-link" to="/users/login">
                    SignIn
                  </NavLink>
                </p>
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

  // On user input change, update states
  handleChange = e => {
    this._isMounted && this.setState({ login: e.target.value });
  };

  // On user button submit, execute this
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch(`${baseURL}/users/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login: this.state.login.toLowerCase()
      })
    });

    const body = await response.json();
    if (response.ok) {
      this._isMounted && this.setState({ responseToPost: body.status });
      InfoToast.mail.resetPassword();
      this.props.history.push("/");
    } else {
      ErrorToast.custom.error(body.message, 1000);
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }
}

export default ForgotPassword;
