const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;
const { toJSON } = require("./plugins");

const listingSchema = Schema({
  listingImages: {
    type: [String],
  },
  listingTitle: {
    type: String,
  },
  listingDetails: {
    type: String,
  },
  pickUpLocation: {
    type: String,
  },
  requested: {
    type: [Schema.Types.ObjectId],
    ref: "users",
  },
  isAvailable: {
    type: Boolean,
  },
  createdOn: {
    type: Date,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

listingSchema.plugin(toJSON);
const Listing = mongoose.model("listings", listingSchema);

module.exports = Listing;
