// HomePage.js
import React from 'react';
import HeroSection from './HeroSection';
import Stats from './Stats';
import FindPeople from './FindPeople';
import HowItWorks from './HowWork';
import Members from './Members';
import Testimonials from './Testimonials';
const HomePage = () => {
  return (
    <div style={{backgroundColor:'black'}}>
      <HeroSection></HeroSection>
      <Stats></Stats>
      <FindPeople></FindPeople>
      <HowItWorks></HowItWorks>
      <Members></Members>
      <Testimonials></Testimonials>
    </div>
  );
};

export default HomePage;
