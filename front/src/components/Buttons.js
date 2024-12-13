import React, { Component } from "react";
import { Button, Icon } from "react-materialize";
import LikeIcon from "@material-ui/icons/ThumbUp";
import DislikeIcon from "@material-ui/icons/ThumbDown";
 
class ProfileSettingsButton extends Component {
  render() {
    return (
      <Button
        floating
        fab={{ direction: "left", hoverEnabled: false }}
        className="blue pulse"
       icon={<i class="material-icons">settings</i>}
        large
        >
            

        <Button
          floating
          tooltip="edit profile info"
          icon={<i class="material-icons">edit</i>}
          className="blue modal-trigger"
          href="#edit-profile-modal"
        />
        <Button
          floating
          tooltip="add/edit profile pictures"
          icon={<i class="material-icons">add_a_photo</i>}
          className="blue modal-trigger"
          href="#edit-pictures-modal"
        />
        <Button
          floating
          tooltip="edit account settings"
          icon={<i class="material-icons">account_circle</i>}
          className="blue modal-trigger"
          href="#edit-account-modal"
        />
        {/* <Button
          floating

          tooltip="post"
          icon={<i class="material-icons">account_circle</i>}
          className="blue modal-trigger"
          href="#post"
        /> */}
        <Button
          floating
          tooltip="manage profiles"
          icon={<i class="material-icons">supervised_user_circle</i>}
          className="blue modal-trigger"
          href="#user-supervise-modal"
        />
      </Button>
    );
  }
}

class ProfileActionsButton extends Component {
  render() {
    return (
      <Button
        floating
        fab={{ direction: "left", hoverEnabled: false }}
        icon={<i class="material-icons">more_vert</i>}
        className="red pulse"
        large
      >
        {!this.props.isReported ? (
          <Button
            floating
            tooltip="report this user"
            icon={<i class="material-icons">report</i>}
            className="red modal-trigger"
            href="#report-user-modal"
          />
        ) : (
          ""
        )}
        {!this.props.isBlocked ? (
          <Button
            floating
            tooltip="block this user"
            icon={<i class="material-icons">block</i>}
            className="red modal-trigger"
            href="#block-user-modal"
          />
        ) : (
          ""
        )}
        {this.props.isBlocked ? (
          <Button
            floating
            tooltip="Unblock this user"
            icon={<i class="material-icons">check_circle</i>}
            className="red modal-trigger"
            href="#unblock-user-modal"
          />
        ) : (
          ""
        )}
      </Button>
    );
  }
}

class LikeButton extends Component {
  render() {
    const iconStyle = { position: "relative", top: "5px" };
    return (
      <Button tooltip="like this user" className="red">
        <span className="like-btn-text">Like</span>{" "}
        <span style={iconStyle}>
          <LikeIcon />
        </span>
      </Button>
    );
  }
}

class LikeBackButton extends Component {
  render() {
    const iconStyle = { position: "relative", top: "5px" };
    return (
      <Button
        tooltip="like back this user"
        className="red modal-trigger"
        href="#match-anim-modal"
      >
        <span className="like-btn-text">Like </span>Back{" "}
        <span style={iconStyle}>
          <LikeIcon />
        </span>
      </Button>
    );
  }
}

class DislikeButton extends Component {
  render() {
    const iconStyle = { position: "relative", top: "5px" };
    return (
      <Button tooltip="dislike this user" className="red">
        <span className="like-btn-text">Dislike </span>{" "}
        <span style={iconStyle}>
          <DislikeIcon />
        </span>
      </Button>
    );
  }
}

class FilterUsersButton extends Component {
  render() {
    return (
      <Button
        tooltip="Filter the profiles"
        className="filter-users-btn modal-trigger"
        href="#filter-users-modal"
      >
        <span className="filter-users-btn-txt">Filter</span>
        <Icon right>filter_list</Icon>
      </Button>
    );
  }
}

export {
  ProfileSettingsButton,
  ProfileActionsButton,
  LikeButton,
  LikeBackButton,
  DislikeButton,

  FilterUsersButton

};
