const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;
const { toJSON } = require("./plugins");

const challengesSchema = Schema({
  content: {
    type: String,
  },
});

const challengesSetSchema = Schema({
  challenges: {
    type: [Schema.Types.ObjectId],
    ref: "challenges",
  },
});

challengesSchema.plugin(toJSON);
challengesSetSchema.plugin(toJSON);
const Challenges = mongoose.model("challenges", challengesSchema);
const ChallengesSet = mongoose.model("challengesets", challengesSetSchema);

module.exports = { Challenges, ChallengesSet };
