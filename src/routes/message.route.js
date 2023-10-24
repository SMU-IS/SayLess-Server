const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const axios = require("axios");
const ObjectId = require("mongodb").ObjectId;
const { Server } = require("socket.io");
const auth = require("../middlewares/io_auth.middleware");
const { Chat } = require("../models");

const io = new Server(server, {
  cors: {
    origin: true,
  },
});

// io.use(function (socket, next) {
//   console.log(socket.handshake.headers["x-access-token"]);
//   if (socket.handshake.headers) {
//     next();
//     return;
//   }
//   socket._error("error");
//   new Error("AUTH ERROR");
// })

io.use(auth).on("connection", async (socket) => {
  //   console.log("a user connected");
  socket.emit("connected", "You are connected");
  socket.on("login", async ({ chatroom }, callback) => {
    // CALL
    let filter = {
      chatroomId: chatroom,
    };
    socket.join(chatroom);
    Chat.find(filter)
      .populate("sender")
      .then((response) => {
        socket.emit("messageData", response);
        socket.to(chatroom).emit("roomStatus", "A user is connected");
      });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", ({ chatroom, message }) => {
    // Add message
    let postData = {
      chatroomId: chatroom,
      createdOn: new Date(),
      sender: socket.user._id,
      message: message,
      read: false,
    };
    let chatData = new Chat(postData);
    try {
      chatData.save().then((result) => {
        Chat.find({
          _id: result._id,
        })
          .populate("sender")
          .then((updatedChat) => {
            console.log(updatedChat);
            io.to(chatroom).emit("messageData", updatedChat);
          });
      });
    } catch (err) {
      socket.emit("error", "Message failed to send");
    }
  });
});

module.exports = server;
