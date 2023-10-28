const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;
const { toJSON } = require("./plugins");

const inventorySchema = Schema({
  itemName: {
    type: String,
  },
  expiry: {
    type: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  createdOn: {
    type: Date,
  },
});

inventorySchema.plugin(toJSON);
const Inventory = mongoose.model("inventory", inventorySchema);

module.exports = Inventory;
