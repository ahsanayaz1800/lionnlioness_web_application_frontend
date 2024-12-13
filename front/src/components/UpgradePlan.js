import React from 'react';
import { useLocation } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
import { Link } from 'react-router-dom'

export default function UpgradePlan() {
  const location = useLocation();
  const { id, title, price, duration } = location.state || {};

  return (
    <div className='upgrade-plan upgrade-plan-wrapper'>
      <div className="package-d-box">
        <div className="packages-area">
          <div className="pakg-detail">
            <div className="title-m">
              Lion & Lioness <span className={title.toLowerCase()}>{title}</span>
            </div>
            <div className="pkg-itms">
              <h3>Upgrade Your Likes</h3>
              <ul>
                <li className="true"><CheckIcon /> Limited 100 chats</li>
                <li className="true"><CheckIcon /> Limited 20 Profile Likes</li>
                <li className="true"><CheckIcon /> Limited 20 follows</li>
                <li className="true"><CheckIcon /> Limited 50 photo likes</li>
                <li className="true"><CheckIcon /> Limited 50 post likes</li>
                <li className="true"><CheckIcon /> Limited 50 comments</li>
              </ul>
            </div>
            <div className="pkg-itms">
              <h3>Matching Profile</h3>
              <ul>
                <li className="true"><CheckIcon /> 50% Matching Profile</li>
                <li className="true"><CheckIcon /> Limited 50 posts</li>
                <li className="true"><CheckIcon /> Limited 50 Photos</li>
                <li className="true"><CheckIcon /> Limited Profile Access</li>
                <li className="true"><CheckIcon /> Limited 50 post likes</li>
                <li className="true"><CheckIcon /> Video Calling Feature</li>
              </ul>
            </div>
          </div>
          <div className="pakg-prices">
            <div className="pricebox">
              <h4>{duration} Plan</h4>
              <p>£{price} / {duration}</p>
            </div>
            <div className="disc_terms">
              <p>
                By tapping “Continue”, you will be charged and your subscription will renew for the same price and package length until you cancel via Account Settings, and you agree to our <a href="https://lionnlioness.devservertd.com/public/terms-and-condition" target="_blank">Terms</a>.
              </p>
            </div>
            <Link
            to={{
              pathname: `/users/buyplan/${id}`,
              state: {
                packageId: id,
                title: title,
                price: price,
                duration: duration,
              }
            }}
            key={id}
          >
            <div className="cta-a">
              <a href="">Continue</a>
            </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
