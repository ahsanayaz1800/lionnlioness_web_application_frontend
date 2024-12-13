import React from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { render } from "react-dom";
import MainRouter from "./routes";
import { Provider } from "react-redux";
import configureStore from "./store";
import { getUserData } from "./actions/user-actions";
import AuthService from "./services/AuthService";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./styles/App.css";
import { VideoCallProvider } from "./context/Context";

const Auth = new AuthService();
const store = configureStore();
const stripePromise = loadStripe(
  "pk_test_51Q68WnHvrmbIzu0unE6bkhy8HP6P36LoY041LQIOxKPRWxg4JYhi0SsRrxTwrCt8yxJH0wBXHURtjWnOastj0Zrp00iDtN1tHT"
);

if (Auth.loggedIn()) {
  store.dispatch(getUserData(Auth.getConfirm().username));
}

render(
  
  <Provider store={store}>
    
      <Elements stripe={stripePromise}>
        <GoogleOAuthProvider clientId="53925760279-cs8hnrbvmsmh1eur6f5ghjme5se9hamu.apps.googleusercontent.com">
          
          <MainRouter />
        </GoogleOAuthProvider>
      </Elements>
  </Provider>,
  document.getElementById("root")
);