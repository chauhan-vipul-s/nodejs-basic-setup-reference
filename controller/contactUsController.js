const ContactUs = require("../models/contactUsSchema");
const asyncHandler = require("express-async-handler");

const contactUsPostController = asyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    const contact = await ContactUs.create({
      name: req.body.name,
      mobile_number: req.body.mobile_number,
      email: req.body.email,
      message: req.body.message,
    });
    return res.status(200).json({
      success: true,
      message: "We will contact you soon!",
      data: contact,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something wen wrong!",
      data: error,
    });
  }
});

const getAllContactUsDetails = asyncHandler(async (req, res) => {
  try {
    const allContactRequests = await ContactUs.find({});
    return res.status(200).json({
      success: true,
      message: "All request get successfully!",
      data: allContactRequests,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something wen wrong!",
      data: error,
    });
  }
});

module.exports = { contactUsPostController, getAllContactUsDetails };
