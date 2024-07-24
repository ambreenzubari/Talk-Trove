const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const messagesRoutes = require("./routes/messages");
const uploadRoutes= require("./routes/upload")
const socket = require("socket.io");
const app = express();
require("dotenv").config();
const config = require("config");
var admin = require("firebase-admin");

var serviceAccount = require("./service_key.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: 'talk-trove-aa698.appspot.com'
// });
app.use(cors());
app.use(express.json());
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: JwtPrivateKey is not defined");
  process.exit(1);
}

app.use("/api/files", uploadRoutes)
app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);

mongoose
  .connect("mongodb://localhost/notes-db-app",
    { family: 4 },
  )
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log("ERROR", err)
  });

const server = app.listen(process.env.PORT, () => {
  console.log("Listening on port " + process.env.PORT);
});
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
