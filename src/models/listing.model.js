const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;
const { toJSON } = require("./plugins");

const listingSchema = Schema({
  id: {
    type: String,
    // required: true,
    // unique: true,
  },
  cardImage: {
    type: String,
  },
  cardTitle: {
    type: String,
  },
  cardSubTitle: {
    type: String,
  },
  details: {
    type: String,
  },
  pickUpTime: {
    type: String,
  },
  distance: {
    type: String,
  },
});

listingSchema.plugin(toJSON);
const Listing = mongoose.model("listings", listingSchema);

module.exports = Listing;
