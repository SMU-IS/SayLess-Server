const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("WELCOME");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  //   socket.on("chat message", (msg) => {
  //     io.emit("chat out" + msg);
  //   });
  socket.on("chat message", (arg) => {
    // console.log(arg);
    // callback(arg);
    io.emit("chat message", arg);
  });
});

// CHAT RECEIVE MSG
// CHAT BORADCAST

module.exports = server;
