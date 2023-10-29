const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const axios = require("axios");
const ObjectId = require("mongodb").ObjectId;
const { Server } = require("socket.io");
const auth = require("../middlewares/io_auth.middleware");
const { Chat, Chatroom } = require("../models");

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
            io.to(chatroom).emit("messageData", updatedChat);
          });
        let filter = {
          _id: new ObjectId(chatroom),
        };
        Chatroom.aggregate([
          {
            $match: filter, // Apply your initial match criteria
          },
          {
            $lookup: {
              from: "listings", // Replace 'listings' with the actual name of the referenced collection
              localField: "listing",
              foreignField: "_id",
              as: "listing",
            },
          },
          {
            $lookup: {
              from: "users", // Replace 'users' with the actual name of the referenced collection
              localField: "participants",
              foreignField: "_id",
              as: "participants",
            },
          },
          {
            $project: {
              _id: 0, // Exclude the _id field
              id: "$_id", // Rename _id to id for the chatroom document
              createdOn: 1, // Include createdOn field as is
              // Other fields
              debug: "$participants",
              participants: {
                $filter: {
                  input: "$participants",
                  as: "participant",
                  cond: {
                    $ne: ["$$participant._id", new ObjectId(socket.user._id)],
                  },
                },
              },

              listing: 1, // Include the populated listing field as is
            },
          },
          // Continue with the rest of your aggregation stages
        ]).then((result) => {
          let notifyReceiver = result[0].participants[0]._id.toString(); // User on the receiveing end
          io.to(notifyReceiver).emit("notiMessage", {
            type: "message",
            message: `you have received a new message from ${socket.user.name}`,
          });
        });
      });
    } catch (err) {
      socket.emit("error", "Message failed to send");
    }
  });

  socket.on("chatNotification", () => {
    // Emitter: notiMessage
    // {
    //   type: "message"
    // }
    let userDetails = socket.user._id.toString();
    socket.join(userDetails);
    // io.to(userDetails).emit("notification", {
    //   type: "message",
    //   message: "you have a new message",
    // });
  });

  socket.on("expiryNotification", () => {
    // Emitter: notiExpiry
    // {
    //   type: "expiry"
    // }
    let userDetails = socket.user._id.toString();
    socket.join(userDetails);
    // io.to(userDetails).emit("notification", {
    //   type: "message",
    //   message: "you have a new message",
    // });
  });
});

module.exports = server;
