const mongoose = require('mongoose');
const { Schema, SchemaTypes, model } = mongoose;
const { toJSON } = require('./plugins');


const listingSchema = mongoose.Schema(
    {
        _id: {
            type: SchemaTypes.ObjectId,
        },
        id: {
            type: String,
            required: true,
            unique: true,
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
        }
    }
)
listingSchema.plugin(toJSON);
const Listing = mongoose.model('Listings', listingSchema);

module.exports = Listing;