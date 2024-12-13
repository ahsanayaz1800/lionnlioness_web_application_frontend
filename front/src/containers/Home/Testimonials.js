import React from 'react';
import '../../styles/Testimonials.css';
import defaultImage from '../../assets/default-profile-man.jpg'
import logo from '../../assets/logo1.png'
const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: 'Taylor & Morgan',
            image: defaultImage,
            quote: "I found my soulmate on Lion 'n' Lioness, and our lives have been transformed for the better. Lion 'n' Lioness made connecting with the right person so easy.",
        },
        {
            id: 2,
            name: 'Alex & Jamie',
            image: defaultImage,
            quote: "Thanks to Lion 'n' Lioness, I met my perfect match. We share so many interests and values, and our connection is truly special.",
        },
        {
            id: 3,
            name: 'Emma & John',
            image: defaultImage,
            quote: "I never thought I’d find my soulmate online, but Lion 'n' Lioness proved me wrong. We met, fell in love, and now we’re planning our future together.",
        },
    ];

    return (
        <div className="testimonials-section">
            <h2>What Our Customers Say</h2>
            <p>Hear From Our Happy Members Who’ve Found Love Through Our Platform. Discover Real Stories Of Lasting Connections And Successful Matches.</p>
            <div className="testimonials-container">
                {testimonials.map((testimonial) => (
                    <div className="testimonial" key={testimonial.id}>
                        <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="testimonial-image"
                        />
                        <p className="testimonial-quote">‘{testimonial.quote}’</p>
                        <p className="testimonial-name">{testimonial.name}</p>
                    </div>
                ))}
            </div>

            <footer className="footer-section">
                <div className="footer-logo">
                    <img src={logo} alt="Lion-n-Lioness Logo" />
                    <p>
                        Lion-N-Lioness offers you the opportunity to simply accelerate this process by finding out which is your life partner.
                    </p>
                    <button className="register-btn">Register Now</button>
                </div>

                <div className="footer-info">
                    <div >
                        <h3>Information</h3>
                        <p>01472 691012</p>
                        <p>info@lionnlioness.com</p>
                    </div>
                    <div>
                        <h3>More Lion-N-Lioness</h3>
                        <p>Home</p>
                        <p>About Us</p>
                        <p>Subscription</p>
                        <p>Disclaimer</p>
                        <p>Terms & Conditions</p>
                        <p>Privacy Policy</p>
                    </div>
                    <div className="footer-follow">
                        <h3>Follow Us</h3>
                        <p>Facebook</p>
                        <p>Instagram</p>
                    </div>
                </div>

            </footer>
                <div className="footer-copyright">
                    <p>Copyright © 2024, Lion-N-Lioness. All Rights Reserved</p>
                </div>
        </div>
    );
};

export default Testimonials;
