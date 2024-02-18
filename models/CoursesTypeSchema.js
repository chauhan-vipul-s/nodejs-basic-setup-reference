const mongoose = require('mongoose');

const coursesTypeSchema = new mongoose.Schema({
  typeName: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("CoursesType",coursesTypeSchema);