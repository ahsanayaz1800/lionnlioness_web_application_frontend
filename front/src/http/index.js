import "dotenv/config";
import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL

export const uploadUserPost = (data) =>
  axios.post(`${baseURL}/users/upload/post`, data);
export const googleAuthLogin = (data) => axios.post(`${baseURL}/users/google_signin`,data);

