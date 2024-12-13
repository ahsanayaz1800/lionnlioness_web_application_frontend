import { io } from "socket.io-client";

// const URL = "https://video-call-server-gm7i.onrender.com";
const URL = process.env.REACT_APP_BASE_URL
export const socket = io(URL);
export const navbarBrand = "YourVideoShare";

