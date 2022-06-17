const mongoose = require("mongoose");
const { Schema } = mongoose;

const locationDataSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  website: {
       type: String
 },
  contactPerson: {
    type: String,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
});

const MongooseModel = mongoose.model("location", locationDataSchema);
module.exports = MongooseModel;
