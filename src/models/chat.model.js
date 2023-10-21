const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;
const { toJSON } = require("./plugins");

const ChatSchema = Schema({
  chatroomId: {
    type: Schema.Types.ObjectId,
    ref: "chatroom",
  },
  createdOn: {
    type: Date,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  message: {
    type: String,
  },
  read: {
    type: Boolean,
  },
});

ChatSchema.plugin(toJSON);
const Chat = mongoose.model("chats", ChatSchema);

module.exports = Chat;
