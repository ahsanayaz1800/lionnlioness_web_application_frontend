import React from 'react';
import '../../styles/heroSection.css';
import { Select, Input } from 'antd';
import Logo from '../../assets/logo1.png';

const { Option } = Select;

const HeroSection = () => {

  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
  };

  return (
    <div className="landing-page">
      <header className="login_navbar">
        <div className="logo">
          <img src={Logo} alt="Lion-n-Lioness" height={100} />
        </div>
        <div className='login_navbar_text'>
          <nav>
            <ul className='nav_tabs'>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#subscription">Subscription</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#hotel">Find The Hotel</a></li>
              <li><a href="#one-night-stand">One Night Stand</a></li>
            </ul>
          </nav>
          <div className="auth-buttons">
            <button className="sign-up">Sign Up</button>
            <button className="log-in">Log In</button>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className='hero-content'>
          <div className='hero-form'>
            <div>
              <h4>Let's Get Started</h4>
              <p>Serious Dating With Lion-n-Lioness Your Perfect Match is Just a Click Away</p>
            </div>

            <div>
              {/* Dropdowns and input fields */}
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%' , marginTop:'40px'}}>
                <div style={{ flex: '0 0 48%' }}>
                  <label style={{ color: 'white' }}>I am a</label>
                  <Select
                    style={{
                      width: '100%',
                      border: '1px solid white',
                      borderRadius: '4px',
                      backgroundColor: 'transparent',
                      color: 'white',
                    }}
                    dropdownStyle={{ backgroundColor: 'black', color: 'white', border:'1px solid white' }}
                    placeholder={<span style={{ color: 'white' }}>Select your gender</span>}
                    onChange={handleChange}
                    bordered={false}
                  >
                    <Option value="Male" style={{ color: 'white' }}>Male</Option>
                    <Option value="Female" style={{ color: 'white' }}>Female</Option>
                    <Option value="Non-binary" style={{ color: 'white' }}>Non-binary</Option>
                    <Option value="Genderqueer" style={{ color: 'white' }}>Genderqueer</Option>
                  </Select>
                </div>

                <div style={{ flex: '0 0 48%' }}>
                  <label style={{ color: 'white' }}>Looking For</label>
                  <Select
                    style={{
                      width: '100%',
                      border: '1px solid white',
                      borderRadius: '4px',
                      backgroundColor: 'transparent',
                      color: 'white',
                    }}
                    dropdownStyle={{ backgroundColor: 'black', color: 'white',border:'1px solid white'  }}
                    placeholder={<span style={{ color: 'white' }}>Select preferred gender</span>}
                    onChange={handleChange}
                    bordered={false}
                  >
                    <Option value="Male" style={{ color: 'white' }}>Male</Option>
                    <Option value="Female" style={{ color: 'white' }}>Female</Option>
                    <Option value="Gender Nonconforming" style={{ color: 'white' }}>Gender Nonconforming</Option>
                    <Option value="Non-binary" style={{ color: 'white' }}>Non-binary</Option>
                  </Select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', width: '90%' }}>
                <div style={{ flex: '0 0 48%' }}>
                  <label style={{ color: 'white' }}>Age</label>
                  <Input
                    type="number"
                    style={{
                      width: '100%',
                      border: '1px solid white',
                      height:'30px',
                      borderRadius: '4px',
                      backgroundColor: 'transparent',
                      color: 'white',
                
                    
                    }}
                    placeholder="Enter your age"                    
                  />
                </div>

                <div style={{ flex: '0 0 48%' }}>
                  <label style={{ color: 'white' }}>City</label>
                  <Input
                    type="text"
                    style={{
                      width: '100%',
                      border: '1px solid white',
                      borderRadius: '4px',
                      backgroundColor: 'transparent',
                      color: 'white',
                      height:'30px'
                    }}
                    placeholder="Enter your city"
                  />
                </div>
              </div>
                <div style={{width:"100%"}}>
                  <button className='submit-btn'>FIND YOUR PARTNER</button>

                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
