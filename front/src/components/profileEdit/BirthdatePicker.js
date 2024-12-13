import React, { Component } from "react";
import { DatePicker } from "react-materialize";
import moment from "moment";

class BirthdatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthdate: null
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted &&
      this.setState({
        birthdate: this.props.birthdate
      });
  }

  componentDidUpdate() {
    if (this.state.birthdate !== this.props.birthdate && this.props.birthdate) {
      document.querySelector("input[name='birthdate']").value = this.props.birthdate;
    }
  }

  handleChange = (selectedDate) => {
    console.log(selectedDate)
    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
    this.props.birthdateToParent(formattedDate);
    this._isMounted &&
      this.setState({
        birthdate: formattedDate
      });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        <label className="left-label" htmlFor="birthdate-edit-profile">
          Birthdate
        </label>
        <DatePicker
          name="birthdate"
          options={{
            defaultDate:
              this.props.birthdate !== null
                ? new Date(this.props.birthdate)
                : null,
            minDate: moment().startOf("day").subtract(99, "years").toDate(),
            maxDate: moment().startOf("day").subtract(18, "years").toDate(),
            setDefaultDate: true,
            container: "#root",
            onSelect: this.handleChange // Use onSelect instead of onClose
          }}
          className="birthdate-picker-modal"
          id="birthdate-edit-profile"
        />
      </div>
    );
  }
}

export default BirthdatePicker;
