import React, { Component } from "react";
import { Button, Icon, TextInput } from "react-materialize";
import { Autocomplete } from "react-materialize";
import InfoToast from "../../services/InfoToastService";
import ErrorToast from "../../services/ErrorToastService";
import cities from "../../assets/data-json/cities";
import * as actionCreators from "../../actions/user-actions";
import { connect } from "react-redux";

class SelectLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      long: "",
      city: "Not set",
      cityInput: "",
      editLocationActive: false,
    };
    this.citiesJSON = cities["France"];
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    if (
      this.props.userConnectedData.geo_lat &&
      this.props.userConnectedData.geo_long
    ) {
      await this.getCityFromLatLong(
        this.props.userConnectedData.geo_lat,
        this.props.userConnectedData.geo_long
      );
      this._isMounted &&
        this.setState({
          lat: this.props.userConnectedData.geo_lat,
          long: this.props.userConnectedData.geo_long,
        });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this._isMounted = true;
    if (
      prevState.city !== undefined &&
      prevState.city !== "" &&
      prevState.city !== "Not set" &&
      (this.state.lat !== prevState.lat || this.state.long !== prevState.long)
    ) {
      this.props.updateUserData(
        this.props.userConnectedData.id,
        this.props.userConnectedData.username,
        {
          city: this.state.city,
          geo_lat: this.state.lat,
          geo_long: this.state.long,
        }
      );
      InfoToast.custom.info("Your city has been changed", 1500);
    }
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      this.showPosition,
      this.errorPosition
    );
  };

  showPosition = (pos) => {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;

    this.setState({
      lat: latitude,
      long: longitude,
    });

    this.fetchLocationDetails(latitude, longitude);
  };

  errorPosition = () => {
    const defaultLocation = {
      latitude: 24.8607,
      longitude: 67.0011, // Karachi
    };
    this.setState({
      lat: defaultLocation.latitude,
      long: defaultLocation.longitude,
    });

    this.fetchLocationDetails(defaultLocation.latitude, defaultLocation.longitude);
  };

  fetchLocationDetails = (latitude, longitude) => {
    fetch(`https://geolocation-db.com/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.city) {
          this._isMounted &&
            this.setState({
              city: data.city,
              lat: data.latitude,
              long: data.longitude,
            });
        } else {
          ErrorToast.custom.error(
            "Couldn't get city from coordinates, please try again later...",
            1400
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching location details:", error);
        ErrorToast.custom.error("Couldn't fetch location details", 1400);
      });
  };
  
  getCityFromLatLong = (lat, long) => {
    fetch(`https://geolocation-db.com/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.city) {
          this._isMounted && this.setState({ city: data.city });
        } else {
          ErrorToast.custom.error(
            "Couldn't get city from coordinates, please try again later...",
            1400
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching city from coordinates:", error);
      });
  };
  
  getLatLongFromCity = (city) => {
    fetch(`https://geolocation-db.com/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.city === city && data.latitude && data.longitude) {
          this._isMounted &&
            this.setState({
              city: city,
              lat: data.latitude,
              long: data.longitude,
            });
        } else {
          ErrorToast.custom.error("City not found, please try again...", 1400);
        }
      })
      .catch((error) => {
        console.error("Error fetching lat/long from city:", error);
      });
  };
  
 

  showEditLocation = () => {
    this._isMounted &&
      this.setState({
        editLocationActive: true,
      });
  };

  hideEditLocation = () => {
    this._isMounted &&
      this.setState({
        editLocationActive: false,
      });
  };

  switchEditLocation = () => {
    if (this.state.editLocationActive) this.hideEditLocation();
    else this.showEditLocation();
  };

  geolocateMe = () => {
    this.getLocation();
    this.hideEditLocation();
    InfoToast.custom.info(
      "Please wait while you are being geolocated...",
      1500
    );
  };

  confirmAutoCity = () => {
    document.querySelectorAll(".edit-location-submit")[0].disabled = false;
  };

  handleAutocompleteSubmit = () => {
    if (
      document.querySelectorAll(".edit-location-autoc-input input")[0].value
    ) {
      this.getLatLongFromCity(
        document.querySelectorAll(".edit-location-autoc-input input")[0].value
      );
      this.hideEditLocation();
    } else {
      ErrorToast.custom.error("Please enter a city", 1400);
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="location-container">
        {this.state.city}
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "15px" }}
          onClick={this.switchEditLocation}
          startIcon={<Icon>edit_location</Icon>}
        >
          Edit
        </Button>
        {this.state.editLocationActive && (
          <div className="edit-location-input">
            {/* <div className="edit-location-autoc">
              <Autocomplete
                className="edit-location-autoc-input"
                style={{ display: "inline-block" }}
                options={this.citiesJSON}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextInput 
                    {...params}
                    label="Insert city here (3 letters min)"
                    variant="outlined"
                    onChange={this.handleAutocompleteChange}
                  />
                )}
                onChange={(_, value) => this.getLatLongFromCity(value)}
              />
              <Button
                className="edit-location-submit"
                variant="contained"
                color="primary"
                onClick={this.handleAutocompleteSubmit}
              >
                Confirm
              </Button>
            </div> */}
            <p></p>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.geolocateMe}
              startIcon={<Icon>location_searching</Icon>}
            >
              Geolocate me
            </Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userConnectedData: state.user.data,
    userConnectedStatus: state.user.status,
  };
};

export default connect(mapStateToProps, actionCreators)(SelectLocation);
