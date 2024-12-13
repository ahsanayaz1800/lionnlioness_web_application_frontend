import React, { Component } from "react";
import { connect } from "react-redux";
import Accordion from "../components/Accordion";

class SideMenu extends Component {
  render() {
    const { userConnectedData } = this.props; // Destructure userConnectedData from props
    return (
      <div className="profile-wrapper">
        <div className="left-panel">
          <div className="btm-p">
            <div className="packages">
              <div className="package-item pltnm" id="pckage1">
                <a href="/upgrade_to_platinum">
                  <div className="label">
                    Lion & Lioness <span>Platinum</span>
                  </div>
                  <p>Level up every action you take on Lionnlioness</p>
                </a>
              </div>
              <div className="package-item gold" id="pckage2">
                <a href="/upgrade_to_gold">
                  <div className="label">
                    Lion & Lioness <span>Gold</span>
                  </div>
                  <p>Level up every action you take on Lionnlioness</p>
                </a>
              </div>
              <div className="package-item plus" id="pckage3">
                <a href="/upgrade_to_plus">
                  <div className="label">
                    Lion & Lioness <span>Plus</span>
                  </div>
                  <p>Level up every action you take on Lionnlioness</p>
                </a>
              </div>
              <div className="package-item pltnm" id="pckage4">
                <a href="/upgrade_to_onenightstand">
                  <div className="label">Upgrade Your Love Life</div>
                  <p>One Night Stand!</p>
                </a>
              </div>
            </div>

            <div className="profile-setting-menu">
              <div className="menu-wrap">
                <h3>Account Setting</h3>
                <Accordion user={userConnectedData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userConnectedData: state.user.data,
  userConnectedStatus: state.user.status,
});

export default connect(mapStateToProps)(SideMenu);
