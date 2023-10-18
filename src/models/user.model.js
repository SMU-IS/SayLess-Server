const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;
const { toJSON } = require("./plugins");

const userSchema = Schema({
  id: {
    type: String,
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
});

userSchema.plugin(toJSON);
const User = mongoose.model("user", userSchema);

module.exports = User;
