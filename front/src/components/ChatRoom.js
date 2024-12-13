import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import "../styles/App.css";
import "materialize-css/dist/css/materialize.min.css";
import io from "socket.io-client";
import AuthService from "../services/AuthService";
import { NavLink } from "react-router-dom";
import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL;

class Chat extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      winSize: "",
      isRead: null,
      msg: "",
      toSend: "",
      listMessages: [],
      socket: "",
      userID: "",
      userName: "",
      userToken: this.Auth.getToken(),
      room_id: "",
      usernameOther: "",
      userID_other: "",
      messageCount: 0, // To store the message count
      showInput: true, // To control whether to show the input box
    };
    this._isMounted = false;
  }


 // Function to fetch message count
fetchMessageCount = async () => {
  try {
    const response = await axios.get(`${baseURL}/chat/messages/${this.props.userConnectedData.id}`);
    const messageCount = response.data.messageCount;
    console.log(messageCount);

    // Save messageCount to localStorage
    localStorage.setItem('messageCount', messageCount);

    // Check for both package and message count conditions
    if (
      this.props.userConnectedData.packageId === null &&
      this.props.userConnectedData.packageName === null &&
      messageCount >= 10
    ) {
      this.setState({ showInput: false });
    }
  } catch (error) {
    console.error("Error fetching message count:", error);
  }
};
handleSubmit = async (e) => {
  e.preventDefault();
  this._isMounted && (await this.setState({ toSend: this.state.toSend.trim() }));

  if (this.state.toSend !== "") {
    var tab = this.state.listMessages;
    tab.push({
      id: this.state.listMessages.length + 1,
      value: this.state.toSend,
      userID: this.state.userID,
      date: "",
    });

    // Only increment message count if the user is restricted (no package)
    if (
      this.props.userConnectedData.packageId === null &&
      this.props.userConnectedData.packageName === null
    ) {
      this.setState(
        (prevState) => ({
          messageCount: prevState.messageCount + 1,
        }),
        () => {
          // Save the updated messageCount to localStorage
          localStorage.setItem('messageCount', this.state.messageCount);

          // Hide input box if message count reaches 10
          if (this.state.messageCount >= 10) {
            this.setState({ showInput: false });
          }
        }
      );
    }

    this._isMounted && (await this.setState({ listMessages: tab }));
    this.goToElement(tab.length);
    this.state.socket.emit(
      this.state.room_id,
      this.state.toSend,
      this.state.userID_other
    );
  }
  this._isMounted && this.setState({ toSend: "" });
};

  render() {
    return (
      <div>
        <div className="row main-chat-box" onMouseMove={this.handleMouseEvent}>
        <div  style={{display:'flex',justifyContent:'center', alignItems:'center'}}>
          <div className="topDiv1" >
            <h5 id="chat-title">
              <NavLink
                className="message-link-profile"
                to={"/users/profile/" + this.state.usernameOther}
              >
                {this.state.usernameOther}
              </NavLink>
              's Conversation
            </h5>

          </div>
          <div className="topDiv2">

            <h5>
                {/* <NavLink 
                 className="message-link-profile1" 
                  to={
                    "/video-call/" +
                    this.props.userConnectedData.username +"/"+
                    this.state.usernameOther
                  }
              >
                  <i className="material-icons">call</i>
                  <span>{this.props.userConnectedData.username}</span> 
                </NavLink> */}

            </h5>

          </div>

        </div>
          <hr className="grey" /> 
          <div     
            id="chatbox-message"
            className="col s12 chatbox-message"
            style={{ height: this.state.winSize }}
          >
            <br />
            <span className="valign-wrapper center-align">
              Say hi to your new match, {this.state.usernameOther}.
            </span>
           

            <br />
            <div>
              {this.state.listMessages.length > 0 && (
                <this.msgList value={this.state.listMessages} />
              )}
            </div>
          </div>

          {this.state.showInput ? (
            <form className="fixed-bottom-imput" onSubmit={this.handleSubmit}>
              <div className="col s9 chat-message-box">
                <label htmlFor="msgToSend">Write your message</label>
                <input
                  type="text"
                  id="msgToSend"
                  name="msgToSend"
                  autoComplete="off"
                  value={this.state.toSend}
                  onChange={this.handleChange}
                  required
                  autoFocus
                />
              </div>
              <div id="btn-chat-box" className="col s3 btn-chat-box">
                <button type="submit" name="submit" value="Send" className="btn">
                  <i className="material-icons">send</i>
                </button>
              </div>
            </form>
          ) : (
            <div className="plan-message">
              <p>
                You've reached the message limit for free users. Please{" "}
                <a href="/buy-plan">buy a plan</a> to continue chatting.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.setState({ winSize: window.innerHeight - 200 });
  
    // Retrieve message count from localStorage on mount
    const savedMessageCount = localStorage.getItem('messageCount');
    if (savedMessageCount !== null) {
      this.setState({ messageCount: parseInt(savedMessageCount) }, () => {
        // Check for both package and message count conditions
        if (
          this.props.userConnectedData.packageId === null &&
          this.props.userConnectedData.packageName === null &&
          this.state.messageCount >= 10
        ) {
          this.setState({ showInput: false });
        }
      });
    } else {
      // Fetch message count if not available in localStorage
      this.fetchMessageCount();
    }
  }
  
  componentDidUpdate() {
    this._isMounted = true;
    if (this.state.listMessages !== this.props.listMessages)
      this.initializeComponent();
  }

  initializeComponent = async () => {
    if (this.state.socket) this.state.socket.close();
    this._isMounted &&
      (await this.setState({
        listMessages: this.props.listMessages,
        room_id: this.props.room_id,
        usernameOther: this.props.username,
        userID_other: this.props.userID_other,
      }));

    this._isMounted &&
      (await this.setState({
        userID: this.Auth.getIdViaToken(this.state.userToken),
        userName: this.Auth.getUsernameViaToken(this.state.userToken),
      }));

    this._isMounted &&
      (await this.setState({
        socket: io(`${baseURL}/chat`, {
          transports: ["polling"],
          requestTimeout: 50000,
          upgrade: false,
          "sync disconnect on unload": true,
          query: {
            token: this.state.userToken,
            userID: this.state.userID,
            userName: this.state.userName,
            room_id: this.state.room_id,
          },
        }),
      }));

    this.state.socket.emit("readMessage", this.state.room_id);

    this.state.socket.on(this.state.room_id, (data) => {
      var tab = this.state.listMessages;
      tab.push({
        id: this.state.listMessages.length + 1,
        value: data["data"],
        userID: data["userID"],
        date: "",
      });
      this._isMounted && this.setState({ listMessages: tab });
      this._isMounted && this.setState({ isRead: 1 });
      this.goToElement(tab.length);
    });
    if (this.state.listMessages.length < 1) return;
    this.goToElement(this.state.listMessages.length - 1);
  };

  handleResizeWindow = () => {
    this.setState({ winSize: window.innerHeight - 200 });
  };

  handleMouseEvent = () => {
    if (this.state.isRead !== null)
      this.state.socket.emit("readMessage", this.state.room_id);
  };

  goToElement = (nb) => {
    document.getElementById("id-msg" + nb).scrollIntoView({ block: "start" });
  };

  msgList = (props) => {
    const value = props.value;
    const listItems = value.map((e) => (
      <div
        className={
          this.state.userID == e.userID ? "row right-align" : "row left-align"
        }
        key={e.id}
      >
        <div
          className={
            this.state.userID == e.userID
              ? "col s12 m8 l6 right"
              : "col s12 m8 l6 left"
          }
        >
          <div className="row valign-wrapper">
            <div
              className={
                this.state.userID == e.userID
                  ? "chat-field2 grey"
                  : "chat-field red"
              }
            >
              <span id={"id-msg" + e.id} className="chat-message white-text">
                {e.value}
              </span>
              <div
                id={"id-msg" + e.id}
                className={
                  this.state.userID == e.userID ? "example2" : "example"
                }
              />
            </div>
          </div>
        </div>
      </div>
    ));
    return <div className="col s12 m12 l9">{listItems}</div>;
  };

  handleChange = (e) => {
    this.setState({ toSend: e.target.value });
  };

  componentWillUnmount() {
    this._isMounted = false;
    if (this.state.socket) this.state.socket.close();
  }
}

const mapStateToProps = (state) => {
  return {
    userConnectedData: state.user.data,
    userConnectedStatus: state.user.status,
  };
};

export default connect(mapStateToProps)(Chat);
