const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;
const { toJSON } = require("./plugins");

const questSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  completed: {
    type: [Schema.Types.ObjectId],
    ref: "challenges",
  },
  challengeSet: {
    type: Schema.Types.ObjectId,
    ref: "challengesets",
  },
  questIcon: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
});

questSchema.plugin(toJSON);
const Quest = mongoose.model("quests", questSchema);

module.exports = Quest;
