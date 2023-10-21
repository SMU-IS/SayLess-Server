const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;
const { toJSON } = require("./plugins");

const userSchema = Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  createdOn: {
    type: Date,
  },
});

var handleE11000 = function (error, res, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("There was a duplicate key error"));
  } else {
    next();
  }
};

userSchema.plugin(toJSON);
userSchema.post("save", handleE11000);
const User = mongoose.model("users", userSchema);

module.exports = User;
