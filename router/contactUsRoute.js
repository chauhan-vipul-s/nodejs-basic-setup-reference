const express = require("express");

const {
  contactUsPostController,
  getAllContactUsDetails,
} = require("../controller/contactUsController");

const router = express.Router();

router.route("/").post(contactUsPostController);

router.route("/").get(getAllContactUsDetails);

module.exports = router;
