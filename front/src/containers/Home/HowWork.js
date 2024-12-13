import React from "react";
import '../../styles/HowItWorks.css';  // Make sure to create this CSS file or add styles in your preferred way
import createProfile from '../../assets/create_profile.png'
import findMatch from '../../assets/find_match.png'
import dating from '../../assets/dating.png'
const HowItWorks = () => {
  return (
    <div className="howItWorksSection">
      <div className="titleSection">
        <h2>How Does It Work?</h2>
        <p>You're Just 3 Steps Away From A Great Date</p>
      </div>

      <div className="stepsWrapper">
        {/* Step 1 */}
        <div className="stepCard">
          <div className="iconWrapper">
            <img src={createProfile} alt="Step 1 Icon" />
            {/* <span className="stepNumber">01</span> */}
          </div>
          <h3>Create A Profile</h3>
          <p>Continua actualize ailers through robust and efficiently standard compliant commerce solutions.</p>
        </div>

        {/* Step 2 */}
        <div className="stepCard">
          <div className="iconWrapper">
            <img src={findMatch} alt="Step 2 Icon" />
            {/* <span className="stepNumber">02</span> */}
          </div>
          <h3>Find Matches</h3>
          <p>Continue to find matches through efficient and accurate solutions for seamless dating experiences.</p>
        </div>

        {/* Step 3 */}
        <div className="stepCard">
          <div className="iconWrapper">
            <img src={dating} alt="Step 3 Icon" />
            {/* <span className="stepNumber">03</span> */}
          </div>
          <h3>Start Dating</h3>
          <p>Engage with your matches and start dating with confidence and ease, powered by tech solutions.</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
