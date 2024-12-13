import React, { Component } from "react";
import "../styles/App.css";
import NavBar from "../components/NavBar";
//import Footer from './components/Footer';
import "materialize-css/dist/css/materialize.min.css";
import AuthService from "../services/AuthService";
import { NavLink } from "react-router-dom";
import GeoPosition from "geolocator";
import Axios from "axios";
import { BackgroundAdd } from "../components/Background";
import ErrorToast from "../services/ErrorToastService";
import InfoToast from "../services/InfoToastService";
import Logo from "../assets/heart-anim.gif";
import ValidateInput from "../validation/ValidateInput";
import logo from "../assets/logo1.png";
import GoogleIcon from "../assets/google-icn.svg"
 
const baseURL = process.env.REACT_APP_BASE_URL


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      lastname: "",
      firstname: "",
      username: "",
      email: "",
      pwd1: "",
      pwd2: "",
      lastnameError: "",
      firstnameError: "",
      usernameError: "",
      emailError: "",
      pwd2Error: "",
      lastnameValid: false,
      firstnameValid: false,
      usernameValid: false,
      emailValid: false,
      pwd1Valid: false,
      locationValid: false,
      pwd1VerifyBox: "box-disabled",
      pwdHasLowercase: false,
      pwdHasUppercase: false,
      pwdHasNumber: false,
      pwdHasMinLen: false,
      userLocation: "",
      responseToPost: ""
    };
    this.Auth = new AuthService();
    this._isMounted = false;
  }

  render() {
    return (
      <div className="App">
        {/* <NavBar /> */}
        {this.state.responseToPost === "success" ? (
          <div className="msg msg-info z-depth-3">Bravo!</div>
        ) : (
          ""
        )}
        <div className="row register-wrapper login-register-page">
          <div className="col-md-6 col-g-6 col-12 form-left" id="login-box">
          <div className="form-logo">
              <img src={logo} alt="" />
              </div>
            <div className="login-header">
            <h2 id="heading">Sign Up Your User Account</h2>
            </div>
            <div className="card-panel center">
              {/* <i className="medium material-icons">person_add</i> */}
              {/* <span className="title-page">Register</span> */}
              <div className="card-panel">
                <form onSubmit={this.handleSubmit}>
                <div className="row-wrapper">
                <div className="input-field col s6 name-size">
                <label htmlFor="firstname-register">Firstname</label>
                    <input
                      type="text"
                      name="firstname"
                      id="firstname-register"
                      value={this.state.firstname}
                      onChange={e =>
                        this.setState({ firstname: e.target.value })
                      }
                      onKeyUp={this.handleFirstnameKeyUp}
                      required
                    />
                    <div className="register-error">
                      {this.state.firstnameError}
                    </div>
                   
                  </div>
                  <div className="input-field col s6 name-size">
                  <label htmlFor="lastname-register">Lastname</label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname-register"
                      value={this.state.lastname}
                      onChange={e =>
                        this.setState({ lastname: e.target.value })
                      }
                      onKeyUp={this.handleLastnameKeyUp}
                      required
                    />
                    <div className="register-error">
                      {this.state.lastnameError}
                    </div>
               
                  </div>
              </div>
                  <div className="input-field col s12">
                  <label htmlFor="username-register">Username</label>
                    <input
                      type="text"
                      name="username"
                      autoComplete="username"
                      id="username-register"
                      value={this.state.username}
                      onChange={e =>
                        this.setState({ username: e.target.value })
                      }
                      onKeyUp={this.handleUsernameKeyUp}
                      required
                    />
                    <div className="register-error">
                      {this.state.usernameError}
                    </div>
                    
                  </div>
                  <div className="input-field col s12">
                  <label htmlFor="email-register">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email-register"
                      value={this.state.mail}
                      onChange={e => this.setState({ email: e.target.value })}
                      onKeyUp={this.handleEmailKeyUp}
                      required
                    />
                    <div className="register-error">
                      {this.state.emailError}
                    </div>
                    
                  </div>
                  <div className="input-field col s12">
                  <label htmlFor="pwd-login">Password</label>
                    <input
                      type="password"
                      name="pwd"
                      id="pwd-login"
                      autoComplete="new-password"
                      value={this.state.pwd1}
                      onChange={e => this.setState({ pwd1: e.target.value })}
                      onKeyUp={this.handlePwdKeyUp}
                      onFocus={e =>
                        this.setState({ pwd1VerifyBox: "box-enabled" })
                      }
                      onBlur={e =>
                        this.setState({ pwd1VerifyBox: "box-disabled" })
                      }
                      required
                    />
                    <div
                      className={"password-message " + this.state.pwd1VerifyBox}
                    >
                      <h3 id="pwd1-verify-title">
                        Password must contain the following:
                      </h3>
                      <p
                        id="letter"
                        className={
                          this.state.pwdHasLowercase ? "valid" : "invalid"
                        }
                      >
                        A <b>lowercase</b> letter
                      </p>
                      <p
                        id="capital"
                        className={
                          this.state.pwdHasUppercase ? "valid" : "invalid"
                        }
                      >
                        A <b>capital (uppercase)</b> letter
                      </p>
                      <p
                        id="number"
                        className={
                          this.state.pwdHasNumber ? "valid" : "invalid"
                        }
                      >
                        A <b>number</b>
                      </p>
                      <p
                        id="length"
                        className={
                          this.state.pwdHasMinLen ? "valid" : "invalid"
                        }
                      >
                        Minimum <b>8 characters</b>
                      </p>
                    </div>
                  
                  </div>
                  <div className="input-field col s12">
                  <label htmlFor="rep-pwd-login">Repeat password</label>
                    <input
                      type="password"
                      name="rep-pwd"
                      id="rep-pwd-login"
                      autoComplete="new-password"
                      value={this.state.pwd2}
                      onChange={e => this.setState({ pwd2: e.target.value })}
                      onKeyUp={this.handlePwdKeyUp}
                      required
                    />
                    <div className="register-error">{this.state.pwd2Error}</div>
                    
                  </div>
                  <div id="error-back" />
                  <div className="form-ftr">
                  <input
                    type="submit"
                    name="submit"
                    value="SIGN UP"
                    className="btn"
                    disabled={
                      !this.state.lastnameValid ||
                      !this.state.firstnameValid ||
                      !this.state.usernameValid ||
                      !this.state.emailValid ||
                      !this.state.pwd1Valid ||
                      this.state.pwd2 !== this.state.pwd1
                    }
                  />
                  <p className="register-login-link">
                  Already have an account?{" "}
                  <NavLink className="yellow-link" to="/users/login">
                    SIGNIN
                  </NavLink>
                </p>
                </div>
                </form>
              </div>
            
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 signup-form-img">
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
    this.getLocation();
  }

 // Mock the GeoPosition functionality using a free API

showPosition = pos => {
  // Simulate the expected structure for the user location
  const location = {
    latitude: pos.coords.latitude,
    longitude: pos.coords.longitude,
    city: "null", // default city, will be replaced
    country: "null", // default country, will be replaced

  };

  // Update the state with the location
  this._isMounted && this.setState({ userLocation: location, locationValid: true });

  // Optionally fetch the city and country based on coordinates
  this.fetchLocationDetails(location.latitude, location.longitude);
};

errorPosition = error => {
  // Handle error and mock a default location
  const defaultLocation = {
    latitude: 24.8607,
    longitude: 67.0011,
    city: "null",
    country: "null"
  };

  this._isMounted && this.setState({ userLocation: defaultLocation, locationValid: false });
};

fetchLocationDetails = (latitude, longitude) => {
  // Use geolocation-db API to get location details
  fetch("https://geolocation-db.com/json")
    .then(response => response.json())
    .then(data => {
      const locationDetails = {
        latitude: data.latitude,
        longitude: data.longitude,
        city: data.city || "Unknown city",
        country: data.country_name || "Unknown country"
      };
      this._isMounted && this.setState({ userLocation: locationDetails });
    })
    .catch(error => {
      console.error("Error fetching location details:", error);
    });
};


getLocation = () => {
  navigator.geolocation.getCurrentPosition(
    this.showPosition,
    this.errorPosition,
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
  );
};

  handleFirstnameKeyUp = e => {
    let result = ValidateInput.user.firstname(e.target.value);

    this._isMounted &&
      this.setState({
        firstnameError: result.firstnameError,
        firstnameValid: result.firstnameValid
      });
  };

  handleLastnameKeyUp = e => {
    let result = ValidateInput.user.lastname(e.target.value);

    this._isMounted &&
      this.setState({
        lastnameError: result.lastnameError,
        lastnameValid: result.lastnameValid
      });
  };

  handleUsernameKeyUp = e => {
    let result = ValidateInput.user.username(e.target.value);

    this._isMounted &&
      this.setState({
        usernameError: result.usernameError,
        usernameValid: result.usernameValid
      });
  };

  handleEmailKeyUp = e => {
    let result = ValidateInput.user.email(e.target.value);

    this._isMounted &&
      this.setState({
        emailError: result.emailError,
        emailValid: result.emailValid
      });
  };

  // Checking password format is valid
  validatePwd = () => {
    if (/[a-z]/.test(this.state.pwd1)) {
      this._isMounted && this.setState({ pwdHasLowercase: true });
    } else {
      this._isMounted && this.setState({ pwdHasLowercase: false });
    }

    if (/[A-Z]/g.test(this.state.pwd1)) {
      this._isMounted && this.setState({ pwdHasUppercase: true });
    } else {
      this._isMounted && this.setState({ pwdHasUppercase: false });
    }
    if (/[0-9]/g.test(this.state.pwd1)) {
      this._isMounted && this.setState({ pwdHasNumber: true });
    } else {
      this._isMounted && this.setState({ pwdHasNumber: false });
    }

    if (this.state.pwd1.length >= 8 && this.state.pwd1.length <= 30) {
      this._isMounted && this.setState({ pwdHasMinLen: true });
    } else {
      this._isMounted && this.setState({ pwdHasMinLen: false });
    }

    if (
      this.state.pwdHasLowercase &&
      this.state.pwdHasUppercase &&
      this.state.pwdHasNumber &&
      this.state.pwdHasMinLen
    ) {
      this._isMounted && this.setState({ pwd1Valid: true });
    } else {
      this._isMounted && this.setState({ pwd1Valid: false });
    }
  };

  // Checking passwords match
  validateRepeatPwd = () => {
    if (this.state.pwd1 === this.state.pwd2) {
      this._isMounted && this.setState({ pwd2Error: "" });
    } else if (this.state.pwd2 !== "") {
      this._isMounted && this.setState({ pwd2Error: "Passwords don't match" });
    }
  };

  // Checking over both passwords on change
  handlePwdKeyUp = async e => {
    await this.validatePwd();
    await this.validateRepeatPwd();
  };

  // Cleaning data before submit
  capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Submitting user data to backend
  handleSubmit = async e => {
    e.preventDefault();
    await Axios.post(`${baseURL}/users/register`, {
      lastname: this.capitalizeFirstLetter(this.state.lastname.toLowerCase()),
      firstname: this.capitalizeFirstLetter(this.state.firstname.toLowerCase()),
      username: this.state.username.toLowerCase(),
      email: this.state.email.toLowerCase(),
      pwd1: this.state.pwd1,
      pwd2: this.state.pwd2,
      location: this.state.userLocation
    })
      .then(res => {
        this._isMounted && this.setState({ responseToPost: res.data });
        InfoToast.custom.info(
          "An email to validate your account has been sent",
          3000
        );
        this.props.history.push("/users/login");
      })
      .catch(err => {
        let message = err.response.data["error"];
        ErrorToast.custom.error(message, 1400);
      });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }
}

export default Register;
