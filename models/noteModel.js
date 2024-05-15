const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for a note
const noteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  color: {
    type: String,
    required: false
  },
  owner: {
    type: String,
    required: true,
  }
}, { timestamps: true });

// Create the model based on the schema
module.exports = mongoose.model('Note', noteSchema);
