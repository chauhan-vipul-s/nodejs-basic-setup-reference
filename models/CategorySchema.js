const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
  },
  logo: {
    type: String,
    default: undefined
  },
});

module.exports = mongoose.model("Category",categorySchema);