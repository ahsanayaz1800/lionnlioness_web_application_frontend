let app = require("express")();
const express = require("express");
let http = require("http").Server(app);
let { Server } = require("socket.io");
let bodyParser = require("body-parser");
let userRoute = require("./userRoute");
var chatRoute = require("./chatRoute");
var adminRoute = require("../routes/adminRoutes")
var mainRoute = require("../routes/mainRoute");
var chatController = require("../controllers/chatController");
var userController = require("../controllers/userController");
var userModel = require("../models/userModel");
var paymentRoute = require("../routes/subscriptionRoutes")
var Seed = require("../config/seed");
var adminAuth = require("../middlewares/adminAuthMiddleware")
const path = require("path");
const cors = require("cors");


/* Listenning port */

const PORT = 8000;

http.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});

//Cors Option
const corsOption = {
  credentials:true,
  origin:["https://lionnlioness-v4.devservertd.com",'http://localhost:3000', 'file:///C:/Users/t/Desktop/lionnlioness-front/contact.html'],

} 

app.use(cors(corsOption));

/* Middlewares */
// app.use(bodyParser.json({ limit: "10mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use("/users/", userRoute.router);
app.use("/chat/", chatRoute.router);
app.use("/main/", mainRoute.router);
app.use("/admin" ,adminRoute);
app.use("/payment" ,paymentRoute);
  

//Configuration
  
// Serve static files from the "src/uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "../src/uploads")));
app.use("/users/", userRoute.router);
app.use("/chat/", chatRoute.router);
app.use("/main/", mainRoute.router);


app.get("/seed", (req, res) => {
  Seed.getUserSeed();
  res.send({ message: "Database created succefully" });
});
app.get("/setup", (req, resp) => {
  require("../config/setup");
  resp.send({ message: "Database Lion_n_Lioness created succefully" });
});

app.get("/",(req,res)=>{
  res.send("Api Working!")
})
/* Socket.io */
let io = new Server(http, {
  cors: {
    origin: ["https://lionnlioness-v4.devservertd.com",'http://localhost:3000'],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let connections = [];
let clients = [];
let onlineTab = [];

io.on("connection", async (socket) => {

 await onlineTab.push({
   userID: socket.handshake.query["userID"],
   socketID: socket.id,
 });

 chatController.onlineStatus(socket.handshake.query["userID"]);

 socket.broadcast.emit("online", {
   user_id: socket.handshake.query["userID"],
   status: "Online",
 });

 socket.on("sendNotif", async (type, user_id, target_id) => {
   let sendNotif = await userController.manageNotif(type, user_id, target_id);
   let isBlocked = await userModel.checkUserIsBlocked(user_id, target_id);
   if (sendNotif && !isBlocked) {
     socket.broadcast.emit("newNotif", target_id);
   }
 });

 socket.on("disconnect", () => {
   for (let i = 0; i < onlineTab.length; i++) {
     if (onlineTab[i]["socketID"] === socket.id) onlineTab.splice(i, 1);
   }

   let result = onlineTab.find(
     (elem) => elem.userID === socket.handshake.query["userID"]
   );

   if (!result) {
     socket.broadcast.emit("offline", {
       user_id: socket.handshake.query["userID"],
       status: "Offline",
     });
     chatController.offlineStatus(socket.handshake.query["userID"]);
   }
 });



  // Video calling sockets
  socket.emit("socketId", socket.id);
  

  socket.on(
    "initiateCall",
    ({ targetId, signalData, senderId, senderName }) => {
      io.to(targetId).emit("incomingCall", {
        signal: signalData,
        from: senderId,
        name: senderName,
      });
    }
  );

  socket.on("changeMediaStatus", ({ mediaType, isActive }) => {
    socket.broadcast.emit("mediaStatusChanged", { mediaType, isActive });
  });

  socket.on("sendMessage", ({ targetId, message, senderName }) => {
    io.to(targetId).emit("receiveMessage", { message, senderName });
  });

  socket.on("answerCall", (data) => {
    socket.broadcast.emit("mediaStatusChanged", {
      mediaType: data.mediaType,
      isActive: data.mediaStatus,
    });
    io.to(data.to).emit("callAnswered", data);
  });

  socket.on("terminateCall", ({ targetId }) => {
    io.to(targetId).emit("callTerminated");
  });

 
});

let nsp = io.of("/chat");

nsp.on("connection", (socket) => {
  let userID = socket.handshake.query["userID"];
  let userToken = socket.handshake.query["token"];
  let userName = socket.handshake.query["userName"];
  let room_id = socket.handshake.query["room_id"];

  socket.join(room_id);

  socket.on(room_id, async (data, userID_other) => {
    chatController.saveMessage([data, userID, room_id]);
    chatController.saveNotification(
      userID_other,
      userID,
      "message",
      "",
      room_id
    );
    socket.broadcast.emit(room_id, { data, userID, userName });

    let isBlocked = await userModel.checkUserIsBlocked(userID_other, userID);
    if (!isBlocked) io.emit("new message", { room_id, userID_other });
  });

  socket.on("readMessage", (data) => {
    chatController.readMessage(data, userID);
    io.emit("readMessage", userID, data);
  });

  socket.on("disconnect", () => {
    connections.splice(connections.indexOf(socket), 1);

    clients = clients.filter((c) => c.socketID !== socket.id);
  });
});
