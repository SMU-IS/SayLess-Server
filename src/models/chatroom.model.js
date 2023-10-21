const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;
const { toJSON } = require("./plugins");

const chatroomSchema = Schema({
  participants: {
    type: [Schema.Types.ObjectId],
    ref: "users",
  },
  listing: {
    type: Schema.Types.ObjectId,
    ref: "listings",
  },
  createdOn: {
    type: Date,
  },
});

chatroomSchema.plugin(toJSON);
const Chatroom = mongoose.model("chatrooms", chatroomSchema);

module.exports = Chatroom;
