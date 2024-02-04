const mongoose = require("mongoose");

const contactUsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    mobile_number: {
      type: Number,
      required: [true, "Mobile number is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
    },
    message: {
      type: String,
      required: [true, "Message is required."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ContactUs", contactUsSchema);
