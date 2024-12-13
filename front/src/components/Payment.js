import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom'; // Import useLocation
import Materialize from "materialize-css";
import '../styles/Payment.css';
import Axios from 'axios';
const baseURL = process.env.REACT_APP_BASE_URL;

// Map state to props
const mapStateToProps = (state) => {
  return {
    userId: state.user.data?.id,
    userFirstName: state.user.data?.firstname,
    userLastName: state.user.data?.lastname,
    userEmail: state.user.data?.mail,
  };
  
};

function Payment({ userFirstName, userLastName, userEmail, userId }) {
  const [phone, setPhone] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation(); // Get location object
  const { title, price, packageId } = location.state || {}; // Extract package title and price

  // Function to handle payment submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const paymentResult = await stripe.createToken(cardElement);

    if (paymentResult.error) {
      console.log(paymentResult.error.message);
    } else {
      // Create a package object to send to your backend
      const packageDetails = {
        userId,
        userName: `${userFirstName} ${userLastName}`,
        userEmail,
        userPhone: phone,
        packageName: title, // Use dynamic package name
        packagePrice: price, // Use dynamic package price
        packageId: packageId,
        stripeToken: paymentResult.token.id,
      };

      // Send package details to your backend for processing
      try {
        const response = await Axios.post(`${baseURL}/payment/subscribe`, packageDetails
       );
       console.log(response)

        if (!response.status == "200") {
          throw new Error('Network response was not ok');
        }

        const data = await response.data;
        localStorage.removeItem('messageCount')
        Materialize.toast({
          html: "Payment Successfull",
          displayLength: 1500,
          classes: "rounded info-toast"
        });
        console.log('Payment successful!', data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };  

  return (
    <div className="upgrade-plan-form">
      <div className='paymentHeading'>
         <h5>UPGRADE PLAN</h5>


      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='labelColor'>Full Name</label>
          <input type="text" className="form-control" value={`${userFirstName} ${userLastName}`}  />
        </div>
        <div className="form-group">
          <label className='labelColor'>Email</label>
          <input type="email" className="form-control" value={userEmail || ''}  />
        </div>
        <div className="form-group">
          <label className='labelColor'>Phone</label>
          <input
            type="tel"
            className="form-control"
            value={phone || ''}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone No"
          />
        </div>
        <div className="form-group">
          <label className='labelColor'>Package Name</label>
          <input type="text" className="form-control" value={title}  /> {/* Dynamic package name */}
        </div>
        <div className="form-group">
          <label className='labelColor' >Package Price (£)</label>
          <input type="text" className="form-control" value={price}  /> {/* Dynamic package price */}
        </div>
        <div className="form-group">
          <label className='labelColor'>Stripe Payment</label>
          <div className="stripe-element">
            <CardElement />
          </div>
        </div>
        <button type="submit" className="btn btn-danger btn-block">Pay Now</button>
      </form>
    </div>
  );
}

// Connect Payment component to Redux store
export default connect(mapStateToProps)(Payment);
